import { useMemo, useState } from "react";
import { Download, RefreshCcw, RotateCcw, ShieldAlert, CreditCard } from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInitPayment } from "@/hooks/use-payments";
import { useRequestRefund } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { formatMoneyFromMinorUnits } from "@/lib/currency";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  programId: number;
};

type Order = {
  id: number;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus?: string | null;
  paymentProvider?: string | null;
  paymentRef?: string | null;
  invoiceNumber?: string | null;
  paidAmount?: number;
  remainingAmount?: number;
  allowPartialPayment?: boolean;
  refundStatus?: string | null;
  canRetryPayment?: boolean;
  refundable?: boolean;
  paymentNotes?: Array<{ status: string; message: string; createdAt: string }>;
  createdAt: string;
  items: OrderItem[];
};

type StudentPaymentsPanelProps = {
  orders?: Order[];
  studentName: string;
};

function downloadInvoice(order: Order, studentName: string) {
  const doc = new jsPDF();
  doc.setFillColor(35, 102, 201);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("EduMeUp Invoice", 14, 18);
  doc.setFontSize(10);
  doc.text(`Invoice: ${order.invoiceNumber || `ORD-${order.id}`}`, 14, 28);
  doc.text(new Date(order.createdAt).toLocaleString(), 148, 28);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Student: ${studentName}`, 14, 46);
  doc.text(`Order #: ${order.id}`, 14, 54);
  doc.text(`Payment status: ${order.paymentStatus || order.status}`, 14, 62);
  doc.text(`Payment provider: ${order.paymentProvider || "EduMeUp"}`, 14, 70);

  let y = 84;
  doc.setFontSize(11);
  doc.text("Items", 14, y);
  y += 8;

  order.items.forEach((item) => {
    doc.text(`• ${item.title}`, 16, y);
    doc.text(formatMoneyFromMinorUnits(item.price), 172, y, { align: "right" });
    y += 8;
  });

  y += 4;
  doc.line(14, y, 196, y);
  y += 8;
  doc.setFontSize(12);
  doc.text("Total", 14, y);
  doc.text(formatMoneyFromMinorUnits(order.totalAmount), 172, y, { align: "right" });
  y += 8;
  doc.text("Paid", 14, y);
  doc.text(formatMoneyFromMinorUnits(order.paidAmount ?? 0), 172, y, { align: "right" });
  y += 8;
  doc.text("Remaining", 14, y);
  doc.text(formatMoneyFromMinorUnits(order.remainingAmount ?? 0), 172, y, { align: "right" });

  doc.save(`EduMeUp-Invoice-${order.invoiceNumber || order.id}.pdf`);
}

