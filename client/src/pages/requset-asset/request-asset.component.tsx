import Dropdown from 'components/dropdown/dropdown.component'
import useRequsetAsset from './requset-asset.service'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { FormikProvider } from 'formik'
import Tooltip from 'components/tooltip/tooltip.component'
import FormInput from 'components/form-input/form-input.component'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'
import Table from 'components/table/table.component'
import { TAHeaders } from './requset-asset.static'

const RequestAsset = () => {
    const {
        filter,
        formik,
        loading,
        filterOptions,
        RAData,
        RAMeta,
        allModal,
        actionComponent,
        setValueFilter,
        setPageData,
    } = useRequsetAsset()

    return (
        <div className="container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                <div className="flex gap-x-40 p-3">
                    <div className="flex flex-initial gap-x-3 w-[40%]">
                        <Dropdown
                            options={filterOptions?.user}
                            label="User"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    user: value as IDropdownItem,
                                })
                            }}
                            value={filter?.user}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <Dropdown
                            options={filterOptions?.typeTransactionAsset}
                            label="Type"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    typeTransactionAsset:
                                        value as IDropdownItem,
                                })
                            }}
                            value={filter?.typeTransactionAsset}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <Dropdown
                            options={filterOptions?.statusTransactionAsset}
                            label="Status"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    statusTransactionAsset:
                                        value as IDropdownItem,
                                })
                            }}
                            value={filter?.statusTransactionAsset}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                    </div>

                    <div className="flex flex-grow">
                        <FormikProvider value={formik}>
                            <form
                                className="w-full flex justify-end"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    formik.handleSubmit()
                                }}
                            >
                                <Tooltip
                                    text={
                                        'Search term must be at least 3 characters'
                                    }
                                    isShow={
                                        formik.errors.searchTerm ? true : false
                                    }
                                >
                                    <FormInput
                                        autoComplete="auto-off"
                                        hideError={true}
                                        placeholder="Search username"
                                        parentDivClassName="w-full min-w-[250px] !mb-0"
                                        icon="ri-search-line"
                                        name="searchTerm"
                                        onKeyDown={(
                                            event: React.KeyboardEvent<HTMLInputElement>,
                                        ) => {
                                            if (
                                                event.key === 'Backspace' &&
                                                formik.values.searchTerm
                                                    .length === 1
                                            ) {
                                                formik.values.searchTerm = ''
                                                formik.handleSubmit()
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </form>
                        </FormikProvider>
                    </div>
                </div>

                {/* border */}
                <div className="border-b border-solid border-logistical-gray-ver3"></div>

                {/* table */}
                <Table<ITransactionAsset>
                    headers={TAHeaders}
                    data={RAData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={RAMeta}
                    moduleTitle={'Request Asset'}
                    onRowClick={function (): void {
                    }}
                    actionComponent={actionComponent}
                />
            </div>
            {allModal}
        </div>
    )
}

export default RequestAsset
