import ILabelData from './label-data.interface'

const LabelData = ({
    label,
    data,
    textColor,
    headerClass,
    dataClass,
    subData,
    containerClass,
}: ILabelData) => {
    const txtColor = textColor ? 'text-' + textColor : ''
    return (
        <div className={`flex flex-col ${containerClass} ${txtColor}`}>
            <div className={`${headerClass} font-bold text-size-S`}>
                {label}
            </div>
            <div className={`text-size-M ${dataClass}`}>
                {data ?? '-'}
                {!subData ? '' : <div>{subData}</div>}
            </div>
        </div>
    )
}

export default LabelData
