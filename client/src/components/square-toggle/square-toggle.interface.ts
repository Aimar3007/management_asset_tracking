export interface ISquareToggle {
    setHandleToggle: React.Dispatch<React.SetStateAction<boolean>>
    handleToggle: boolean
    disable?: boolean
    className?: string
    onBGClassName?: string
    offBGClassName?: string
    onSliderClassName?: string
    ofSliderClassName?: string
    onRightTextClassName?: string
    offRightTextClassName?: string
    onLeftTextClassName?: string
    offLeftTextClassName?: string
}
