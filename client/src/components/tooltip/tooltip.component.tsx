/* eslint-disable no-unused-vars */
import React, { ReactNode, useEffect, useState } from 'react'
import './tooltip.style.css'

const Tooltip = ({
    text,
    isShow,
    children,
}: {
    text: string
    isShow: boolean
    children: ReactNode
}) => {
    const [show, setShow] = useState(false)
    const clazz = show ? '' : 'hidden'

    useEffect(() => {
        setShow(isShow)
    }, [isShow])

    return (
        <>
            <div className="w-full relative">
                {children}

                <div className={`${clazz} absolute z-[2] mt-1 `}>
                    <div className="arrow-up"></div>
                    <div
                        className={` bg-logistical-gray-ver4 bg-opacity-90 text-white leading-none rounded p-3`}
                    >
                        {text}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tooltip
