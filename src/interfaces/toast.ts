export interface IToast {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
}
