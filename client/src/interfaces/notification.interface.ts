export interface INotification {
  message: string;
  type: 'success' | 'error' | 'info';
  id?: number;
}