export function StudentPaymentsPanel({ orders = [], studentName }: StudentPaymentsPanelProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(orders[0]?.id ?? null);
  const initPayment = useInitPayment();
  const requestRefund = useRequestRefund();
  const { toast } = useToast();

  const sortedOrders = useMemo(
    () => [...orders].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
    [orders],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#2366c9]" />
          Orders & Payments
        </CardTitle>
        <p className="mt-1 text-sm text-slate-600">
          Track payment status, download invoices, retry failed payments, and request refunds when eligible.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedOrders.length === 0 ? (
          <p className="text-sm text-slate-600">No orders yet.</p>
        ) : (
          sortedOrders.map((order) => {
            const remaining = order.remainingAmount ?? Math.max(order.totalAmount - (order.paidAmount ?? 0), 0);
            const canRetry = Boolean(order.canRetryPayment || ["pending", "failed", "cancelled"].includes(order.status));
            const canRefund = Boolean(order.refundable && order.refundStatus !== "requested");
            const paymentLabel = order.paymentStatus || order.status;
            const isExpanded = expandedOrderId === order.id;

            return (
              <div key={order.id} className="rounded-3xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="flex w-full items-center justify-between gap-3 p-5 text-left"
                >
                  <div>
                    <p className="font-bold text-slate-900">Order #{order.id}</p>
                    <p className="mt-1 text-sm text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className={`rounded-full px-3 py-1 ${paymentLabel === "paid" || paymentLabel === "completed" ? "bg-emerald-100 text-emerald-700" : paymentLabel === "partial" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                      {paymentLabel}
                    </span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                      {formatMoneyFromMinorUnits(order.totalAmount)}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200 p-5">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Paid</p>
                        <p className="mt-2 text-2xl font-black text-slate-900">{formatMoneyFromMinorUnits(order.paidAmount ?? 0)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Remaining</p>
                        <p className="mt-2 text-2xl font-black text-slate-900">{formatMoneyFromMinorUnits(remaining)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Provider</p>
                        <p className="mt-2 text-2xl font-black text-slate-900">{order.paymentProvider || "EduMeUp"}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">Course #{item.programId}</p>
                          </div>
                          <p className="text-sm font-semibold text-slate-700">{formatMoneyFromMinorUnits(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Payment timeline</p>
                      <div className="mt-3 space-y-3">
                        {(order.paymentNotes || []).length > 0 ? (
                          order.paymentNotes!.map((note, index) => (
                            <div key={`${note.status}-${note.createdAt}-${index}`} className="rounded-xl bg-white p-3 shadow-sm">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-slate-900">{note.status.replace(/_/g, " ")}</p>
                                <p className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</p>
                              </div>
                              <p className="mt-1 text-sm text-slate-600">{note.message}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No payment events yet.</p>
                        )}
                      </div>
                    </div>

                    {(order.paymentRef || order.invoiceNumber) && (
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                        {order.paymentRef && <span>Reference: {order.paymentRef}</span>}
                        {order.invoiceNumber && <span>Invoice: {order.invoiceNumber}</span>}
                        {order.refundStatus && <span>Refund: {order.refundStatus}</span>}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => downloadInvoice(order, studentName)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>

                      {canRetry && remaining > 0 ? (
                        <Button
                          type="button"
                          onClick={async () => {
                            try {
                              const payment = await initPayment.mutateAsync({
                                items: order.items.map((item) => ({
                                  programId: item.programId,
                                  title: item.title,
                                  price: item.price,
                                })),
                                totalAmount: order.totalAmount,
                                amountToPay: remaining,
                              });
                              window.location.assign(payment.checkoutUrl);
                            } catch (error) {
                              toast({
                                title: "Retry failed",
                                description: error instanceof Error ? error.message : "Could not restart payment",
                                variant: "destructive",
                              });
                            }
                          }}
                          disabled={initPayment.isPending}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          {remaining < order.totalAmount ? "Pay Remaining Balance" : "Retry Payment"}
                        </Button>
                      ) : null}

                      {canRefund ? (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={async () => {
                            try {
                              await requestRefund.mutateAsync(order.id);
                              toast({
                                title: "Refund requested",
                                description: "Your refund request has been sent for review.",
                              });
                            } catch (error) {
                              toast({
                                title: "Refund unavailable",
                                description: error instanceof Error ? error.message : "Could not request refund",
                                variant: "destructive",
                              });
                            }
                          }}
                          disabled={requestRefund.isPending}
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Request Refund
                        </Button>
                      ) : null}

                      {remaining > 0 && order.allowPartialPayment ? (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={async () => {
                            try {
                              const payment = await initPayment.mutateAsync({
                                items: order.items.map((item) => ({
                                  programId: item.programId,
                                  title: item.title,
                                  price: item.price,
                                })),
                                totalAmount: order.totalAmount,
                                amountToPay: Math.min(remaining, order.totalAmount),
                              });
                              window.location.assign(payment.checkoutUrl);
                            } catch (error) {
                              toast({
                                title: "Partial payment failed",
                                description: error instanceof Error ? error.message : "Could not start partial payment",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Partial Payment
                        </Button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
