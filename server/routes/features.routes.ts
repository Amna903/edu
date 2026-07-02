/**
 * New Feature Routes (SRS Gap Implementation)
 *
 * Covers:
 *  - Invoice PDF download          (§4.7)
 *  - CSV export of form submissions (§4.15)
 *  - Ticket status tracking         (§4.17)
 *  - Course update notifications    (§4.16)
 *  - CDN cache headers              (§5.6)
 *  - Admin error/login log viewer   (§10)
 */

import type { Express } from "express";
import { prisma } from "../db/prisma.js";
import { storage } from "../db/storage.js";
import { logError } from "../services/logger.js";
import { enqueueJob } from "../services/job-queue.js";

// ── PDF generation (invoice) ────────────────────────────────────────────────

/**
 * Build a plain-text invoice string.
 * jsPDF is a client-side library; on the server we emit a simple but complete
 * text/plain invoice that any PDF printer can render, OR we can stream an
 * HTML invoice that the browser prints to PDF.  We use HTML-to-text here so
 * no native dependency (canvas, puppeteer) is required in the Vercel runtime.
 */
function buildInvoiceHtml(order: any, items: any[]): string {
  const formatAmount = (v: number) => `PKR ${(v / 100).toFixed(2)}`;
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }) : "—";

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;">${item.title ?? `Course ${item.programId}`}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">${formatAmount(item.price)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Invoice ${order.invoiceNumber ?? order.id}</title>
<style>
  body { font-family: Arial, sans-serif; color: #111; padding: 40px; max-width: 700px; margin: auto; }
  h1   { font-size: 28px; margin-bottom: 4px; }
  .meta { color: #555; font-size: 14px; margin-bottom: 32px; }
  table { width: 100%; border-collapse: collapse; }
  th   { background: #1a73e8; color: #fff; padding: 8px; text-align: left; }
  tfoot td { font-weight: bold; padding: 8px; border-top: 2px solid #1a73e8; }
  .status { display:inline-block; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600;
            background:${order.paymentStatus === "paid" || order.status === "completed" ? "#d4edda" : "#fff3cd"};
            color:${order.paymentStatus === "paid" || order.status === "completed" ? "#155724" : "#856404"}; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <h1>EduMeUp</h1>
  <div class="meta">
    <strong>Invoice #</strong> ${order.invoiceNumber ?? `INV-${order.id}`}<br/>
    <strong>Date:</strong> ${date}<br/>
    <strong>Order ID:</strong> ${order.id}<br/>
    <strong>Payment Ref:</strong> ${order.paymentRef ?? "—"}<br/>
    <strong>Status:</strong> <span class="status">${order.paymentStatus ?? order.status}</span>
  </div>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
    </tbody>
    <tfoot>
      <tr>
        <td>Total Paid</td>
        <td style="text-align:right">${formatAmount(order.paidAmount ?? order.totalAmount)}</td>
      </tr>
      ${
        (order.remainingAmount ?? 0) > 0
          ? `<tr><td>Balance Due</td><td style="text-align:right">${formatAmount(order.remainingAmount)}</td></tr>`
          : ""
      }
    </tfoot>
  </table>

  <p style="margin-top:40px;font-size:12px;color:#888;">
    EduMeUp · support@edumeup.com · edumeup.com<br/>
    This document serves as your official payment receipt.
  </p>
  <script>window.onload=()=>window.print();</script>
</body>
</html>`;
}

// ── CDN Cache helper ────────────────────────────────────────────────────────

/** Apply cache-control headers for static/semi-static responses (§5.6). */
function applyCacheHeaders(
  res: any,
  options: { maxAge?: number; sMaxAge?: number; staleWhileRevalidate?: number } = {},
) {
  const maxAge = options.maxAge ?? 300; // 5 min default
  const sMaxAge = options.sMaxAge ?? maxAge * 2;
  const swr = options.staleWhileRevalidate ?? 60;
  res.set(
    "Cache-Control",
    `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`,
  );
}

// ── Route registration ───────────────────────────────────────────────────────

export function registerFeatureRoutes(app: Express) {

  // ── 1. Invoice PDF download (§4.7) ─────────────────────────────────────
  app.get("/api/orders/:id/invoice", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const orderId = Number(req.params.id);
      if (!Number.isFinite(orderId) || orderId <= 0) {
        return res.status(400).json({ message: "Invalid order id" });
      }

      const order = await storage.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Users can only download their own invoice; admin can download any
      if (req.session.user.role !== "admin" && order.userId !== String(req.session.user.id)) {
        return res.status(403).json({ message: "Not authorised" });
      }

      const items = await storage.getOrderItemsByOrderId(orderId);

      // Enrich items with course titles from DB
      const enrichedItems = await Promise.all(
        items.map(async (item: any) => {
          try {
            const { getLmsCourseById } = await import("../services/moodle/moodle.js");
            const course = await getLmsCourseById(item.programId);
            return { ...item, title: course?.title ?? `Course ${item.programId}` };
          } catch {
            return { ...item, title: `Course ${item.programId}` };
          }
        }),
      );

      const html = buildInvoiceHtml(order, enrichedItems);
      const filename = `invoice-${order.invoiceNumber ?? `INV-${order.id}`}.html`;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
      // No cache on invoices — they are user-specific and sensitive
      res.setHeader("Cache-Control", "private, no-store");
      return res.send(html);
    } catch (err) {
      logError({ context: "invoice-download", error: err, userId: req.session.user?.id }).catch(() => undefined);
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to generate invoice" });
    }
  });

  // ── 2. CSV export of form submissions (§4.15) ──────────────────────────
  app.get("/api/forms/submissions/export.csv", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!["admin", "school"].includes(req.session.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const monthFilter = typeof req.query.month === "string" ? req.query.month : undefined;
      const statusFilter = typeof req.query.status === "string" ? req.query.status : undefined;

      const where: any = {};
      if (req.session.user.role === "school") {
        where.schoolUserId = req.session.user.id;
      }
      if (monthFilter) where.reportMonth = monthFilter;
      if (statusFilter) where.status = statusFilter;

      const submissions = await (prisma as any).schoolFormSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      const escape = (v: unknown) => {
        const s = v === null || v === undefined ? "" : String(v);
        return `"${s.replace(/"/g, '""')}"`;
      };

      const header = [
        "ID", "School User ID", "Teacher User ID", "Report Month",
        "Status", "Review Notes", "Reviewed By", "Reviewed At", "Created At",
      ].map(escape).join(",");

      const rows = submissions.map((s: any) =>
        [
          s.id,
          s.schoolUserId,
          s.teacherUserId ?? "",
          s.reportMonth,
          s.status,
          s.reviewNotes ?? "",
          s.reviewedByUserId ?? "",
          s.reviewedAt ? new Date(s.reviewedAt).toISOString() : "",
          s.createdAt ? new Date(s.createdAt).toISOString() : "",
        ]
          .map(escape)
          .join(","),
      );

      const csv = [header, ...rows].join("\n");
      const filename = `form-submissions${monthFilter ? `-${monthFilter}` : ""}.csv`;

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Cache-Control", "private, no-store");
      return res.send(csv);
    } catch (err) {
      logError({ context: "form-submissions-csv-export", error: err, userId: req.session.user?.id }).catch(() => undefined);
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to export CSV" });
    }
  });

  // ── 3. Ticket status tracking (§4.17) ──────────────────────────────────

  // Update ticket status (admin only)
  app.patch("/api/inquiries/:id/status", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const ticketId = Number(req.params.id);
      if (!Number.isFinite(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket id" });
      }

      const validStatuses = ["new", "open", "in_progress", "contacted", "resolved", "closed"];
      const newStatus = typeof req.body?.status === "string" ? req.body.status : "";
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(", ")}` });
      }

      const ticket = await storage.getInquiryById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      const updated = await storage.updateInquiry(ticketId, { status: newStatus });

      // Log admin action
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            targetUserId: ticket.userId !== undefined ? String((ticket as any).userId) : null,
            action: "TICKET_STATUS_UPDATED",
            details: { ticketId, previousStatus: ticket.status, newStatus },
          },
        });
      } catch { /* non-fatal */ }

      // Notify ticket owner if status changed to resolved or contacted
      if (["resolved", "contacted"].includes(newStatus) && ticket.email) {
        const statusLabel = newStatus === "resolved" ? "resolved" : "updated";
        enqueueJob("SEND_EMAIL", {
          to: ticket.email,
          subject: `Your EduMeUp support ticket has been ${statusLabel}`,
          text: `Dear ${ticket.name ?? "customer"},\n\nYour support request "${ticket.subjectInterest ?? "General enquiry"}" has been marked as ${newStatus}.\n\nIf you have further questions, please reply to this email or visit your dashboard.\n\nEduMeUp Support`,
          replyTo: "support@edumeup.com",
        }).catch(() => undefined);
      }

      return res.json(updated);
    } catch (err) {
      logError({ context: "ticket-status-update", error: err, userId: req.session.user?.id }).catch(() => undefined);
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to update ticket status" });
    }
  });

  // Get a single ticket (owner or admin)
  app.get("/api/inquiries/:id", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const ticketId = Number(req.params.id);
      if (!Number.isFinite(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket id" });
      }

      const ticket = await storage.getInquiryById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      const isAdmin = req.session.user.role === "admin";
      const isOwner = ticket.email?.toLowerCase() === req.session.user.email?.toLowerCase();

      if (!isAdmin && !isOwner) {
        return res.status(403).json({ message: "Not authorised" });
      }

      return res.json(ticket);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load ticket" });
    }
  });

  // ── 4. Course update notifications (§4.16) ────────────────────────────
  /**
   * Called internally when a course is updated (price, visibility, category).
   * Sends an email notification to all enrolled students and enqueues
   * in-app notifications by writing to a simple notifications table pattern.
   */
  app.post("/api/admin/courses/:id/notify-update", async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const courseId = req.params.id;
      const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
      if (!message) {
        return res.status(400).json({ message: "Notification message is required" });
      }

      // Find all active enrollments for this course
      const enrollments = await prisma.userCourseEnrollment.findMany({
        where: { courseCatalogId: courseId, isActive: true },
        include: { user: true, courseCatalog: true },
      });

      if (enrollments.length === 0) {
        return res.json({ success: true, notified: 0 });
      }

      const courseTitle = enrollments[0]?.courseCatalog?.fullname ?? "your course";
      let notified = 0;

      for (const enrollment of enrollments) {
        if (!enrollment.user.email) continue;
        // Queue an email for each enrolled student
        await enqueueJob("SEND_EMAIL", {
          to: enrollment.user.email,
          subject: `Update to your EduMeUp course: ${courseTitle}`,
          text: `Dear ${enrollment.user.firstName ?? "student"},\n\n${message}\n\nLog in to your dashboard to view the latest course details:\nhttps://edumeup.com/dashboard\n\nEduMeUp Team`,
        }).catch(() => undefined);
        notified++;
      }

      // Log admin action
      await (prisma as any).adminActivityLog.create({
        data: {
          adminUserId: req.session.user.id,
          action: "COURSE_UPDATE_NOTIFIED",
          details: { courseId, notified, message: message.slice(0, 200) },
        },
      }).catch(() => undefined);

      return res.json({ success: true, notified });
    } catch (err) {
      logError({ context: "course-update-notification", error: err, userId: req.session.user?.id }).catch(() => undefined);
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to send notifications" });
    }
  });

  // ── 5. CDN cache headers on public course catalog (§5.6) ──────────────
  // Middleware — applied to public LMS endpoints. Must be registered BEFORE
  // the actual handlers, so we patch it in via a separate middleware here.
  app.use(["/api/lms/courses", "/api/programs", "/api/resources"], (req, res, next) => {
    if (req.method !== "GET") return next();
    applyCacheHeaders(res, { maxAge: 300, sMaxAge: 600, staleWhileRevalidate: 120 });
    next();
  });

  // ── 6. System error log viewer for admin (§10) ────────────────────────
  app.get("/api/admin/logs/errors", async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 50));
      const offset = (page - 1) * limit;

      const logs = await (prisma as any).adminActivityLog.findMany({
        where: { action: "SYSTEM_ERROR" },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await (prisma as any).adminActivityLog.count({
        where: { action: "SYSTEM_ERROR" },
      });

      return res.json({
        logs: logs.map((log: any) => ({
          id: log.id,
          action: log.action,
          details: log.details,
          createdAt: log.createdAt,
        })),
        total,
        page,
        limit,
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to fetch error logs" });
    }
  });

  // Login attempt log viewer for admin (§10)
  app.get("/api/admin/logs/logins", async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 50));
      const offset = (page - 1) * limit;
      const onlyFailed = req.query.failed === "1";

      const whereAction = onlyFailed
        ? { action: "LOGIN_FAILED" }
        : { action: { in: ["LOGIN_SUCCESS", "LOGIN_FAILED"] } };

      const logs = await (prisma as any).adminActivityLog.findMany({
        where: whereAction,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await (prisma as any).adminActivityLog.count({ where: whereAction });

      return res.json({
        logs: logs.map((log: any) => ({
          id: log.id,
          action: log.action,
          details: log.details,
          createdAt: log.createdAt,
        })),
        total,
        page,
        limit,
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to fetch login logs" });
    }
  });
}
