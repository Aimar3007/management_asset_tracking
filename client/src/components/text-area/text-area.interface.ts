export interface ITextarea {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    label?: string
    placeholder?: string
    className?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    [key: string]: any
}
