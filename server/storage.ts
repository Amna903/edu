import {
  programs,
  type Program,
  type InsertProgram,
  resources,
  type Resource,
  type InsertResource,
  inquiries,
  type Inquiry,
  type InsertInquiry,
  orders,
  type Order,
  type InsertOrder,
  orderItems,
  type OrderItem,
  type InsertOrderItem,
  pendingPayments,
  scholarshipCodes,
  registeredCountries,
  registrationCountries,
} from "../shared/schema.js";
import type { CheckoutItem } from "../shared/schema.js";
import type { ScholarshipCodeRecord } from "./scholarship.js";
import { db } from "./db.js";
import { desc, eq, sql } from "drizzle-orm";

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

export class MemStorage implements IStorage {
  private programs: Map<number, Program>;
  private resources: Map<number, Resource>;
  private inquiries: Map<number, Inquiry>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private parentChildLinks: Map<string, Set<number>>;
  private pendingPayments: Map<string, PendingPayment>;
  private scholarshipCodes: Map<string, ScholarshipCodeRecord>;
  private registeredCountries: Map<number, string>;
  private registrationCountryByUsername: Map<string, string>;
  private currentId: { [key: string]: number };

  constructor() {
    this.programs = new Map();
    this.resources = new Map();
    this.inquiries = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.parentChildLinks = new Map();
    this.pendingPayments = new Map();
    this.scholarshipCodes = new Map();
    this.registeredCountries = new Map();
    this.registrationCountryByUsername = new Map();
    this.currentId = { programs: 1, resources: 1, inquiries: 1, orders: 1, orderItems: 1 };
  }

  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return Array.from(this.programs.values()).find(p => p.slug === slug);
  }

async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentId.programs++;
    const program: Program = { 
      ...insertProgram, 
      id, 
      createdAt: new Date(), // Add this
      price: insertProgram.price ?? null,
      prices: insertProgram.prices ?? null,
      features: insertProgram.features ?? null,
      isPopular: insertProgram.isPopular ?? false
    };
    this.programs.set(id, program);
    return program;
  }
  async getResources(category?: string, subject?: string): Promise<Resource[]> {
    let all = Array.from(this.resources.values());
    if (category) all = all.filter(r => r.category === category);
    if (subject) all = all.filter(r => r.subject === subject);
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
      createdAt: new Date(), // Add this
      downloadCount: 0,      // Add this
      subject: insertResource.subject ?? null,
      thumbnailUrl: insertResource.thumbnailUrl ?? null,
      isFree: insertResource.isFree ?? false
    };
    this.resources.set(id, resource);
    return resource;
  }
