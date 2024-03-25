/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import FormInput from 'components/form-input/form-input.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { FormikProps, FormikProvider } from 'formik'
import { IFUser } from 'validations/user.validation'
import { roleOptions } from '../manage-user.static'

const AddUserModal = ({
    modalService,
    formik,
    selectedRole,
    setSelectedRole,
}: {
    modalService: IUseModal
    formik: FormikProps<IFUser>
    selectedRole: string | null
    setSelectedRole: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-1/2 !p-0 h-1/2"
        >
            <FormikProvider value={formik}>
                <div className="flex flex-col gap-4 justify-content">
                    <div className="font-bold text-size-L px-4 pt-4">
                        CREATE USER
                    </div>
                    <div className="border-b border-gray-40"></div>
                    <div className="text-logistical-gray-ver4 px-4 flex gap-x-3">
                        <div className="intial-flex w-[50%] ">
                            <div className='mb-2'>User Profil</div>
                            <FormInput
                                label="Username"
                                placeholder="Enter username"
                                name={'userName'}
                                required
                            />
                            <FormInput
                                label="Position"
                                placeholder="Enter position"
                                name={'position'}
                            />
                            <FormInput
                                label="City"
                                placeholder="Enter city"
                                name={'city'}
                                required
                            />
                        </div>
                        <div className="flex-grow">
                            <div className='mb-2'>User Account</div>
                            <FormInput
                                label="Email"
                                placeholder="Enter email"
                                name={'email'}
                                required
                            />
                            <FormInput
                                label="Password"
                                placeholder="Enter password"
                                name={'password'}
                                required
                            />
                            <FormDropdown
                                label="Role Access"
                                placeholder="Select role"
                                name={'roleId'}
                                required
                                options={roleOptions}
                                dropDownIndicator
                                additionalOnClick={(value) => {
                                    setSelectedRole(value?.value as string)
                                }}
                            />
                        </div>
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

export default AddUserModal
