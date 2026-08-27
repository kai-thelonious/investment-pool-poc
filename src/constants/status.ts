export const TRANSACTION_STATUS = {
  PENDING: 'Pending Approval',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export type TransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];
