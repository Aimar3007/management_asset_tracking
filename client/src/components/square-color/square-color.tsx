const CircleColor = ({ colorClass }: { colorClass: string }) => {
    return (
        <div className="flex items-center pt-[2px]">
            <div
                className={
                    colorClass +
                    ' aspect-square w-[10px] !h-[10px] rounded-full'
                }
            ></div>
        </div>
    )
}

export default CircleColor
