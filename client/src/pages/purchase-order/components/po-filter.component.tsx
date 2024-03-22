/* eslint-disable no-unused-vars */
import Dropdown from 'components/dropdown/dropdown.component'
import DatePicker from 'components/date-picker/date-picker.component'
import { DateRange } from 'react-day-picker'
import { poStatus } from '../purchase-order.static'
import {
    IPoFilterDropdown,
    IPoFilterDropdownOptions,
    ISetFilter,
} from '../purchase-order.interface'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'

const PoFilter = ({
    isGenerateReport = false,
    filterDropdownData,
    filterDropdown,
    removeRangeDate,
    handleChangeFilter,
    filterTemporary,
    setState,
}: {
    isGenerateReport?: boolean
    filterDropdownData: IPoFilterDropdownOptions
    filterDropdown: IPoFilterDropdown
    removeRangeDate: (
        setState: React.Dispatch<React.SetStateAction<IPoFilterDropdown>>,
    ) => void
    handleChangeFilter: ({
        vendors,
        fillStatuses,
        updatedByUsers,
        range,
        poStatus,
        setState,
    }: ISetFilter) => void
    filterTemporary: IPoFilterDropdown
    setState: React.Dispatch<React.SetStateAction<IPoFilterDropdown>>
}) => {
    const { vendors, updatedsBy, fillStatuses } = filterDropdownData
    return (
        <div>
            <div className="flex-col w-full mt-2 my-1 space-y-1">
                <label className={`text-size-S font-bold`}>{'PO Date'}</label>
                <DatePicker
                    range={filterTemporary?.range as DateRange}
                    setRange={(value) => {
                        handleChangeFilter({
                            range: value as DateRange | undefined,
                            setState,
                        })
                    }}
                    isRange={true}
                    disableDays="future"
                    onClear={() => {
                        removeRangeDate(setState)
                    }}
                />
            </div>
            {isGenerateReport && (
                <div className="flex-col w-full mt-3">
                    <Dropdown
                        options={poStatus}
                        label="PO Status"
                        onClick={(value) => {
                            handleChangeFilter({
                                poStatus: value,
                                setState,
                            })
                        }}
                        value={filterTemporary?.poStatus}
                        isClearable={true}
                        isMultiSelect={true}
                        isSearchable={true}
                        dropDownIndicator={true}
                    />
                </div>
            )}
            <div className="flex-col w-full mt-3">
                <Dropdown
                    options={vendors}
                    label="Vendor"
                    onClick={(value) => {
                        handleChangeFilter({
                            vendors: value,
                            setState,
                        })
                    }}
                    placeholder="All Vendor"
                    value={filterTemporary.vendors}
                    isClearable={true}
                    isMultiSelect={true}
                    isSearchable={true}
                    dropDownIndicator={true}
                />
            </div>
            <div className="w-full flex gap-3 justify-between mt-3">
                <div className="flex-col w-full">
                    <Dropdown
                        options={fillStatuses.filter(
                            (option: any) =>
                                !filterDropdown.fillStatuses.includes(option),
                        )}
                        label="Allocation Status"
                        placeholder="All Allocation Status "
                        isMultiSelect={true}
                        onClick={(value) => {
                            handleChangeFilter({
                                fillStatuses: value,
                                setState,
                            })
                        }}
                        value={filterTemporary.fillStatuses}
                        isClearable={true}
                        isSearchable={true}
                        dropDownIndicator={true}
                    />
                </div>
                <div className="flex-col w-full">
                    <Dropdown
                        options={updatedsBy}
                        label="Admin"
                        placeholder="All Admin"
                        isMultiSelect={true}
                        onClick={(value) => {
                            handleChangeFilter({
                                updatedByUsers: value,
                                setState,
                            })
                        }}
                        value={filterTemporary.updatedByUsers}
                        isClearable={true}
                        isSearchable={true}
                        dropDownIndicator={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default PoFilter
