export interface ITabContent {
    items: ITabContentItem[]
    className?: string
    footerComponent?: any
}

export interface ITabContentItem {
    label: string
    accessor: JSX.Element
    className?: string
}
