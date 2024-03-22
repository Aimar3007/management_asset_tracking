import SimpleTable from 'components/simple-table/simple-table.component'
import { useEffect } from 'react'
import { useCreateBooking } from '../create-booking.service'
import '../create-booking.style.css'
import {
    attachedOrderHeaders,
    initialAttachedOrder,
} from '../create-booking.static'

const AttachedOrder = () => {
    const {
        contentRef,
        contentHeight,
        dynamicClass,
        handleResize,
        generateData,
        setAttachedOrderDataRow,
    } = useCreateBooking(initialAttachedOrder)

    useEffect(() => {
        handleResize() // Set initial height on mount

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [contentRef])

    return (
        <div ref={contentRef} className={`attached-order ${dynamicClass}`}>
            {contentHeight && (
                <SimpleTable
                    headers={attachedOrderHeaders}
                    data={generateData}
                    contentHeight={contentHeight}
                    dynamicClass={dynamicClass}
                    isCellInput={true}
                    action={setAttachedOrderDataRow}
                />
            )}
        </div>
    )
}

export default AttachedOrder
