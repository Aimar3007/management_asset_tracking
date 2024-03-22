const SquareColor = ({ colorClass }: { colorClass: string }) => {
    return (
        <div
            className={colorClass + ' aspect-square w-[10px] rounded-full'}
        ></div>
    )
}

export default SquareColor
