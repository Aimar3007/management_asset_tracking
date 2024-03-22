export interface IProgressBarProps {
    total: number
    current: number
    returned?: number
    variant?: 'outline-green' | 'outline-blue'
    icon?: string
}
