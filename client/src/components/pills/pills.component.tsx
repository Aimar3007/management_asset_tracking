import { useState } from 'react'

const Pills = ({ items, onChange }: any) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return (
        <div className="pills overflow-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="p-3 flex gap-x-2 w-max">
                {items?.map((x: any, idx: number) => {
                    const isActive =
                        activeIndex === idx
                            ? 'bg-logistical-blue-ver6 text-logistical-blue-ver5'
                            : 'bg-logistical-gray-light'
                    return (
                        <div
                            className={`${isActive} p-2 cursor-pointer rounded-full z-[0]`}
                            onClick={() => {
                                setActiveIndex(idx)
                                onChange(x)
                            }}
                        >
                            {x?.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Pills
