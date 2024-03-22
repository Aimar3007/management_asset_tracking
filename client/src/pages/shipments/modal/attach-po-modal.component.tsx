import Button from 'components/button/button.component'
import FormInput from 'components/form-input/form-input.component'
import Modal from 'components/modal/modal.component'
import Table from 'components/table/table.component'
import Tooltip from 'components/tooltip/tooltip.component'
import { FormikProvider, useFormik } from 'formik'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import { POHeader } from 'pages/purchase-order/purchase-order.static'
import { IUseAttachPO } from '../attach-po/attach-po.interface'

const AttachPoModal = ({
    attachPoService,
}: {
    attachPoService: IUseAttachPO
}) => {
    const modalService = attachPoService.attachPoModalService
    const { poData, poDataMeta, loading, setPageData, loadData } =
        attachPoService

    const formik = useFormik<{ searchTerm: string }>({
        initialValues: { searchTerm: '' },
        onSubmit: (values) => loadData(values.searchTerm),
        validate: (values) => {
            const errors: any = {}
            if (
                values.searchTerm.length < 3 &&
                values.searchTerm.length !== 0
            ) {
                errors.searchTerm = 'Search term must be at least 3 characters'
            }
            return errors
        },
    })

    // handleSearch(values)
    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="min-h-[calc(100vh-100px)] !p-0 flex flex-col"
        >
            <>
                <div className="border-b border-logistical-gray-ver7 p-4">
                    {/* header */}
                    <div className="flex justify-between">
                        <div className="text-size-L font-bold flex items-center">
                            Attach PO
                        </div>
                        <div
                            className="text-size-M font-bold flex items-center cursor-pointer"
                            onClick={() => {
                                modalService.closeModalHandling()
                            }}
                        >
                            <i className="ri-close-fill  ri-xl"></i>
                        </div>
                    </div>

                    {/* search */}
                    <div className="flex mobile:flex-col flex-wrap justify-between pt-4">
                        <div className="text-size-M font-bold mobile:pb-2">
                            Select PO(s)
                        </div>
                        <div className="text-size-M font-bold flex  items-center cursor-pointer">
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
                                            formik.errors.searchTerm
                                                ? true
                                                : false
                                        }
                                    >
                                        <FormInput
                                            autoComplete="auto-off"
                                            hideError={true}
                                            placeholder="Search PO No"
                                            parentDivClassName="w-full min-w-[240px] mobile:min-w-0 mobile:w-full !mb-0"
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
                                                    formik.values.searchTerm =
                                                        ''
                                                    formik.handleSubmit()
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="  h-[calc(100vh-290px)] flex-col w-full">
                        <Table<IPurchaseOrder>
                            headers={POHeader}
                            data={poData}
                            meta={poDataMeta}
                            loading={loading}
                            nextHandling={(page) => {
                                setPageData(page)
                            }}
                            previousHandling={(page) => {
                                setPageData(page)
                            }}
                            moduleTitle={'Purchase Order'}
                            checkboxVisible={true}
                            containerClassname={'overflow-auto'}
                            checkboxDataHandling={(checkedData) => {
                                attachPoService.setTemporarySelectedPO(
                                    checkedData,
                                )
                            }}
                            additionalButtonBottom={
                                <Button
                                    onClick={() => {
                                        attachPoService.proceedPurchaseOrder()
                                        modalService.closeModalHandling()
                                    }}
                                    variant="logistical-lightblue"
                                    label="PROCEED PURCHASE ORDER"
                                />
                            }
                            resetCheckedInitialValue={
                                attachPoService.temporarySelectedPO
                            }
                        />
                    </div>
                </div>
            </>
        </Modal>
    )
}

export default AttachPoModal
