import { FormikProvider } from 'formik'
import useManageUser from './manage-user.service'
import Dropdown from 'components/dropdown/dropdown.component'
import { UMHeaders, userStatus } from './manage-user.static'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import Tooltip from 'components/tooltip/tooltip.component'
import FormInput from 'components/form-input/form-input.component'
import Table from 'components/table/table.component'
import { IUser } from 'repository/interface/user.interface'
import Button from 'components/button/button.component'

const ManageUser = () => {
    const {
        filter,
        formik,
        MUData,
        loading,
        MUMeta,
        filterOptions,
        allModal,
        AMUMService,
        setValueFilter,
        setPageData,
        navigate,
    } = useManageUser()
    return (
        <div className="container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                <div className="flex gap-x-40 p-3">
                    <div className="flex flex-initial gap-x-3 w-[40%]">
                        <Dropdown
                            options={filterOptions?.city}
                            label="City"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    city: value as IDropdownItem,
                                })
                            }}
                            value={filter?.city}
                            dropDownIndicator={true}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <Dropdown
                            options={userStatus}
                            label="Status"
                            onClick={(value) => {
                                setValueFilter({
                                    ...filter,
                                    status: value as IDropdownItem,
                                })
                            }}
                            value={filter?.status}
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
                        <Button
                            onClick={() => {
                                AMUMService.openModalHandling()
                            }}
                            icon="ri-add-line"
                            className={`pb-1 ml-2 w-btnIconWidth !border-transparent`}
                            variant="logistical-white"
                        />
                    </div>
                </div>

                {/* border */}
                <div className="border-b border-solid border-logistical-gray-ver3"></div>

                {/* table */}
                <Table<IUser>
                    headers={UMHeaders}
                    data={MUData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={MUMeta}
                    moduleTitle={'Manage User'}
                    onRowClick={function (data): void {
                        const id = data.id
                        navigate('/manage-user-detail/' + id)
                    }}
                />
            </div>
            {allModal}
        </div>
    )
}

export default ManageUser
