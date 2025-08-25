export interface INotification {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id?: number;
}
