import { IHistories } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'

export interface ITracker {
    icon?: string
    bgColor?: 'blue' | 'white'
    statusIcon: any
    data: IHistories[]
    headers: any
    isLoading?: boolean
}
