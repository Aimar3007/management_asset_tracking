/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './tab.style.css'
import { ITab } from './tab.interface'

const Tab = ({
    items,
    selectedItem,
    onChange,
    tabFilter,
    containerClassName = '',
}: ITab) => {
    const getSelectedIndex = items.findIndex(
        (x) => x.value === selectedItem?.value,
    )
    const [activeIndex, setActiveIndex] = useState(
        getSelectedIndex < 0 ? 0 : getSelectedIndex,
    )

    return (
        <div className={`${containerClassName} header-status`}>
            {items.map((dt, idx) => {
                const isActive = tabFilter
                    ? dt.value === tabFilter.value
                    : activeIndex === idx
                const colorClassName = !dt.colorClassname
                    ? 'bg-logistical-gray-ver3'
                    : dt.colorClassname

                const headerActiveColor = `h-[4px] ${
                    dt.lineColorClassname
                        ? dt.lineColorClassname
                        : colorClassName
                }`
                const headerTextActiveColor = `font-bold ${dt.textColorClassname}`
                return (
                    <div
                        className={`item ${
                            isActive ? headerTextActiveColor : ''
                        } ${dt.totalData !== undefined ? 'pt-2' : ''}`}
                        key={idx}
                        onClick={() => {
                            setActiveIndex(idx)
                            onChange(dt)
                        }}
                    >
                        {dt.label}
                        {dt.totalData !== undefined && (
                            <span
                                className={`${colorClassName} ${dt.textColorClassname}`}
                            >
                                {dt.totalData}
                            </span>
                        )}
                        <br />
                        <div
                            className={
                                'transition duration-300 mt-2 ' +
                                (isActive ? headerActiveColor : '')
                            }
                        ></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tab