async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [created] = await db
      .insert(inquiries)
      .values({
        ...insertInquiry,
        email: insertInquiry.email.toLowerCase(),
        learningMode: insertInquiry.learningMode ?? null,
        message: insertInquiry.message ?? null,
      })
      .returning();

    return created;
  }

  async getInquiriesByEmail(email: string): Promise<Inquiry[]> {
    return db
      .select()
      .from(inquiries)
      .where(sql`lower(${inquiries.email}) = ${email}`)
      .orderBy(desc(inquiries.createdAt));
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiryById(id: number): Promise<Inquiry | undefined> {
    const [ticket] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    return ticket;
  }

  async updateInquiry(id: number, updates: Partial<Inquiry>): Promise<Inquiry | undefined> {
    const [updated] = await db
      .update(inquiries)
      .set({
        ...updates,
      })
      .where(eq(inquiries.id, id))
      .returning();

    return updated;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [created] = await db
      .insert(orders)
      .values({
        ...insertOrder,
        status: insertOrder.status ?? "pending",
        paymentStatus: insertOrder.paymentStatus ?? "pending",
        paidAmount: insertOrder.paidAmount ?? 0,
        remainingAmount: insertOrder.remainingAmount ?? insertOrder.totalAmount,
        allowPartialPayment: insertOrder.allowPartialPayment ?? true,
        paymentNotes: insertOrder.paymentNotes ?? [],
      })
      .returning();

    return created;
  }

  async getOrderById(orderId: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    return order;
  }

  async updateOrder(orderId: number, updates: Partial<Order>): Promise<Order | undefined> {
    const [updated] = await db.update(orders).set(updates).where(eq(orders.id, orderId)).returning();
    return updated;
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const [created] = await db.insert(orderItems).values(insertItem).returning();
    return created;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
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
    await db
      .insert(pendingPayments)
      .values(payment)
      .onConflictDoUpdate({
        target: pendingPayments.orderRef,
        set: payment,
      });
  }

  async getPendingPayment(orderRef: string): Promise<PendingPayment | undefined> {
    const [payment] = await db.select().from(pendingPayments).where(eq(pendingPayments.orderRef, orderRef)).limit(1);
    if (!payment) return undefined;
    return {
      ...payment,
      amountToPay: payment.amountToPay ?? undefined,
      scholarshipCode: payment.scholarshipCode ?? undefined,
      tracker: payment.tracker ?? undefined,
      orderId: payment.orderId ?? undefined,
      createdAt: payment.createdAt ?? new Date(),
    };
  }

  async deletePendingPayment(orderRef: string): Promise<void> {
    await db.delete(pendingPayments).where(eq(pendingPayments.orderRef, orderRef));
  }

  async saveScholarshipCode(record: ScholarshipCodeRecord): Promise<void> {
    await db
      .insert(scholarshipCodes)
      .values({
        code: record.code.toUpperCase(),
        moodleUserId: record.moodleUserId,
        email: record.email,
        name: record.name,
        country: record.country,
        concessionPercent: record.concessionPercent,
        region: record.region,
        expiresAt: record.expiresAt,
        used: record.used,
        usedAt: record.usedAt,
        usedByUserId: record.usedByUserId,
      })
      .onConflictDoUpdate({
        target: scholarshipCodes.code,
        set: {
          moodleUserId: record.moodleUserId,
          email: record.email,
          name: record.name,
          country: record.country,
          concessionPercent: record.concessionPercent,
          region: record.region,
          expiresAt: record.expiresAt,
          used: record.used,
          usedAt: record.usedAt,
          usedByUserId: record.usedByUserId,
        },
      });
  }

  async getScholarshipCode(code: string): Promise<ScholarshipCodeRecord | undefined> {
    const [record] = await db.select().from(scholarshipCodes).where(eq(scholarshipCodes.code, code.toUpperCase())).limit(1);
    return record
      ? {
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
        }
      : undefined;
  }

  async getActiveScholarshipCodeForUser(
    moodleUserId: number,
  ): Promise<ScholarshipCodeRecord | undefined> {
    const rows = await db
      .select()
      .from(scholarshipCodes)
      .where(sql`${scholarshipCodes.moodleUserId} = ${moodleUserId} and ${scholarshipCodes.used} = false and ${scholarshipCodes.expiresAt} > now()`)
      .orderBy(desc(scholarshipCodes.createdAt))
      .limit(1);
    const record = rows[0];
    return record
      ? {
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
        }
      : undefined;
  }

  async markScholarshipCodeUsed(code: string, userId: string): Promise<void> {
    await db
      .update(scholarshipCodes)
      .set({ used: true, usedAt: new Date(), usedByUserId: userId })
      .where(eq(scholarshipCodes.code, code.toUpperCase()));
  }

  async setRegisteredCountry(moodleUserId: number, country: string): Promise<void> {
    await db
      .insert(registeredCountries)
      .values({ moodleUserId, country })
      .onConflictDoUpdate({
        target: registeredCountries.moodleUserId,
        set: { country, updatedAt: new Date() },
      });
  }

  async getRegisteredCountry(moodleUserId: number): Promise<string | undefined> {
    const [record] = await db.select().from(registeredCountries).where(eq(registeredCountries.moodleUserId, moodleUserId)).limit(1);
    return record?.country;
  }

  async setRegistrationCountryForUsername(username: string, country: string): Promise<void> {
    const normalizedUsername = username.trim().toLowerCase();
    await db
      .insert(registrationCountries)
      .values({ username: normalizedUsername, country })
      .onConflictDoUpdate({
        target: registrationCountries.username,
        set: { country },
      });
  }

  async takeRegistrationCountryForUsername(username: string): Promise<string | undefined> {
    const key = username.trim().toLowerCase();
    const [record] = await db.select().from(registrationCountries).where(eq(registrationCountries.username, key)).limit(1);
    if (record) await db.delete(registrationCountries).where(eq(registrationCountries.username, key));
    return record?.country;
  }
}

export const storage = new MemStorage();
