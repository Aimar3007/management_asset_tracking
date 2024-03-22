export interface ToastProps {
    header: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning' | 'default'
}
export interface ToastService {
    show: boolean
    toast: ToastProps
}
