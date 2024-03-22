import Dropdown from 'components/dropdown/dropdown.component'
import Input from 'components/input/input.component'
import Textarea from 'components/text-area/text-area.component'
import { useCreateBooking } from '../create-booking.service'
import { useEffect } from 'react'
import SimpleTable from 'components/simple-table/simple-table.component'
import '../create-booking.style.css'
import {
    addressOption,
    referenceNumberData,
    referenceNumberHeader,
} from '../create-booking.static'

const ReferenceNumber = () => {
    const {
        contentRef,
        contentHeight,
        dynamicClass,
        handleHalfScreenSize,
        setReferenceNumberDataRow,
        generateData,
    } = useCreateBooking(referenceNumberData)

    useEffect(() => {
        handleHalfScreenSize() // Set initial height on mount

        window.addEventListener('resize', handleHalfScreenSize)

        return () => {
            window.removeEventListener('resize', handleHalfScreenSize)
        }
    }, [contentRef, generateData])
    return (
        <div className="reference-number detail-content">
            <div ref={contentRef} className={`x ${dynamicClass}`}>
                {contentHeight && (
                    <SimpleTable
                        headers={referenceNumberHeader}
                        data={generateData}
                        contentHeight={contentHeight}
                        dynamicClass={dynamicClass}
                        isCellInput={true}
                        action={setReferenceNumberDataRow}
                    />
                )}
            </div>

            <div className="content-2 w-[50%]">
                <div className="flex gap-2">
                    <Input
                        label="REQUEST BILLING PARTY"
                        placeholder="Enter goods value"
                        className="w-[100%]"
                    />
                    <Dropdown
                        label={'ADDRESS'}
                        options={addressOption}
                        isSearchable={false}
                        readonly={true}
                        dropDownIndicator={true}
                        placeholder="Select currency"
                    />
                </div>
                <Input
                    label="CUSTOMS NUMBER"
                    placeholder="Enter custom numbers"
                    className="w-[100%]"
                />
            </div>
            <div className="content-3">
                <Textarea
                    value={''}
                    onChange={() => {}}
                    label="MARKS AND NUMBERS"
                    placeholder="Enter marks and numbers"
                    className="w-[100%] h-[172px]"
                />
                <Textarea
                    value={''}
                    onChange={() => {}}
                    label="SPECIAL INSTRUCTIONS"
                    placeholder="Enter special instructions"
                    className="w-[100%] h-[172px]"
                />
            </div>
        </div>
    )
}

export default ReferenceNumber
