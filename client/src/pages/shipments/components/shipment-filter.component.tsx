/* eslint-disable no-unused-vars */
import Dropdown from 'components/dropdown/dropdown.component'
import DatePicker from 'components/date-picker/date-picker.component'
import { DateRange } from 'react-day-picker'
import {
    IShipmentFilterDropdown,
    IShipmentFilterDropdownOptions,
} from '../shipments.interface'
import {
    shipmentSortByOption,
    transportScheduleOption,
} from '../shipments.static'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'

const ShipmentFilter = ({
    isGenerateReport = false,
    filterTemporary,
    setState,
    filterDropdownOptions,
    loadOptions,
}: {
    isGenerateReport?: boolean
    filterTemporary: IShipmentFilterDropdown
    setState: React.Dispatch<React.SetStateAction<IShipmentFilterDropdown>>
    filterDropdownOptions: IShipmentFilterDropdownOptions
    loadOptions: ({
        transport,
        origin,
        destination,
        consignee,
        shipper,
    }: {
        transport?: string
        origin?: string
        destination?: string
        consignee?: string
        shipper?: string
    }) => void
}) => {
    return (
        <div className="flex flex-col gap-4 filter-shipment">
            {isGenerateReport && (
                <>
                    <Dropdown
                        options={shipmentSortByOption}
                        label="SORT REPORT BY"
                        onClick={(value) => {
                            setState({
                                ...filterTemporary,
                                sortBy: value as IDropdownItem,
                            })
                        }}
                        value={filterTemporary.sortBy}
                        dropDownIndicator={true}
                    />
                    <div className="border-b"></div>
                </>
            )}
            <div>
                <div className="w-1/2">
                    <Dropdown
                        options={transportScheduleOption}
                        onClick={(value) => {
                            setState({
                                ...filterTemporary,
                                transportScheduleOption: value as IDropdownItem,
                            })
                        }}
                        dropDownIndicator={true}
                        useBorder={false}
                        value={filterTemporary.transportScheduleOption}
                    />
                </div>
                <DatePicker
                    range={
                        filterTemporary?.transportSchedule[
                            filterTemporary?.transportScheduleOption?.value
                        ] as DateRange
                    }
                    setRange={(value) => {
                        setState({
                            ...filterTemporary,
                            transportSchedule: {
                                ...filterTemporary.transportSchedule,
                                [filterTemporary?.transportScheduleOption
                                    .value]: value as DateRange,
                            },
                        })
                    }}
                    isRange={true}
                    disableDays="future"
                    onClear={() => {
                        setState({
                            ...filterTemporary,
                            transportSchedule: {
                                ...filterTemporary.transportSchedule,
                                [filterTemporary?.transportScheduleOption
                                    ?.value]: {
                                    to: '',
                                    from: '',
                                },
                            },
                        })
                    }}
                    className="mt-5"
                />
            </div>
            <Dropdown
                isClearable={true}
                isMultiSelect={true}
                isSearchable={true}
                dropDownIndicator={true}
                loadOptions={(e: string) => loadOptions({ transport: e })}
                defaultOptions={filterDropdownOptions.transport}
                placeholder="ALL TRANSPORT"
                isAsync={true}
                value={filterTemporary.transport}
                onChange={(value: any) => {
                    setState({
                        ...filterTemporary,
                        transport: value,
                    })
                }}
                label="Transport"
            />
            <Dropdown
                isClearable={true}
                isMultiSelect={true}
                isSearchable={true}
                dropDownIndicator={true}
                loadOptions={(e: string) => loadOptions({ origin: e })}
                defaultOptions={filterDropdownOptions.origin}
                placeholder="ALL ORIGIN"
                isAsync={true}
                value={filterTemporary.origin}
                onChange={(value: any) => {
                    setState({
                        ...filterTemporary,
                        origin: value,
                    })
                }}
                label="Origin"
            />

            <Dropdown
                isClearable={true}
                isMultiSelect={true}
                isSearchable={true}
                dropDownIndicator={true}
                loadOptions={(e: string) => loadOptions({ destination: e })}
                defaultOptions={filterDropdownOptions.destination}
                placeholder="ALL DESTINATION"
                isAsync={true}
                value={filterTemporary.destination}
                onChange={(value: any) => {
                    setState({
                        ...filterTemporary,
                        destination: value,
                    })
                }}
                label="Destination"
            />
            <Dropdown
                isClearable={true}
                isMultiSelect={true}
                isSearchable={true}
                dropDownIndicator={true}
                loadOptions={(e: string) => loadOptions({ consignee: e })}
                defaultOptions={filterDropdownOptions.consignee}
                placeholder="ALL CONSIGNEE"
                isAsync={true}
                value={filterTemporary.consignee}
                onChange={(value: any) => {
                    setState({
                        ...filterTemporary,
                        consignee: value,
                    })
                }}
                label="Consignee"
            />
            <Dropdown
                isClearable={true}
                isMultiSelect={true}
                isSearchable={true}
                dropDownIndicator={true}
                loadOptions={(e: string) => loadOptions({ shipper: e })}
                defaultOptions={filterDropdownOptions.shipper}
                placeholder="ALL SHIPPER"
                isAsync={true}
                value={filterTemporary.shipper}
                onChange={(value: any) => {
                    setState({
                        ...filterTemporary,
                        shipper: value,
                    })
                }}
                label="Shipper"
            />
        </div>
    )
}

export default ShipmentFilter
