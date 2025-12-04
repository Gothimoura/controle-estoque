import type React from 'react';

// ============================================
// GOWORK TYPESCRIPT TYPES
// ============================================

// Database Enums
export type UserRole =
  | 'executor'
  | 'controller'
  | 'warehouse_storage'
  | 'warehouse_delivery'
  | 'designer'
  | 'admin'
  | 'developer'
  | 'driver';

export type RequestStatus =
  | 'pending'
  | 'approved'
  | 'in_separation'
  | 'separated'
  | 'in_transit'
  | 'delivered'
  | 'rejected'
  | 'cancelled';

export type DeliveryStatus = 'pending' | 'in_transit' | 'delivered' | 'failed';

export type FurnitureStatus =
  | 'pending_design'
  | 'in_design'
  | 'approved'
  | 'in_production'
  | 'completed'
  | 'rejected';

export type ItemCategory =
  | 'material_escritorio'
  | 'equipamento_ti'
  | 'mobiliario'
  | 'limpeza'
  | 'seguranca'
  | 'outros';

export type LoanStatus = 'active' | 'returned' | 'overdue' | 'lost';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export type MovementType = 'in' | 'out' | 'transfer' | 'adjustment';

export type Priority = 'low' | 'normal' | 'high' | 'urgent';

// ============================================
// Database Tables Types
// ============================================

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  unit_id?: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  description?: string;
  address?: string;
  phone?: string;
  manager_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  category: ItemCategory;
  sku?: string;
  unit_measure: string;
  min_stock: number;
  image_url?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Stock {
  id: string;
  item_id: string;
  unit_id: string;
  quantity: number;
  reserved_quantity: number;
  last_restock_date?: string;
  last_restock_by?: string;
  created_at: string;
  updated_at: string;
  // Relations
  item?: Item;
  unit?: Unit;
}

export interface StockMovement {
  id: string;
  item_id: string;
  unit_id: string;
  movement_type: MovementType;
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  reason?: string;
  reference_id?: string;
  created_by?: string;
  created_at: string;
  // Relations
  item?: Item;
  unit?: Unit;
  creator?: Profile;
}

export interface Request {
  id: string;
  request_number: string;
  requester_id: string;
  requester_unit_id: string;
  destination_unit_id: string;
  status: RequestStatus;
  priority: Priority;
  notes?: string;
  approved_by?: string;
  approved_at?: string;
  rejected_by?: string;
  rejected_at?: string;
  rejection_reason?: string;
  separated_by?: string;
  separated_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  requester?: Profile;
  requester_unit?: Unit;
  destination_unit?: Unit;
  items?: RequestItem[];
  approver?: Profile;
  separator?: Profile;
}

export interface RequestItem {
  id: string;
  request_id: string;
  item_id: string;
  quantity_requested: number;
  quantity_approved?: number;
  quantity_separated: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Relations
  item?: Item;
}

export interface Delivery {
  id: string;
  delivery_number: string;
  request_id: string;
  driver_id?: string;
  vehicle_plate?: string;
  status: DeliveryStatus;
  scheduled_date?: string;
  pickup_time?: string;
  delivery_time?: string;
  receiver_name?: string;
  receiver_signature?: string;
  receiver_document?: string;
  qr_code?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Relations
  request?: Request;
  driver?: Profile;
  creator?: Profile;
}

export interface FurnitureRequest {
  id: string;
  request_number: string;
  requester_id: string;
  requester_unit_id: string;
  furniture_type: string;
  description: string;
  specifications?: Record<string, any>;
  quantity: number;
  status: FurnitureStatus;
  priority: Priority;
  designer_id?: string;
  design_notes?: string;
  design_files?: Array<{ url: string; name: string }>;
  approved_by?: string;
  approved_at?: string;
  rejected_by?: string;
  rejected_at?: string;
  rejection_reason?: string;
  estimated_completion_date?: string;
  actual_completion_date?: string;
  created_at: string;
  updated_at: string;
  // Relations
  requester?: Profile;
  requester_unit?: Unit;
  designer?: Profile;
  approver?: Profile;
}

export interface Loan {
  id: string;
  loan_number: string;
  item_id: string;
  borrower_id: string;
  borrower_unit_id: string;
  quantity: number;
  loan_date: string;
  expected_return_date: string;
  actual_return_date?: string;
  status: LoanStatus;
  condition_on_loan?: string;
  condition_on_return?: string;
  notes?: string;
  approved_by?: string;
  returned_to?: string;
  created_at: string;
  updated_at: string;
  // Relations
  item?: Item;
  borrower?: Profile;
  borrower_unit?: Unit;
  approver?: Profile;
  receiver?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  reference_type?: string;
  reference_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name: string;
  record_id?: string;
  old_data?: Record<string, any>;
  new_data?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  // Relations
  user?: Profile;
}

