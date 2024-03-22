/* eslint-disable no-unused-vars */
export interface ITab {
    containerClassName?: string
    items: ITabItem[]
    selectedItem?: ITabItem
    onChange: (tabItem: ITabItem) => void
    tabFilter?: any
}
export interface ITabItem {
    key: string
    value: string
    label: string
    totalData?: number
    colorClassname?: string
    textColorClassname?: string
    lineColorClassname?: string

    // redesign
    content?: any
    childStatus?: ITabItem[]
}
