export interface IButtonPopupItem {
    icon: string
    label: string
    onClick: () => void
}

export interface IButtonPopup {
    items: IButtonPopupItem[]
}
