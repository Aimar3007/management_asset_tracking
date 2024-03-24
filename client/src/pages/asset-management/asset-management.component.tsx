import Dropdown from 'components/dropdown/dropdown.component'
import { AMHeader, assetNameOptions } from './asset-management.static'
import useAssetManagement from './asset-management.service'
import { FormikProvider } from 'formik'
import Tooltip from 'components/tooltip/tooltip.component'
import FormInput from 'components/form-input/form-input.component'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { IAssetManagement } from 'repository/interface/asset-management-data.interface'
import Table from 'components/table/table.component'

const AssetManagement = () => {
    const {
        filter,
        formik,
        AMData,
        loading,
        AMMeta,
        filterOptions,
        setValueFilter,
        setPageData,
        navigate,
    } = useAssetManagement()

    return (
        <div className="container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                <div className="flex gap-x-40 p-3">
                    <div className="flex gap-x-3 w-full">
                        <Dropdown
                            options={assetNameOptions}
                            label="Name"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    name: value as IDropdownItem,
                                })
                            }}
                            value={filter?.name}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <Dropdown
                            options={filterOptions?.brands}
                            label="Brand"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    brand: value as IDropdownItem,
                                })
                            }}
                            value={filter?.brand}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <Dropdown
                            options={filterOptions?.users}
                            label="User"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    user: value as IDropdownItem,
                                })
                            }}
                            value={filter.user}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                    </div>

                    <FormikProvider value={formik}>
                        <form
                            className="w-[90%] flex justify-end"
                            onSubmit={(e) => {
                                e.preventDefault()
                                formik.handleSubmit()
                            }}
                        >
                            <Tooltip
                                text={
                                    'Search term must be at least 3 characters'
                                }
                                isShow={formik.errors.searchTerm ? true : false}
                            >
                                <FormInput
                                    autoComplete="auto-off"
                                    hideError={true}
                                    placeholder="Search description Asset"
                                    parentDivClassName="w-full min-w-[250px] !mb-0"
                                    icon="ri-search-line"
                                    name="searchTerm"
                                    onKeyDown={(
                                        event: React.KeyboardEvent<HTMLInputElement>,
                                    ) => {
                                        if (
                                            event.key === 'Backspace' &&
                                            formik.values.searchTerm.length ===
                                                1
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

                {/* border */}
                <div className="border-b border-solid border-logistical-gray-ver3"></div>

                {/* table */}
                <Table<IAssetManagement>
                    headers={AMHeader}
                    data={AMData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={AMMeta}
                    moduleTitle={'Asset Management'}
                    onRowClick={function (data): void {
                        const id = data.id
                        navigate('/asset-management-detail/' + id)
                    }}
                />
            </div>
        </div>
    )
}

export default AssetManagement
