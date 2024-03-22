import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Button from 'components/button/button.component'
import { FormikProps, FormikProvider } from 'formik'
import FormInput from 'components/form-input/form-input.component'
import { useState } from 'react'
import { IContactSupplierSchema } from 'form-validation/po-detail.validation'

const EditModalSupplierModal = ({
    modalService,
    formik,
}: {
    modalService: IUseModal
    formik: FormikProps<IContactSupplierSchema>
}) => {
    const [isDataExists] = useState(
        formik.values.contactSupplier === '' ? false : true,
    )
    const formikValues = formik.values?.contactSupplier
    return (
        //for JPL
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-[400px] sm:!w-full"
        >
            <div className="flex flex-col gap-2 justify-content">
                <div className="flex justify-between font-bold text-size-L">
                    {isDataExists ? 'UPDATE' : 'ADD'} CONTACT SUPPLIER
                    <i
                        className="ri-close-line cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4">
                    <FormikProvider value={formik}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (formikValues) {
                                    formik.handleSubmit()
                                    modalService.closeModalHandling()
                                }
                            }}
                        >
                            <FormInput
                                name="contactSupplier"
                                label="SUPPLIER CONTACT"
                                maxLength={40}
                            />
                        </form>
                    </FormikProvider>
                </div>
                <div className="flex justify-content ">
                    <div className="w-full">
                        <Button
                            label="Add Contact"
                            variant="logistical-lightblue"
                            onClick={async () => {
                                const validate = await formik.validateForm()
                                if (!validate.contactSupplier) {
                                    formik.handleSubmit()
                                    modalService.closeModalHandling()
                                }
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditModalSupplierModal
