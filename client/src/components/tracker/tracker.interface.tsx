export interface ITracker {
    icon?: string
    bgColor?: 'blue' | 'white'
    statusIcon: any
    data: ITrackerData[]
    headers: any
    isLoading?: boolean
}

export interface ITrackerData {
    id: string
    title: string
    description: string
    byUserName: string
    at: string
}