import { Prisma } from "@prisma/client";
import type {
  Program,
  InsertProgram,
  Resource,
  InsertResource,
  Inquiry,
  InsertInquiry,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem,
  PaymentNote,
} from "../shared/schema.js";
import type { CheckoutItem } from "../shared/schema.js";
import type { ScholarshipCodeRecord } from "./scholarship.js";
import { db } from "./db.js";

export interface IStorage {
  getPrograms(): Promise<Program[]>;
  getProgramBySlug(slug: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;

  getResources(category?: string, subject?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;

  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiriesByEmail(email: string): Promise<Inquiry[]>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiryById(id: number): Promise<Inquiry | undefined>;
  updateInquiry(id: number, updates: Partial<Inquiry>): Promise<Inquiry | undefined>;

  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(orderId: number): Promise<Order | undefined>;
  updateOrder(orderId: number, updates: Partial<Order>): Promise<Order | undefined>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  linkParentToChild(parentUserId: string, childMoodleUserId: number): Promise<void>;
  getLinkedChildren(parentUserId: string): Promise<number[]>;
  createPendingPayment(payment: PendingPayment): Promise<void>;
  getPendingPayment(orderRef: string): Promise<PendingPayment | undefined>;
  deletePendingPayment(orderRef: string): Promise<void>;

  saveScholarshipCode(record: ScholarshipCodeRecord): Promise<void>;
  getScholarshipCode(code: string): Promise<ScholarshipCodeRecord | undefined>;
  getActiveScholarshipCodeForUser(moodleUserId: number): Promise<ScholarshipCodeRecord | undefined>;
  markScholarshipCodeUsed(code: string, userId: string): Promise<void>;
  setRegisteredCountry(moodleUserId: number, country: string): Promise<void>;
  getRegisteredCountry(moodleUserId: number): Promise<string | undefined>;
  setRegistrationCountryForUsername(username: string, country: string): Promise<void>;
  takeRegistrationCountryForUsername(username: string): Promise<string | undefined>;
}

export interface PendingPayment {
  orderRef: string;
  userId: string;
  items: CheckoutItem[];
  totalAmount: number;
  amountToPay?: number;
  scholarshipCode?: string;
  tracker?: string;
  orderId?: number;
  createdAt: Date;
}

function toOrder(row: {
  id: number;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string | null;
  paymentProvider: string | null;
  paymentRef: string | null;
  invoiceNumber: string | null;
  paidAmount: number | null;
  remainingAmount: number | null;
  allowPartialPayment: boolean | null;
  refundStatus: string | null;
  paymentNotes: Prisma.JsonValue | null;
  createdAt: Date | null;
}): Order {
  return {
    ...row,
    paymentNotes: (row.paymentNotes as PaymentNote[] | null) ?? null,
  };
}

function toScholarshipRecord(record: {
  code: string;
  moodleUserId: number;
  email: string;
  name: string;
  country: string;
  concessionPercent: number;
  region: string;
  expiresAt: Date;
  createdAt: Date | null;
  used: boolean;
  usedAt: Date | null;
  usedByUserId: string | null;
}): ScholarshipCodeRecord {
  return {
    code: record.code,
    moodleUserId: record.moodleUserId,
    email: record.email,
    name: record.name,
    country: record.country,
    concessionPercent: record.concessionPercent,
    region: record.region as ScholarshipCodeRecord["region"],
    expiresAt: record.expiresAt,
    createdAt: record.createdAt ?? new Date(),
    used: record.used,
    usedAt: record.usedAt ?? undefined,
    usedByUserId: record.usedByUserId ?? undefined,
  };
}

export class MemStorage implements IStorage {
  private programs: Map<number, Program>;
  private resources: Map<number, Resource>;
  private parentChildLinks: Map<string, Set<number>>;
  private currentId: { programs: number; resources: number };

  constructor() {
    this.programs = new Map();
    this.resources = new Map();
    this.parentChildLinks = new Map();
    this.currentId = { programs: 1, resources: 1 };
  }

  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return Array.from(this.programs.values()).find((p) => p.slug === slug);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentId.programs++;
    const program: Program = {
      ...insertProgram,
      id,
      createdAt: new Date(),
      price: insertProgram.price ?? null,
      prices: insertProgram.prices ?? null,
      features: insertProgram.features ?? null,
      isPopular: insertProgram.isPopular ?? false,
    };
    this.programs.set(id, program);
    return program;
  }

  async getResources(category?: string, subject?: string): Promise<Resource[]> {
    let all = Array.from(this.resources.values());
    if (category) all = all.filter((r) => r.category === category);
    if (subject) all = all.filter((r) => r.subject === subject);
    return all;
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId.resources++;
    const resource: Resource = {
      ...insertResource,
      id,
      createdAt: new Date(),
      downloadCount: 0,
      subject: insertResource.subject ?? null,
      thumbnailUrl: insertResource.thumbnailUrl ?? null,
      isFree: insertResource.isFree ?? false,
    };
    this.resources.set(id, resource);
    return resource;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    return db.inquiries.create({
      data: {
        ...insertInquiry,
        email: insertInquiry.email.toLowerCase(),
        learningMode: insertInquiry.learningMode ?? null,
        message: insertInquiry.message ?? null,
      },
    });
  }

  async getInquiriesByEmail(email: string): Promise<Inquiry[]> {
    return db.inquiries.findMany({
      where: { email: { equals: email, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return db.inquiries.findMany({ orderBy: { createdAt: "desc" } });
  }

  async getInquiryById(id: number): Promise<Inquiry | undefined> {
    return (await db.inquiries.findUnique({ where: { id } })) ?? undefined;
  }

  async updateInquiry(id: number, updates: Partial<Inquiry>): Promise<Inquiry | undefined> {
    try {
      return await db.inquiries.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const created = await db.orders.create({
      data: {
        userId: insertOrder.userId,
        totalAmount: insertOrder.totalAmount,
        status: insertOrder.status ?? "pending",
        paymentStatus: insertOrder.paymentStatus ?? "pending",
        paymentProvider: insertOrder.paymentProvider ?? null,
        paymentRef: insertOrder.paymentRef ?? null,
        invoiceNumber: insertOrder.invoiceNumber ?? null,
        paidAmount: insertOrder.paidAmount ?? 0,
        remainingAmount: insertOrder.remainingAmount ?? insertOrder.totalAmount,
        allowPartialPayment: insertOrder.allowPartialPayment ?? true,
        refundStatus: insertOrder.refundStatus ?? null,
        paymentNotes: (insertOrder.paymentNotes ?? []) as Prisma.InputJsonValue,
      },
    });
    return toOrder(created);
  }

  async getOrderById(orderId: number): Promise<Order | undefined> {
    const order = await db.orders.findUnique({ where: { id: orderId } });
    return order ? toOrder(order) : undefined;
  }

  async updateOrder(orderId: number, updates: Partial<Order>): Promise<Order | undefined> {
    try {
      const { paymentNotes, ...rest } = updates;
      const updated = await db.orders.update({
        where: { id: orderId },
        data: {
          ...rest,
          ...(paymentNotes !== undefined
            ? { paymentNotes: paymentNotes as Prisma.InputJsonValue }
            : {}),
        },
      });
      return toOrder(updated);
    } catch {
      return undefined;
    }
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    return db.orderItems.create({ data: insertItem });
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const rows = await db.orders.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toOrder);
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return db.orderItems.findMany({ where: { orderId } });
  }

  async linkParentToChild(parentUserId: string, childMoodleUserId: number): Promise<void> {
    const existing = this.parentChildLinks.get(parentUserId) ?? new Set<number>();
    existing.add(childMoodleUserId);
    this.parentChildLinks.set(parentUserId, existing);
  }

  async getLinkedChildren(parentUserId: string): Promise<number[]> {
    return Array.from(this.parentChildLinks.get(parentUserId) ?? []);
  }

  async createPendingPayment(payment: PendingPayment): Promise<void> {
    await db.pendingPayments.upsert({
      where: { orderRef: payment.orderRef },
      create: {
        orderRef: payment.orderRef,
        userId: payment.userId,
        items: payment.items as Prisma.InputJsonValue,
        totalAmount: payment.totalAmount,
        amountToPay: payment.amountToPay ?? null,
        scholarshipCode: payment.scholarshipCode ?? null,
        tracker: payment.tracker ?? null,
        orderId: payment.orderId ?? null,
        createdAt: payment.createdAt,
      },
      update: {
        userId: payment.userId,
        items: payment.items as Prisma.InputJsonValue,
        totalAmount: payment.totalAmount,
        amountToPay: payment.amountToPay ?? null,
        scholarshipCode: payment.scholarshipCode ?? null,
        tracker: payment.tracker ?? null,
        orderId: payment.orderId ?? null,
        createdAt: payment.createdAt,
      },
    });
  }

  async getPendingPayment(orderRef: string): Promise<PendingPayment | undefined> {
    const payment = await db.pendingPayments.findUnique({ where: { orderRef } });
    if (!payment) return undefined;
    return {
      orderRef: payment.orderRef,
      userId: payment.userId,
      items: payment.items as CheckoutItem[],
      totalAmount: payment.totalAmount,
      amountToPay: payment.amountToPay ?? undefined,
      scholarshipCode: payment.scholarshipCode ?? undefined,
      tracker: payment.tracker ?? undefined,
      orderId: payment.orderId ?? undefined,
      createdAt: payment.createdAt ?? new Date(),
    };
  }

  async deletePendingPayment(orderRef: string): Promise<void> {
    await db.pendingPayments.delete({ where: { orderRef } }).catch(() => undefined);
  }

  async saveScholarshipCode(record: ScholarshipCodeRecord): Promise<void> {
    const code = record.code.toUpperCase();
    await db.scholarshipCodes.upsert({
      where: { code },
      create: {
        code,
        moodleUserId: record.moodleUserId,
        email: record.email,
        name: record.name,
        country: record.country,
        concessionPercent: record.concessionPercent,
        region: record.region,
        expiresAt: record.expiresAt,
        used: record.used,
        usedAt: record.usedAt ?? null,
        usedByUserId: record.usedByUserId ?? null,
      },
      update: {
        moodleUserId: record.moodleUserId,
        email: record.email,
        name: record.name,
        country: record.country,
        concessionPercent: record.concessionPercent,
        region: record.region,
        expiresAt: record.expiresAt,
        used: record.used,
        usedAt: record.usedAt ?? null,
        usedByUserId: record.usedByUserId ?? null,
      },
    });
  }

  async getScholarshipCode(code: string): Promise<ScholarshipCodeRecord | undefined> {
    const record = await db.scholarshipCodes.findUnique({
      where: { code: code.toUpperCase() },
    });
    return record ? toScholarshipRecord(record) : undefined;
  }

  async getActiveScholarshipCodeForUser(
    moodleUserId: number,
  ): Promise<ScholarshipCodeRecord | undefined> {
    const record = await db.scholarshipCodes.findFirst({
      where: {
        moodleUserId,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
    return record ? toScholarshipRecord(record) : undefined;
  }

  async markScholarshipCodeUsed(code: string, userId: string): Promise<void> {
    await db.scholarshipCodes.update({
      where: { code: code.toUpperCase() },
      data: { used: true, usedAt: new Date(), usedByUserId: userId },
    });
  }

  async setRegisteredCountry(moodleUserId: number, country: string): Promise<void> {
    await db.registeredCountries.upsert({
      where: { moodleUserId },
      create: { moodleUserId, country },
      update: { country, updatedAt: new Date() },
    });
  }

  async getRegisteredCountry(moodleUserId: number): Promise<string | undefined> {
    const record = await db.registeredCountries.findUnique({ where: { moodleUserId } });
    return record?.country;
  }

  async setRegistrationCountryForUsername(username: string, country: string): Promise<void> {
    const normalizedUsername = username.trim().toLowerCase();
    const existing = await db.registrationCountries.findFirst({
      where: { username: normalizedUsername },
    });
    if (existing) {
      await db.registrationCountries.update({
        where: { id: existing.id },
        data: { country },
      });
      return;
    }
    await db.registrationCountries.create({
      data: { username: normalizedUsername, country },
    });
  }

  async takeRegistrationCountryForUsername(username: string): Promise<string | undefined> {
    const key = username.trim().toLowerCase();
    const record = await db.registrationCountries.findFirst({ where: { username: key } });
    if (record) {
      await db.registrationCountries.delete({ where: { id: record.id } });
    }
    return record?.country;
  }
}

export const storage = new MemStorage();
