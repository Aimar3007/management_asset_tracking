/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import {
    addressesDetailsConsigneeHeader,
    addressesDetailsShipperHeader,
    descriptionAndIntructionsHeader,
    pillSAddressesDetailsHeader,
    pillsShippingDetailsHeader,
    shippingDetailsHeader,
} from './shipments-details.static'
import Details from './content/details.component'
import { ITabItem } from 'components/tab/tab.interface'
import ListPurchaseOrders from './content/list-purchase-orders.component'
import { userDataSelector } from 'pages/login/login.slice'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'
import { useNavigate, useParams } from 'react-router-dom'
import {
    getShipmentDetails,
    updateStatusShipment,
    getRouteCode,
    updateInvoiceNo,
    updateRouteCode,
    uploadEdocs,
    downloadEdocs,
} from 'repository/shipment.repository'
import { Toast } from 'components/toast/toast.component'
import {
    routeCodeSelector,
    setRouteCode,
    setShipmentDetailsData,
    shipmentDetailsDataSelector,
} from '../shipments.slice'
import Transport from './content/transport.component'
import Containers from './content/containers.component'
import Milestones from './content/milestones.component'
import GoodsPacks from './content/goods-packs.component'
import EDocumentation from './content/e-documentation.component'
import RelatedInvoice from './content/related-invoice.component'
import { copyTextToClipboard, formatDate } from 'common/common.service'
import { useModal } from 'components/modal/modal.service'
import AddEDocumentModal from './components/add-e-document-modal.component'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import UpdateStatusShipmentModal from './components/update-status-modal.component'
import {
    IPillSAddressesDetailsHeader,
    IPillsShippingDetailsHeader,
    IPropertyUpdateStatus,
} from './shipments-detail.interface'
import { IButton } from 'components/button/button.interface'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import {
    IInvoiceNumberValidation,
    IRouteCodeValidation,
    invoiceNumberValidation,
    routeCodeValidation,
} from 'form-validation/shipment-detail.validation'
import { FormikProvider, useFormik } from 'formik'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import { IPurchaseOrder } from 'pages/purchase-order/purchase-order.interface'
import { IAddressDetails } from '../shipments.interface'

