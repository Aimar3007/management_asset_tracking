import { ITabContentItem } from 'components/tab-content/tab-content.interface'
import AdditionalInformation from './content/additional-information.component'
import AttachedOrder from './content/attached-order.component'
import BookingDetail from './content/booking-detail.component'
import CompanyAddress from './content/company-address.component'
import GoodsValue from './content/goods-value.component'
import Goods from './content/goods.component'
import ReferenceNumber from './content/reference-number.component'
import Dropdown from 'components/dropdown/dropdown.component'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import Input from 'components/input/input.component'
import DatePicker from 'components/date-picker/date-picker.component'

export const headerCreateBooking: ITabContentItem[] = [
    {
        label: '1. Company Address',
        accessor: <CompanyAddress />,
    },
    {
        label: '2. Booking Detail',
        accessor: <BookingDetail />,
    },
    {
        label: '3. Additional Information',
        accessor: <AdditionalInformation />,
    },
    {
        label: '4. Attached Order',
        accessor: <AttachedOrder />,
    },
    {
        label: '5. Goods/Packs',
        accessor: <Goods />,
    },
    {
        label: '6. Goods Value',
        accessor: <GoodsValue />,
    },
    {
        label: '7. Reference Number',
        accessor: <ReferenceNumber />,
    },
]

export const companyOptions = [
    { label: 'Logistical', value: 'log' },
    { label: 'JPL', value: 'jpl' },
    { label: 'IFB', value: 'ifb' },
]

export const modeOptions = [
    { label: 'Mode 1', value: 'mode1' },
    { label: 'Mode 2', value: 'mode2' },
    { label: 'Mode 3', value: 'mode3' },
]

export const packUnitOptions = [
    { label: 'Box', value: 'box' },
    { label: 'Carton', value: 'carton' },
    { label: 'Packet', value: 'packet' },
    { label: 'Bag', value: 'bag' },
    { label: 'Crate', value: 'crate' },
]

export const weightUnitOptions = [
    { label: 'Kilograms', value: 'kilograms' },
    { label: 'Pounds', value: 'pounds' },
    { label: 'Grams', value: 'grams' },
    { label: 'Ounces', value: 'qunces' },
    { label: 'Tons', value: 'tons' },
]

export const volumeUnitOptions = [
    { label: 'Cubic Meters', value: 'cubicMeters' },
    { label: 'Liters', value: 'liters' },
    { label: 'Cubic Centimeters', value: 'cubicCentimeters' },
    { label: 'Milliliters', value: 'milliliters' },
    { label: 'Gallons', value: 'gallons' },
]

export const bookingTypes: string[] = ['pickup', 'delivery']

export const dropdownContentAdditionalInformation = [
    'SERVICE LEVEL',
    'CHARGES APPLY',
    'INCOTERM',
    'RELEASE TYPE',
    'ADDITIONAL TERMS',
    'ON BOARD',
]

export const pickupOptions = [
    { label: 'Truck', value: 'truck' },
    { label: 'Forklift', value: 'forklift' },
    { label: 'Pallet Jack', value: 'palletJack' },
]

export const inputContentGoodsValue = [
    { label: 'GOODS VALUE', placeholer: 'Enter goods value' },
    { label: 'INSURANCE VALUE', placeholer: 'Enter insurance value' },
    { label: 'SHIPPER COD AMOUNT', placeholer: 'Enter shipper COD amount' },
]

export const goodsValueCurrencyOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
]

export const insuranceValueCurrencyOptions = [
    { label: '2000', value: '2000' },
    { label: '2000', value: '1500' },
    { label: '2000', value: '1000' },
]

export const shipperCodAmountTypeOptions = [
    { label: '500', value: '500' },
    { label: '300', value: '300' },
    { label: '700', value: '700' },
]

export const dropdownContentGoodsValue = [
    {
        label: 'GOODS VALUE CURRENCY',
        placeholer: 'Select currency',
        option: goodsValueCurrencyOptions,
    },
    {
        label: 'INSURANCE VALUE CURRENCY',
        placeholer: 'Select currency',
        option: insuranceValueCurrencyOptions,
    },
    {
        label: 'SHIPPER COD AMOUNT TYPE',
        placeholer: 'Select type',
        option: shipperCodAmountTypeOptions,
    },
]

export const attachedOrderHeaders: ISTColumn<any>[] = [
    {
        accessor: 'orderNumber',
        label: 'Order Number',
        customBuild: (data, setHandle, id) => {
            return (
                <Dropdown
                    options={packUnitOptions}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Select pack type"
                    className="border-none"
                    onClick={(e) => {
                        if (id) setHandle(id, true, e)
                    }}
                    value={data}
                />
            )
        },
    },
    {
        accessor: 'date',
        label: 'Date',
    },
    {
        accessor: 'goodsDespcription',
        label: 'Goods Description',
    },
    {
        accessor: 'remove',
        label: '',
        customBuild: (data, sethandle, id) => {
            return (
                <i
                    className="ri-delete-bin-5-line text-[#FF004E] text-XS py-2 flex justify-center cursor-pointer"
                    onClick={() => {
                        sethandle(id, false)
                    }}
                ></i>
            )
        },
    },
]

