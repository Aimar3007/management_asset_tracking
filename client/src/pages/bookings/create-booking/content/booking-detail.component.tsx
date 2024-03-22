import Dropdown from 'components/dropdown/dropdown.component'
import {
    modeOptions,
    packUnitOptions,
    volumeUnitOptions,
    weightUnitOptions,
} from '../create-booking.static'
import Input from 'components/input/input.component'
import Textarea from 'components/text-area/text-area.component'
import '../create-booking.style.css'

const BookingDetail = () => {
    return (
        <div className="booking-detail detail-content">
            <div className="flex gap-2">
                <div className="content-1 w-full">
                    <Dropdown
                        label={'MODE'}
                        options={modeOptions}
                        isSearchable={false}
                        readonly={true}
                        dropDownIndicator={true}
                        placeholder="Select mode"
                    />
                    <Input
                        label="SHIPPER'S REF NUMBER"
                        placeholder="Enter shipper's ref number"
                        className="w-[100%]"
                    />
                    <Input
                        label="ORDER REF NUMBER"
                        placeholder="Enter order ref number"
                        className="w-[100%]"
                    />
                    <Input
                        label="GOODS DESCRIPTION"
                        placeholder="Enter goods description"
                        className="w-[100%]"
                    />
                </div>
                <div className="content-2 flex w-full grid-cols-3 gap-2 content-start">
                    <div className="content-2-left w-full">
                        <Input
                            label="PACKS"
                            placeholder="Enter packs"
                            className="w-[100%]"
                        />
                        <Input
                            label="WEIGHT"
                            placeholder="Enter weight"
                            className="w-[100%]"
                        />
                        <Input
                            label="VOLUME"
                            placeholder="Enter volume"
                            className="w-[100%]"
                        />
                    </div>
                    <div className="content-2-right w-full">
                        <Dropdown
                            label={'PACK UNIT'}
                            options={packUnitOptions}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder="Select unit"
                        />
                        <Dropdown
                            label={'WEIGHT UNIT'}
                            options={weightUnitOptions}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder="Select unit"
                        />
                        <Dropdown
                            label={'VOLUME UNIT'}
                            options={volumeUnitOptions}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder="Select unit"
                        />
                    </div>
                </div>
            </div>
            <div className="content-3 mt-3">
                <Textarea
                    value={''}
                    onChange={() => {}}
                    label="DETAILED GOODS DESCRIPTION"
                    placeholder="Enter detailed goods description"
                    className="w-[100%] h-[172px]"
                />
            </div>
        </div>
    )
}

export default BookingDetail
