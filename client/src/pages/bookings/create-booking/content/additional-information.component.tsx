import DatePicker from 'components/date-picker/date-picker.component'
import Dropdown from 'components/dropdown/dropdown.component'
import '../create-booking.style.css'
import {
    bookingTypes,
    dropdownContentAdditionalInformation,
    pickupOptions,
} from '../create-booking.static'
import TimePicker from 'components/time-picker/time-picker.component'

const AdditionalInformation = () => {
    return (
        <div className="additional-information detail-content pt-3">
            <div className="content-1 grid grid-cols-2 gap-2">
                <DatePicker isRange={false} label="WAREHOUSE RECORD" />
                <div></div>
            </div>
            <div className="content-2">
                {bookingTypes.map((item) => {
                    const itemConvert = item.toUpperCase()
                    return (
                        <div className="w-full flex gap-2 mt-4">
                            <div className="content-2-1 w-full">
                                <div className="flex gap-2">
                                    <DatePicker
                                        isRange={false}
                                        label={`ESTIMATED ${itemConvert} DATE`}
                                    />
                                    <TimePicker
                                        label={`ESTIMATED ${itemConvert} TIME`}
                                    />
                                </div>
                                <Dropdown
                                    label={`${itemConvert} EQUIPMENT`}
                                    options={pickupOptions}
                                    isSearchable={false}
                                    readonly={true}
                                    dropDownIndicator={true}
                                    placeholder="Select cartage drop mode"
                                    className="mt-4"
                                />
                            </div>
                            <div className="content-2-2 w-full flex gap-2">
                                <DatePicker
                                    isRange={false}
                                    label={`ESTIMATED ${itemConvert} DATE`}
                                />
                                <DatePicker
                                    isRange={false}
                                    label={`ESTIMATED ${itemConvert} TIME`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="content-3 grid gap-2 gap-y-4 grid-cols-2 mt-4">
                {dropdownContentAdditionalInformation.map((item) => (
                    <Dropdown
                        label={`${item} EQUIPMENT`}
                        options={pickupOptions}
                        isSearchable={false}
                        readonly={true}
                        dropDownIndicator={true}
                        placeholder={`Select ${item.toLowerCase()}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default AdditionalInformation