export const initialAttachedOrder = [
    {
        orderNumber: undefined,
        date: '',
        goodsDescription: '',
    },
]

export const initialGoodsData = [
    {
        pieces: '',
        packType: '',
        length: '',
        width: '',
        height: '',
        ud: '',
        weight: '',
        uq: '',
        volume: '',
        uq2: '',
        description: '',
    },
]

export const goodsHeader: ISTColumn<any>[] = [
    {
        accessor: 'pieces',
        label: 'Pieces',
        customBuild: (data, setGoodsDataRow, id) => {
            return (
                <Input
                    placeholder="Enter pieces"
                    className="w-[100%]"
                    onChange={(e) => {
                        console.log('e.target.value', e.target.value)

                        if (id && e.target.value)
                            setGoodsDataRow(id, true, e.target.value)
                    }}
                    value={data}
                />
            )
        },
    },
    {
        accessor: 'packType',
        label: 'Pack Type',
        customBuild: () => {
            return (
                <Dropdown
                    options={packUnitOptions}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Select pack type"
                    className="border-none"
                />
            )
        },
    },
    {
        accessor: 'length',
        label: 'Length',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter lenght"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'width',
        label: 'Width',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter width"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'height',
        label: 'Height',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter height"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'ud',
        label: 'UD',
        customBuild: () => {
            return (
                <Dropdown
                    options={packUnitOptions}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Unit"
                    className="border-none"
                />
            )
        },
    },
    {
        accessor: 'weight',
        label: 'Weight',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter weight"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'uq',
        label: 'UQ',
        customBuild: () => {
            return (
                <Dropdown
                    options={packUnitOptions}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Unit"
                    className="border-none"
                />
            )
        },
    },
    {
        accessor: 'volume',
        label: 'Volume',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter volume"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'uq2',
        label: 'UQ',
        customBuild: () => {
            return (
                <Dropdown
                    options={packUnitOptions}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Unit"
                    className="border-none"
                />
            )
        },
    },
    {
        accessor: 'description',
        label: 'Description',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter description"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'remove',
        label: '',
        customBuild: (data, setHandle, id) => {
            return (
                <i
                    className="ri-delete-bin-5-line text-[#FF004E] text-XS py-2 flex justify-center cursor-pointer"
                    onClick={() => {
                        setHandle(id, false)
                    }}
                ></i>
            )
        },
    },
]

export const addressOption = [
    { label: 'Indonesia', value: 'indonesia' },
    { label: 'Australia', value: 'australia' },
    { label: 'Singapura', value: 'singapura' },
]

export const referenceNumberHeader: ISTColumn<any>[] = [
    {
        accessor: 'country',
        label: 'Country/Region',
        customBuild: (data, setHandle, id) => {
            return (
                <Dropdown
                    options={addressOption}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Select country/region"
                    className="border-none"
                    onClick={(e) => {
                        if (id) setHandle(id, true, e)
                    }}
                    value={data}
                />
            )
        },
    },
    {
        accessor: 'numberType',
        label: 'Number Type',
        customBuild: () => {
            return (
                <Dropdown
                    options={addressOption}
                    isSearchable={false}
                    readonly={true}
                    dropDownIndicator={true}
                    placeholder="Select number type"
                    className="border-none"
                />
            )
        },
    },
    {
        accessor: 'number',
        label: 'Number',
        customBuild: () => {
            return <Input placeholder="Enter number" className="w-[100%]" />
        },
    },
    {
        accessor: 'typeDescription',
        label: 'Type Description',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter type description"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'issueDate',
        label: 'Issue Date',
        customBuild: () => {
            return <DatePicker isRange={false} />
        },
    },
    {
        accessor: 'information',
        label: 'Information',
        customBuild: () => {
            return (
                <Input
                    placeholder="Enter information"
                    className="w-[100%]"
                    onChange={() => {}}
                />
            )
        },
    },
    {
        accessor: 'remove',
        label: '',
        customBuild: (data, setHandle, id) => {
            return (
                <i
                    className="ri-delete-bin-5-line text-[#FF004E] text-XS py-2 flex justify-center cursor-pointer"
                    onClick={() => {
                        setHandle(id, false)
                    }}
                ></i>
            )
        },
    },
]

export const referenceNumberData = [
    {
        country: undefined,
        numberType: '',
        number: '',
        typeDescription: '',
        issueDate: '',
        information: '',
    },
]
