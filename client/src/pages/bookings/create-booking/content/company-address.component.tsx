import Dropdown from 'components/dropdown/dropdown.component'
import { bookingTypes, companyOptions } from '../create-booking.static'
import Textarea from 'components/text-area/text-area.component'
import Input from 'components/input/input.component'
import Button from 'components/button/button.component'
import '../create-booking.style.css'

const CompanyAddress = () => {
    return (
        <div className="flex company-address detail-content gap-2">
            {bookingTypes.map((item) => (
                <div className={`w-[100%]`}>
                    <h2>
                        {item.replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
                        Address
                    </h2>
                    <Dropdown
                        label={'COMPANY'}
                        options={companyOptions}
                        isSearchable={false}
                        readonly={true}
                        dropDownIndicator={true}
                        placeholder="Select Company"
                    />
                    <Textarea
                        value={''}
                        onChange={() => {}}
                        label="Address"
                        placeholder="Enter company address here"
                        className="w-[100%]"
                    />
                    <div className="flex grid-cols-3 gap-2 content-start">
                        <Input
                            label="POSTAL CODE"
                            placeholder="Enter postal code"
                            className="w-[100%]"
                        />
                        <Input
                            label="CITY"
                            placeholder="Enter city"
                            className="w-[100%]"
                        />
                    </div>
                    <div className="flex grid-cols-3 gap-2 content-start ">
                        <Dropdown
                            label={'STATE'}
                            options={companyOptions}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder="Select state"
                        />
                        <Dropdown
                            label={'COUNTRY'}
                            options={companyOptions}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder="Select country"
                        />
                    </div>
                    <Dropdown
                        label={'CONTACT'}
                        options={companyOptions}
                        isSearchable={false}
                        readonly={true}
                        dropDownIndicator={true}
                        placeholder="Contact"
                    />
                    <div className="flex grid-cols-3 gap-2 content-start">
                        <Input
                            label="PHONE NUMBER"
                            placeholder="Enter phone number"
                            className="w-full"
                        />
                        <Input
                            label="FAX"
                            placeholder="Enter fax number"
                            className="w-full"
                        />
                    </div>
                    <Input
                        label="EMAIL ADDRESS"
                        placeholder="Enter email address"
                        className="w-full"
                    />
                    <Input
                        label="ORIGIN"
                        placeholder="Enter origin"
                        className="w-full"
                    />
                    <Button
                        label={`SAVE ${item.toUpperCase()} ADDRESS`}
                        icon="ri-save-3-line"
                        variant="logistical-white"
                        type="button"
                        className=""
                        onClick={() => {}}
                    />
                </div>
            ))}
        </div>
    )
}

export default CompanyAddress
