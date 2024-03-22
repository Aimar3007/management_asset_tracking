import { useCreateBooking } from '../create-booking.service'
import { useEffect } from 'react'
import SimpleTable from 'components/simple-table/simple-table.component'
import '../create-booking.style.css'
import { goodsHeader, initialGoodsData } from '../create-booking.static'

const Goods = () => {
    const {
        contentRef,
        contentHeight,
        dynamicClass,
        handleResize,
        setGoodsDataRow,
        generateData,
    } = useCreateBooking(initialGoodsData)

    useEffect(() => {
        handleResize() // Set initial height on mount

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [contentRef])

    return (
        <div
            ref={contentRef}
            className={`goods overflow-hidden ${dynamicClass}`}
        >
            {contentHeight && (
                <SimpleTable
                    headers={goodsHeader}
                    data={generateData}
                    contentHeight={contentHeight}
                    dynamicClass={dynamicClass}
                    isCellInput={true}
                    action={setGoodsDataRow}
                />
            )}
        </div>
    )
}

export default Goods
