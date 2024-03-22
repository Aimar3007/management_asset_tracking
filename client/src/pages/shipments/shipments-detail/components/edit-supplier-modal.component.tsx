import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import Button from 'components/button/button.component'
import { FormikProps, FormikProvider } from 'formik'
import FormInput from 'components/form-input/form-input.component'
import { useState } from 'react'
import { IInvoiceNumberValidation } from 'form-validation/shipment-detail.validation'

const EditSupplierInvoice = ({
    modalService,
    formik,
}: {
    modalService: IUseModal
    formik: FormikProps<IInvoiceNumberValidation>
}) => {
    const [isDataExists] = useState(
        formik.values.invoiceNo === '' ? false : true,
    )
    const formikValues = formik.values?.invoiceNo
    return (
        //for JPL
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-[400px] sm:!w-full"
        >
            <div className="flex flex-col gap-2 justify-content">
                <div className="flex justify-between font-bold text-size-L">
                    {isDataExists ? 'UPDATE' : 'ADD'} SUPPLIER INVOICE
                    <i
                        className="ri-close-line cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (formikValues) {
                                formik.handleSubmit()
                                modalService.closeModalHandling()
                            }
                        }}
                    >
                        <FormikProvider value={formik}>
                            <FormInput
                                name="invoiceNo"
                                label="Invoice Number"
                                maxLength={40}
                            />
                        </FormikProvider>
                    </form>
                </div>
                <div className="flex justify-content ">
                    <div className="w-full">
                        <Button
                            label="Add Invoice"
                            variant="logistical-lightblue"
                            onClick={async () => {
                                const validate = await formik.validateForm()
                                if (
                                    !validate.invoiceNo &&
                                    !validate.shipmentNo
                                ) {
                                    formik.submitForm()
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

export default EditSupplierInvoice
