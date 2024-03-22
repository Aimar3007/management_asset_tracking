import { ReactElement } from 'react'

export default interface ILabelData {
    label: string
    data?: string | null | ReactElement
    subData?: string
    textColor?: string
    headerClass?: string
    dataClass?: string
    containerClass?: string
}
