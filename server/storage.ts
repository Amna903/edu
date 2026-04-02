import { programs, type Program, type InsertProgram, resources, type Resource, type InsertResource, inquiries, type Inquiry, type InsertInquiry, orders, type Order, type InsertOrder, orderItems, type OrderItem, type InsertOrderItem, enrollments, type Enrollment, type InsertEnrollment } from "@shared/schema";
import type { CheckoutItem } from "@shared/schema";

export interface IStorage {
  getPrograms(): Promise<Program[]>;
  getProgramBySlug(slug: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  getResources(category?: string, subject?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  linkParentToChild(parentUserId: string, childMoodleUserId: number): Promise<void>;
  getLinkedChildren(parentUserId: string): Promise<number[]>;
  createPendingPayment(payment: PendingPayment): Promise<void>;
  getPendingPayment(orderRef: string): Promise<PendingPayment | undefined>;
  deletePendingPayment(orderRef: string): Promise<void>;
}

export interface PendingPayment {
  orderRef: string;
  userId: string;
  items: CheckoutItem[];
  totalAmount: number;
  tracker?: string;
  createdAt: Date;
}

export class MemStorage implements IStorage {
  private programs: Map<number, Program>;
  private resources: Map<number, Resource>;
  private inquiries: Map<number, Inquiry>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private enrollments: Map<number, Enrollment>;
  private parentChildLinks: Map<string, Set<number>>;
  private pendingPayments: Map<string, PendingPayment>;
  private currentId: { [key: string]: number };

  constructor() {
    this.programs = new Map();
    this.resources = new Map();
    this.inquiries = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.enrollments = new Map();
    this.parentChildLinks = new Map();
    this.pendingPayments = new Map();
    this.currentId = { programs: 1, resources: 1, inquiries: 1, orders: 1, orderItems: 1, enrollments: 1 };
  }

  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return Array.from(this.programs.values()).find(p => p.slug === slug);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentId.programs++;
    const program: Program = { ...insertProgram, id };
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
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentId.inquiries++;
    const inquiry: Inquiry = { ...insertInquiry, id, createdAt: new Date() };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId.orders++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentId.orderItems++;
    const item: OrderItem = { ...insertItem, id };
    this.orderItems.set(id, item);
    return item;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentId.enrollments++;
    const enrollment: Enrollment = { ...insertEnrollment, id, enrolledAt: new Date() };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(e => e.userId === userId);
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId)
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter((item) => item.orderId === orderId);
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
    this.pendingPayments.set(payment.orderRef, payment);
  }

  async getPendingPayment(orderRef: string): Promise<PendingPayment | undefined> {
    return this.pendingPayments.get(orderRef);
  }

  async deletePendingPayment(orderRef: string): Promise<void> {
    this.pendingPayments.delete(orderRef);
  }
}

export const storage = new MemStorage();