export const useShipmentDetails = () => {
    // initial ----------------------------------------------------
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Formik
    const invoiceValidation = invoiceNumberValidation()
    const rCodeValidation = routeCodeValidation()
    const formikInvoiceNumber = useFormik<IInvoiceNumberValidation>({
        validationSchema: invoiceValidation.invoiceNumberValidation,
        initialValues: invoiceValidation.invoiceNumberInitial,
        onSubmit: (values) => {
            submitSupplierInvoice(values)
        },
    })
    const formikRouteCode = useFormik<IRouteCodeValidation>({
        validationSchema: rCodeValidation.routeCodeSchema,
        initialValues: rCodeValidation.routeCodeInitial,
        onSubmit: () => {
            // nothing here
        },
    })

    // selector
    const user: IUserAuth = useSelector(userDataSelector)
    const shipmentDetailsData = useSelector(shipmentDetailsDataSelector)
    const routeCodeList = useSelector(routeCodeSelector)

    //  state & useRef
    const [loadingDetailData, setLoadingDetailData] = useState(true)
    const [loadingGetRouteCode, setLoadingRouteCode] = useState<boolean>(true)
    const [tabFilter, setTabFilter] = useState<ITabItem>({
        label: 'Details',
        key: 'status',
        value: 'details',
        textColorClassname: 'text-logistical-gray-ver4',
        lineColorClassname: 'bg-logistical-gray-ver4',
    })
    const [buttonAction1, setButtonAction1] = useState<IButton>()
    const [buttonAction2, setButtonAction2] = useState<IButton>()
    const [pillShippingDetails, setPillShippingDetails] = useState<
        ISTColumn<IPillsShippingDetailsHeader>
    >(pillsShippingDetailsHeader[0])
    const [pillAddressesDetails, setPillAddressesDetails] = useState<
        ISTColumn<IPillSAddressesDetailsHeader>
    >(pillSAddressesDetailsHeader[0])
    const [handlingLoadData, setHandlingLoadData] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [poList, setPoList] = useState<any>()
    const [eDocsType, setEDocsType] = useState<IDropdownItem>()
    const [propertyUpdateStatus, setPropertyUpdateStatus] =
        useState<IPropertyUpdateStatus | null>()
    const [routeCodeDropdown, setRouteCodeDropdown] = useState<IDropdownItem[]>(
        [],
    )
    const [selectedRouteCode, setSelectedRouteCode] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    // variable
    const organization = user.organizationCode

    // modal
    const addEDocModalService = useModal()
    const submitDeliveryModalService = useModal()
    const supplierInvoiceModalService = useModal()

    // get data detail
    const loadDetailData = async () => {
        if (!id || id === '') {
            return
        }

        try {
            setLoadingDetailData(true)
            const actionResult = await getShipmentDetails(id)
            dispatch(setShipmentDetailsData(actionResult))
            setLoadingDetailData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingDetailData(false)
            const errorMessage = e.message
            Toast({
                header: 'Failed Get Detail Shipments',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate('/shipments')
            }, 100)
        }
    }

    // update status shipment
    const updateStatusData = async (id: string, status: string) => {
        try {
            setLoadingDetailData(true)
            const actionResult = await updateStatusShipment(id, status)
            if (actionResult?.isSuccess) {
                Toast({
                    header: 'Success',
                    message: 'Successfully updated status',
                    type: 'success',
                })
            } else {
                Toast({
                    header: 'Fail',
                    message: 'Failed to update status',
                    type: 'error',
                })
            }
            setHandlingLoadData(!handlingLoadData)
            setLoadingDetailData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingDetailData(false)
        }
    }

    const getComponentDetail = () => {
        const { shipmentStatus } = shipmentDetailsData

        let button1: IButton | undefined
        let button2: IButton | undefined
        let updateStatus: IPropertyUpdateStatus | undefined

        if (organization === 'jpl') {
            switch (shipmentStatus) {
                case 'Booked':
                    if (tabFilter.value === 'details') {
                        button1 = {
                            label: 'ATTACH PO',
                            variant: 'logistical-lightblue',
                            onClick: () => {
                                navigate('/shipments-detail/attach-po/' + id)
                            },
                        }
                    } else {
                        button1 = {
                            label: 'UPDATE PO',
                            variant: 'logistical-lightblue-invert',
                            onClick: () => {
                                navigate('/shipments-detail/attach-po/' + id)
                            },
                        }
                    }
                    break
                case 'Shipped':
                    if (tabFilter.value === 'details') {
                        button1 = {
                            label: 'UPDATE PO',
                            variant: 'logistical-lightblue-invert',
                            onClick: () => {
                                navigate('/shipments-detail/attach-po/' + id)
                            },
                        }
                        button2 = {
                            label: 'SUBMIT DELIVERY',
                            variant: 'logistical-darkblue',
                            onClick: () => {
                                submitDeliveryModalService.openModalHandling()
                            },
                        }
                        updateStatus = {
                            onSubmit: () =>
                                updateStatusData(
                                    shipmentDetailsData.shipmentID,
                                    'delivered',
                                ),
                            message:
                                'Are you sure you want to submit the delivery of this shipment ID? \nOnce confirmed, the action cannot be undone.',
                            action: 'Submit Delivery',
                        }
                    } else {
                        button1 = {
                            label: 'UPDATE PO',
                            variant: 'logistical-lightblue-invert',
                            onClick: () => {
                                navigate('/shipments-detail/attach-po/' + id)
                            },
                        }
                    }
                    break
                case 'Confirmed':
                    button1 = undefined
                    break
                default:
                    button1 = {
                        label: 'UPDATE PO',
                        variant: 'logistical-lightblue-invert',
                        onClick: () => {
                            navigate('/shipments-detail/attach-po/' + id)
                        },
                    }
                    break
            }
        } else {
            switch (shipmentStatus) {
                case 'Delivered':
                    if (tabFilter?.value === 'details') {
                        button1 = {
                            label: 'ORDER RECEIVED',
                            variant: 'logistical-lightblue',
                            onClick: () => {
                                submitDeliveryModalService.openModalHandling()
                            },
                        }
                        updateStatus = {
                            onSubmit: () =>
                                updateStatusData(
                                    shipmentDetailsData.shipmentID,
                                    'inFactory',
                                ),
                            message:
                                'Are you sure you want to order received of this shipment ID? \nOnce confirmed, the action cannot be undone.',
                            action: 'Order Received',
                        }
                    }
                    break
                case 'InFactory':
                    if (tabFilter?.value === 'details') {
                        button1 = {
                            label: 'CONFIRM SHIPMENT',
                            variant: 'logistical-lightblue',
                            onClick: () => {
                                submitDeliveryModalService.openModalHandling()
                            },
                        }
                        updateStatus = {
                            onSubmit: () =>
                                updateStatusData(
                                    shipmentDetailsData.shipmentID,
                                    'confirmed',
                                ),
                            message:
                                'Are you sure you want to confirm shipment of this shipment ID? \nOnce confirmed, the action cannot be undone.',
                            action: 'Confirm Shipment',
                        }
                    }
                    break
            }
        }

        setButtonAction1(button1)
        setButtonAction2(button2)
        if (updateStatus) setPropertyUpdateStatus(updateStatus)
    }

    // handle  file on input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (validateFile(file)) {
                setSelectedFile(file)
            } else {
                // Reset input value to clear the selected file
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            }
        }
    }

    // handle browse/choose file for upload
    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    // handle drag upload file
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    // handle drop upload file
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0]
            if (validateFile(file)) {
                setSelectedFile(file)
            }
        }
    }

    // validate file when upload file
    const validateFile = (file: File): boolean => {
        // Validasi jenis file
        let messageError
        const allowedExtensions = [
            '.png',
            '.jpg',
            '.jpeg',
            '.pdf',
            '.xls',
            '.xlsx',
        ]
        const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase()

        if (!allowedExtensions.includes(`.${fileExtension}`)) {
            messageError = 'Only PNG, JPG, PDF, XLS and XLSX files are allowed.'
        }

        // Validasi ukuran file (dalam bytes)
        const maxSize = 3 * 1024 * 1024 // 3MB
        if (file.size > maxSize) {
            messageError = 'File size exceeds 3MB limit.'
        }

        if (messageError) {
            Toast({
                header: 'Error Selected File',
                message: messageError,
                type: 'error',
            })
            return false
        }

        return true
    }

    const submitUploadFile = async () => {
        if (!selectedFile || !eDocsType?.value) return
        let formData = new FormData()
        formData.append('model', selectedFile)
        formData.append('documentType', eDocsType?.value as string)
        const params = {
            shipmentNo: shipmentDetailsData?.shipmentID,
            documentType: eDocsType?.value as string,
        }
        try {
            await uploadEdocs(params, formData)
            setSelectedFile(null)
            setEDocsType({ value: '', label: '' })
            setHandlingLoadData(!handlingLoadData)
        } catch (e: any) {
            console.log(e)
        }
    }

    // get content shipmentDetals
    const getContentShipmentDetails = (tabFilter: ITabItem) => {
        const items: Record<string, JSX.Element> = {
            details: Details({
                setPillShippingDetails,
                setPillAddressesDetails,
                getContentPillShippingDetails:
                    getContentPillShippingDetails(pillShippingDetails),
                getContentPillAddressesDetails:
                    getContentPillAddressesDetails(pillAddressesDetails),
                modalComponent: updateStatusModalComponent,
            }),
            listPurchaseOrders: ListPurchaseOrders(
                poList,
                listPurchaseOrdersHeader,
            ),
            milestones: Milestones(shipmentDetailsData?.milestone),
            transport: Transport(shipmentDetailsData?.transports),
            goodsPacks: GoodsPacks(shipmentDetailsData?.goodOrPacks),
            containers: Containers(shipmentDetailsData?.containers),
            eDocumentation: EDocumentation({
                modalComponent: addEDocModalComponent,
                modalService: addEDocModalService,
                data: shipmentDetailsData.eDocumentationDetails,
                downloadEdcos: downloadEdocs,
            }),
            relatedInvoice: RelatedInvoice(
                shipmentDetailsData?.relatedInvoices,
            ),
        }
        return items[tabFilter?.value] || <></>
    }

    const validateData = (data: string | number) => {
        let changeData: string | number
        if (typeof data === 'number' && data === 0) changeData = 0
        changeData = data || '-'
        return changeData
    }

    const getContentPillShippingDetails = (
        pill: ISTColumn<IPillsShippingDetailsHeader>,
    ) => {
        const contents: IPillsShippingDetailsHeader = {
            information: (
                <div>
                    <div className="py-2 text-[#424A58] font-bold text-size-M">
                        Shipping Details
                    </div>
                    <div className="grid grid-cols-2 gap-y-3  pr-3">
                        {shippingDetailsHeader?.shippingDetails?.map(
                            (header, index) => {
                                let buildComponent = header.customBuild
                                    ? header.customBuild(
                                          shipmentDetailsData[header?.accessor],
                                          () => {},
                                          index,
                                          '',
                                          shipmentDetailsData,
                                      )
                                    : validateData(
                                          shipmentDetailsData[header?.accessor],
                                      )

                                if (header?.accessor === 'routeCode') {
                                    buildComponent = (
                                        <FormikProvider value={formikRouteCode}>
                                            <FormDropdown
                                                name="routeCode"
                                                isLoading={loadingGetRouteCode}
                                                options={routeCodeDropdown}
                                                dropDownIndicator={true}
                                                isSearchable={true}
                                                additionalOnClick={(val) => {
                                                    setSelectedRouteCode(
                                                        (val?.value ??
                                                            '') as string,
                                                    )
                                                }}
                                                onlyShowSelectedLabel={
                                                    organization === 'jpl'
                                                }
                                                parentDivClassName="w-1/2 pr-2 "
                                            />
                                        </FormikProvider>
                                    )
                                }

                                //supplierInvoiceModalService
                                if (header?.accessor === 'supplierInvoice') {
                                    const isValueExists =
                                        shipmentDetailsData[header?.accessor]
                                    const val =
                                        shipmentDetailsData[header?.accessor] ??
                                        'NO INVOICE'
                                    buildComponent = (
                                        <div
                                            className={`flex justify-between ${isValueExists ? '' : 'text-logistical-gray-ver3'}`}
                                        >
                                            {val}
                                            {organization !== 'jpl' ? (
                                                <></>
                                            ) : (
                                                <div
                                                    className="text-logistical-blue cursor-pointer -mt-[5px]"
                                                    onClick={() => {
                                                        supplierInvoiceModalService.openModalHandling()
                                                    }}
                                                >
                                                    <i className="ri-add-line"></i>
                                                    ADD
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        key={'shipping-details-' + index}
                                        className={`${header.accessor === 'shipmentStatus' || (header.accessor === 'routeCode' && 'col-span-2')}`}
                                    >
                                        <div className="text-size-M text-[#707785] font-bold">
                                            {header.label}
                                        </div>
                                        <div className={`text-[#424A58]`}>
                                            {buildComponent}
                                        </div>
                                    </div>
                                )
                            },
                        )}
                    </div>
                    <div className="py-2 text-[#424A58] font-bold">Mode</div>
                    <div className="grid grid-cols-2 gap-y-2">
                        {shippingDetailsHeader?.mode?.map((header) => (
                            <div
                                className={`${header.accessor === 'shipmentStatus' && 'col-span-2'}`}
                            >
                                <div className="text-size-M text-[#707785] font-bold">
                                    {header.label}
                                </div>
                                <div className={`text-[#424A58]`}>
                                    {header.customBuild
                                        ? header.customBuild(
                                              shipmentDetailsData[
                                                  header?.accessor
                                              ],
                                          )
                                        : validateData(
                                              shipmentDetailsData[
                                                  header?.accessor
                                              ],
                                          )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
            descriptionsAndIntructions: (
                <div className="grid grid-cols-2 gap-2">
                    {descriptionAndIntructionsHeader.map((header) => {
                        const classNameColSpan =
                            header?.accessor === 'shippingDate'
                                ? 'col-span-1'
                                : 'col-span-2'
                        return (
                            <div className={`${classNameColSpan}`}>
                                <div
                                    className={`text-size-M text-[#707785] font-bold`}
                                >
                                    {header?.label}
                                </div>
                                <div className={`text-[#424A58] col-span-2`}>
                                    {header.customBuild
                                        ? header.customBuild(
                                              shipmentDetailsData[
                                                  header?.accessor
                                              ],
                                          )
                                        : validateData(
                                              shipmentDetailsData[
                                                  header?.accessor
                                              ],
                                          )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ),
        }
        return <div>{contents[pill?.accessor]}</div>
    }

    const getContentPillAddressesDetails = (
        pill: ISTColumn<IPillSAddressesDetailsHeader>,
    ) => {
        const addressDetailData: {
            shipper: IAddressDetails
            consignee: IAddressDetails
            localClient: IAddressDetails
        } = {
            shipper:
                shipmentDetailsData.addressDetails.filter(
                    (x) => x?.addressType === 'ConsignorDocumentaryAddress',
                )[0] || [],
            consignee:
                shipmentDetailsData.addressDetails.filter(
                    (x) => x?.addressType === 'ConsigneeDocumentaryAddress',
                )[0] || [],
            localClient:
                shipmentDetailsData.addressDetails.filter(
                    (x) => x?.addressType === 'SendersLocalClient',
                )[0] || [],
        }

        const contents: IPillSAddressesDetailsHeader = {
            shipper: (
                <>
                    {addressesDetailsShipperHeader?.map((header) => (
                        <div>
                            <div className="text-size-M text-[#707785] font-bold">
                                {header?.label}
                            </div>
                            <div className="text-[#424A58]">
                                {addressDetailData?.shipper[header?.accessor] &&
                                header?.accessor === 'address' ? (
                                    <div
                                        id={header?.accessor}
                                        className="flex justify-between"
                                    >
                                        <div>
                                            {
                                                addressDetailData.shipper[
                                                    header?.accessor
                                                ]
                                            }
                                        </div>
                                        <div className="px-2">
                                            <i
                                                className="ri-file-copy-line cursor-pointer "
                                                onClick={() =>
                                                    copyTextToClipboard(
                                                        header?.accessor,
                                                    )
                                                }
                                            ></i>
                                        </div>
                                    </div>
                                ) : (
                                    addressDetailData.shipper[
                                        header?.accessor
                                    ] || '-'
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ),
            consignee: (
                <>
                    {addressesDetailsConsigneeHeader?.map((header) => (
                        <div>
                            <div className="text-size-M text-[#707785] font-bold">
                                {header?.label}
                            </div>
                            <div className="text-[#424A58]">
                                {addressDetailData.consignee[
                                    header?.accessor
                                ] && header.accessor === 'address' ? (
                                    <div
                                        id={header?.accessor}
                                        className="flex justify-between"
                                    >
                                        <div>
                                            {
                                                addressDetailData.consignee[
                                                    header?.accessor
                                                ]
                                            }
                                        </div>
                                        <div className="px-2">
                                            <i
                                                className="ri-file-copy-line cursor-pointer "
                                                onClick={() =>
                                                    copyTextToClipboard(
                                                        header?.accessor,
                                                    )
                                                }
                                            ></i>
                                        </div>
                                    </div>
                                ) : (
                                    addressDetailData.consignee[
                                        header?.accessor
                                    ] || '-'
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ),
            localClient: (
                <>
                    {addressesDetailsConsigneeHeader?.map((header) => (
                        <div>
                            <div className="text-size-M text-[#707785] font-bold">
                                {header?.label}
                            </div>
                            <div className="text-[#424A58]">
                                {addressDetailData.localClient[
                                    header?.accessor
                                ] && header.accessor === 'address' ? (
                                    <div
                                        id={header?.accessor}
                                        className="flex justify-between"
                                    >
                                        <div>
                                            {
                                                addressDetailData.localClient[
                                                    header?.accessor
                                                ]
                                            }
                                        </div>
                                        <div className="px-2">
                                            <i
                                                className="ri-file-copy-line cursor-pointer "
                                                onClick={() =>
                                                    copyTextToClipboard(
                                                        header?.accessor,
                                                    )
                                                }
                                            ></i>
                                        </div>
                                    </div>
                                ) : (
                                    addressDetailData.localClient[
                                        header?.accessor
                                    ] || '-'
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ),
        }

        return contents[pill?.accessor]
    }

    const setDataPoList = () => {
        const setData = shipmentDetailsData?.poAttached
            ?.map((x: any) => {
                const item = x[0]
                if (!item || !item.poLine || item.poLine.length === 0) {
                    return null // Mengembalikan null jika poLine tidak ada atau kosong
                }
                return {
                    id: item?.po?.id,
                    poNo: item?.po?.poNo,
                    vendor: item?.po?.vendor,
                    // consignee: item?.po?.consignee,
                    // shipper: item?.po?.shipper,
                    poDate: item?.po?.poDate,
                    fillStatus: item?.po?.fillStatus,
                    totalQty: item?.po?.totalQty,
                    poLine: item?.poLine?.map((line: any) => {
                        const shipment = line?.poShipments
                        let qtyInShip = 0
                        shipment.forEach((data: any) => {
                            qtyInShip += data.qty
                        })

                        return {
                            lineId: line?.lineId,
                            itemdesc: line?.itemdesc,
                            price: line?.price,
                            amount: line?.amount,
                            matcontents: line?.matcontents,
                            // hsCode: line?.hsCode,
                            colorcode: line?.colorcode,
                            totalPoShipments: qtyInShip,
                            qtyPo: line?.qtyPo - qtyInShip,
                        }
                    }),
                }
            })
            .filter(Boolean)

        setPoList(setData)
    }

    const listPurchaseOrdersHeader: ISTColumn<IPurchaseOrder>[] = [
        {
            accessor: 'poNo',
            label: 'Purchase No.',
        },
        {
            accessor: 'vendor',
            label: 'Vendor',
        },
        // {
        //     accessor: 'consignee',
        //     label: 'consignee',
        // },
        // {
        //     accessor: 'shipper',
        //     label: 'Shipper',
        // },
        {
            accessor: 'poDate',
            label: 'PO Date',
            customBuild: (data) => {
                const changeDataType = data as string
                return <div>{formatDate(changeDataType)}</div>
            },
        },
        {
            accessor: 'fillStatus',
            label: 'Allocation Status',
        },
        {
            accessor: 'totalQty',
            label: 'Total Qty',
        },
        {
            accessor: 'id',
            label: 'Action',
            customBuild: (data) => {
                return (
                    <div
                        onClick={() =>
                            navigate('/purchase-order-detail/' + data)
                        }
                        className="cursor-pointer !text-[#00B0F2]"
                        style={{ color: '#00B0F2' }}
                    >
                        PREVIEW PO
                    </div>
                )
            },
        },
    ]

    const submitSupplierInvoice = async (values: IInvoiceNumberValidation) => {
        await updateInvoiceNo(values)
        loadDetailData()
    }
    const submitRouteCode = async () => {
        const values: IRouteCodeValidation = {
            routeCode: selectedRouteCode,
            shipmentNo: id ?? '',
        }
        await updateRouteCode(values)
    }

    const getDataRouteCode = async () => {
        setLoadingRouteCode(true)
        const routeCode = await getRouteCode()
        setLoadingRouteCode(false)
        if (routeCode) {
            dispatch(setRouteCode(routeCode))
        }
    }

    const resetFormikValues = () => {
        const formikValue: IRouteCodeValidation = {
            routeCode: shipmentDetailsData?.routeCode ?? '',
            shipmentNo: id ?? '',
        }
        const formikInvoiceValue: IInvoiceNumberValidation = {
            invoiceNo: shipmentDetailsData?.supplierInvoice ?? '',
            shipmentNo: id ?? '',
        }
        formikRouteCode.setValues(formikValue)
        formikInvoiceNumber.setValues(formikInvoiceValue)
    }

    // all variabel for component
    const addEDocModalComponent = (
        <AddEDocumentModal
            modalService={addEDocModalService}
            handleFileChange={handleFileChange}
            onChooseFile={onChooseFile}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            selectedFile={selectedFile}
            inputRef={inputRef}
            eDocsType={eDocsType}
            setEDocsType={setEDocsType}
            onSubmit={submitUploadFile}
        />
    )

    const updateStatusModalComponent = (
        <UpdateStatusShipmentModal
            modalService={submitDeliveryModalService}
            shipmentId={shipmentDetailsData?.shipmentID}
            propertyUpdateStatus={propertyUpdateStatus}
        />
    )

    // Use Effect ----------------------------------------------
    useEffect(() => {
        if (!id) return
        loadDetailData()
    }, [id, handlingLoadData])

    useEffect(() => {
        getDataRouteCode()
    }, [id])

    useEffect(() => {
        if (!shipmentDetailsData?.shipmentID) return
        getComponentDetail()
        resetFormikValues()
        setDataPoList()
        setRouteCode(shipmentDetailsData?.routeCode)
        formikInvoiceNumber.setFieldValue('shipmentNo', id)
    }, [shipmentDetailsData, tabFilter])

    useEffect(() => {
        if (!routeCodeList) {
            return
        }

        const dropdown: IDropdownItem[] = routeCodeList.map((data) => {
            return {
                label: data.routeCode + ' - ' + data.routeDesc,
                value: data.routeCode,
            } as IDropdownItem
        })
        setRouteCodeDropdown(dropdown)
    }, [routeCodeList])

    useEffect(() => {
        if (selectedRouteCode === '') return
        submitRouteCode()
    }, [selectedRouteCode])

    return {
        getContentShipmentDetails,
        setTabFilter,
        navigate,
        formikInvoiceNumber,
        shipmentDetailsData,
        loadingDetailData,
        buttonAction1,
        buttonAction2,
        tabFilter,
        supplierInvoiceModalService,
    }
}