// ============================================
// Extended Types (with relations)
// ============================================

export interface StockWithDetails extends Stock {
  item: Item;
  unit: Unit;
  available_quantity: number; // quantity - reserved_quantity
}

export interface RequestWithDetails extends Request {
  requester: Profile;
  requester_unit: Unit;
  destination_unit: Unit;
  items: RequestItemWithDetails[];
  delivery?: Delivery;
}

export interface RequestItemWithDetails extends RequestItem {
  item: Item;
  stock?: Stock;
}

export interface DeliveryWithDetails extends Delivery {
  request: RequestWithDetails;
  driver?: Profile;
}

// ============================================
// Form Types
// ============================================

export interface CreateRequestForm {
  destination_unit_id: string;
  priority: Priority;
  notes?: string;
  items: Array<{
    item_id: string;
    quantity: number;
    notes?: string;
  }>;
}

export interface ApproveRequestForm {
  items: Array<{
    id: string;
    quantity_approved: number;
  }>;
  notes?: string;
}

export interface SeparateRequestForm {
  items: Array<{
    id: string;
    quantity_separated: number;
  }>;
}

export interface CreateDeliveryForm {
  request_id: string;
  driver_id?: string;
  vehicle_plate?: string;
  scheduled_date: string;
  notes?: string;
}

export interface ConfirmDeliveryForm {
  receiver_name: string;
  receiver_document: string;
  receiver_signature: string;
  notes?: string;
}

export interface CreateFurnitureRequestForm {
  furniture_type: string;
  description: string;
  specifications?: Record<string, any>;
  quantity: number;
  priority: Priority;
}

export interface CreateLoanForm {
  item_id: string;
  quantity: number;
  expected_return_date: string;
  condition_on_loan?: string;
  notes?: string;
}

export interface ReturnLoanForm {
  condition_on_return?: string;
  notes?: string;
}

export interface StockAdjustmentForm {
  item_id: string;
  unit_id: string;
  quantity: number;
  reason: string;
}

// ============================================
// Filter Types
// ============================================

export interface RequestFilters {
  status?: RequestStatus[];
  priority?: Priority[];
  requester_unit_id?: string;
  destination_unit_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

export interface StockFilters {
  unit_id?: string;
  category?: ItemCategory[];
  low_stock?: boolean;
  search?: string;
}

export interface DeliveryFilters {
  status?: DeliveryStatus[];
  driver_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardStats {
  total_requests: number;
  pending_requests: number;
  in_progress_requests: number;
  completed_requests: number;
  low_stock_items: number;
  pending_deliveries: number;
  active_loans: number;
  overdue_loans: number;
}

export interface StockAlert {
  item: Item;
  stock: Stock;
  percentage: number;
}

// ============================================
// Component Props Types
// ============================================

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// ============================================
// Context Types
// ============================================

export interface AuthContextType {
  user: Profile | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export interface AppContextType {
  // Units
  units: Unit[];
  fetchUnits: () => Promise<void>;

  // Items
  items: Item[];
  fetchItems: () => Promise<void>;
  createItem: (data: Partial<Item>) => Promise<Item>;
  updateItem: (id: string, data: Partial<Item>) => Promise<void>;

  // Stock
  stock: StockWithDetails[];
  fetchStock: (unit_id?: string) => Promise<void>;
  updateStock: (data: StockAdjustmentForm) => Promise<void>;

  // Requests
  requests: RequestWithDetails[];
  fetchRequests: (filters?: RequestFilters) => Promise<void>;
  createRequest: (data: CreateRequestForm) => Promise<Request>;
  approveRequest: (id: string, data: ApproveRequestForm) => Promise<void>;
  rejectRequest: (id: string, reason: string) => Promise<void>;
  separateRequest: (id: string, data: SeparateRequestForm) => Promise<void>;

  // Deliveries
  deliveries: DeliveryWithDetails[];
  fetchDeliveries: (filters?: DeliveryFilters) => Promise<void>;
  createDelivery: (data: CreateDeliveryForm) => Promise<Delivery>;
  confirmDelivery: (id: string, data: ConfirmDeliveryForm) => Promise<void>;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}
