/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import DatePicker from 'components/date-picker/date-picker.component'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import FormDatepicker from 'components/form-datepicker/form-datepicker.component'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import FormInput from 'components/form-input/form-input.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { FormikProps, FormikProvider } from 'formik'
import { useState } from 'react'
import { IAssetManagement } from 'repository/interface/asset-management-data.interface'
import { IFAssetManagement } from 'validations/asset-management.validation'
import { IFUser } from 'validations/user.validation'

const AddAssetModal = ({
    modalService,
    formik,
    userOptions,
}: {
    modalService: IUseModal
    formik: FormikProps<IFAssetManagement>
    userOptions?: IDropdownItem[]
}) => {
    const [selected, setSelected] = useState<Date>()

    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/2 !p-0">
            <FormikProvider value={formik}>
                <div className="flex flex-col gap-4 justify-content">
                    <div className="font-bold text-size-L px-4 pt-4">
                        CREATE USER
                    </div>
                    <div className="border-b border-gray-40"></div>
                    <div className="text-logistical-gray-ver4 px-4 gap-x-3 grid grid-rows-4 grid-flow-col gap-4">
                        {/* <DatePicker
                            isRange={false}
                            range={selected}
                            setRange={setSelected}
                        /> */}

                        <FormInput
                            label="Name"
                            placeholder="Enter name"
                            name={'name'}
                            required
                        />
                        <FormInput
                            label="Description"
                            placeholder="Enter descrioption"
                            name={'descrioption'}
                        />
                        <FormInput
                            label="Brand"
                            placeholder="Enter Brand"
                            name={'Brand'}
                            required
                        />
                        <FormInput
                            label="Serial Number"
                            placeholder="Enter serial number"
                            name={'serialNumber'}
                            required
                        />
                        <FormInput
                            label="Condition"
                            placeholder="Enter condition"
                            name={'condition'}
                            required
                        />
                        <FormInput
                            label="Purchase Date"
                            placeholder="Enter purchase date"
                            name={'purchaseDate'}
                            required
                        />
                        <FormInput
                            label="City"
                            placeholder="Enter city"
                            name={'city'}
                            required
                        />
                        {/* <FormDatepicker
                            label="City"
                            placeholder="Enter city"
                            name={'city'}
                            required
                        /> */}
                        <FormDropdown
                            label="User"
                            placeholder="Select user"
                            name={'roleId'}
                            required
                            options={userOptions}
                            dropDownIndicator
                            isSearchable
                            additionalOnClick={(value) => {
                                // setSelectedRole(value?.value as string)
                            }}
                        />
                    </div>
                    <div className="border-b border-gray-40"></div>
                    <div className="flex justify-content px-4 pb-4">
                        <div className="flex-grow">
                            <Button
                                label="BACK"
                                variant="logistical-white"
                                onClick={() => {
                                    modalService.closeModalHandling()
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                label="CREATE USER"
                                type="button"
                                variant="logistical-lightblue"
                                onClick={() => {
                                    formik.handleSubmit()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </FormikProvider>
        </Modal>
    )
}

export default AddAssetModal
