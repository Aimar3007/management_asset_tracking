import { useEffect, useState } from 'react'
import {
    IButtonStatusConfig,
    IHistories,
    IPODetail,
    IPoLineItem,
    IPoShipment,
} from './purchase-order-detail.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { userDataSelector } from 'pages/login/login.slice'
import { useSelector } from 'react-redux'
import { IUserAuth } from 'repository/data/user-auth.interface'
import {
    getHistory,
    getPoDetailData,
    getPoLineItems,
    setStatus,
    updateGoodsFrom,
    updateSupplierContact,
} from 'repository/purchase-order.repository'
import {
    poDetailSelector,
    poHistoryErrorSelector,
    poHistorySelector,
    poLinesDataSelector,
    poLinesFilterSelector,
    poLinesMetaSelector,
    setPoDetailData,
    setPoHistoryData,
    setPoLinesData,
    setPoLinesPageNumber,
} from '../purchase-order.slice'
import { useAppDispatch } from 'store'
import LabelData from 'components/label-data/label-data.component'
import {
    PODetailHeader,
    buttonStatusConfigInitial,
    editPoLineItemsHeaders,
    poLineItemsHeaders,
    toastOption,
} from './purchase-order-detail.static'
import { useModal } from 'components/modal/modal.service'
import { ToastProps } from 'components/toast/toast.interface'
import { Toast } from 'components/toast/toast.component'
import { getCountryDropdown } from 'repository/country.repository'
import FormDropdown from 'components/form-dropdown/form-dropdown.component'
import { useFormik } from 'formik'
import {
    IContactSupplierSchema,
    IGoodsFromSchema,
    poDetailValidation,
} from 'form-validation/po-detail.validation'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'

export const usePODetail = () => {
    // initial ----------------------------------------------------
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const formikDetail = poDetailValidation()
    const formik = useFormik<IGoodsFromSchema>({
        validationSchema: formikDetail.goodsFromSchema,
        initialValues: formikDetail.goodsFromInitial,
        validate: (data) => {
            console.log(data)
        },
        onSubmit: (values) => {
            submitFromGoods(values)
        },
    })

    const formikContactSupplier = useFormik<IContactSupplierSchema>({
        validationSchema: formikDetail.contactSupplierSchema,
        initialValues: formikDetail.contactSupplierInitial,
        onSubmit: (values) => {
            submitEditContact(values)
        },
    })

    // State, Selector, & connected variable ----------------------
    const user: IUserAuth = useSelector(userDataSelector)
    const poDetailData: IPODetail = useSelector(poDetailSelector)
    const poHistoryData: IHistories[] = useSelector(poHistorySelector)
    const poHistoryError: string | null = useSelector(poHistoryErrorSelector)
    const filter = useSelector(poLinesFilterSelector)
    const poLinesData = useSelector(poLinesDataSelector)
    const poLinesMeta = useSelector(poLinesMetaSelector)

    const [loadingDetailData, setLoadingDetailData] = useState(true)
    const [loadingLineData, setLoadingLineData] = useState(true)
    const [loadingHistoryData, setLoadingHistoryData] = useState(true)
    const [loadingUpdatePoLine, setLoadingUpdatePoLine] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [buttonStatus, setButtonStatus] = useState<IButtonStatusConfig>(
        buttonStatusConfigInitial,
    )
    const [isEditLineItems, setIsEditLineItems] = useState(false)
    const [toast, setToast] = useState<ToastProps>(toastOption)
    const [headerLineItems, setHeaderLineItems] = useState(poLineItemsHeaders)
    const [countryList] = useState(getCountryDropdown())
    const [totalShipmentInProgress, setTotalShipmentInProgress] = useState(0)
    const organization = user.organizationCode
    const editContactSupplierModalService = useModal()
    const poHistoryModalService = useModal()
    const poStatusModalService = useModal()
    const poCancelInputModalService = useModal()
    const poCancelodalService = useModal()

    // Related Function ------------------------------------------
    const loadDetailData = async () => {
        if (!id || id === '') {
            return
        }

        try {
            setLoadingDetailData(true)
            const actionResult = await getPoDetailData({ uuid: id })
            dispatch(setPoDetailData(actionResult))
            setLoadingDetailData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingDetailData(false)
            const errorMessage = e.message
            Toast({
                header: 'Failed Get Detail PO',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate('/purchase-order')
            }, 100)
        }
    }
    const loadHistoryData = async () => {
        if (!id || id === '') {
            return
        }

        try {
            setLoadingHistoryData(true)
            const actionResult = await getHistory({ uuid: id })
            dispatch(setPoHistoryData(actionResult))
            setLoadingHistoryData(false)
        } catch (e) {
            setLoadingHistoryData(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // getPoLineItems
    const loadPoLinesData = async () => {
        if (!id || id === '') {
            return
        }

        try {
            setLoadingLineData(true)
            const actionResult = await getPoLineItems(filter, id)
            dispatch(setPoLinesData(actionResult))
            setLoadingLineData(false)
        } catch (e) {
            setLoadingHistoryData(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            setErrorMessage(errorMessage)
        }
    }

    // set page
    const setPageData = (pageNumber: number) => {
        dispatch(setPoLinesPageNumber(pageNumber))
    }

    const getComponentDetail = () => {
        if (!poDetailData) return <></>

        const tmpSelectedPO: any = {
            ...poDetailData,
            totalLineItem: poLinesData.length || 0,
        }
        return PODetailHeader.map((props) => {
            const accessor = props.accessor
            let customHandling: any
            let data = tmpSelectedPO[accessor]
            if (props.accessor === 'contactInfo') {
                customHandling = () =>
                    editContactSupplierModalService.openModalHandling()
            }
            if (props.accessor === 'shipmentInProgress') {
                if (tmpSelectedPO.status === 'Open') data = 'WAITING'
                data = totalShipmentInProgress
            }
            const value = props.customBuild
                ? props.customBuild(
                      data,
                      organization,
                      customHandling,
                      tmpSelectedPO,
                  )
                : data || '-'

            return (
                <div key={props.accessor}>
                    <LabelData data={value} label={props.label} />
                </div>
            )
        })
    }

    const changeStatus = async (reason?: string) => {
        await setStatus({
            id: poDetailData.id,
            status: buttonStatus.nextStatus ?? '',
            reason: reason,
        })
        loadDetailData()
    }

    const getButtonDetail = () => {
        const { status, poNo } = poDetailData
        let buttonOpt: IButtonStatusConfig | null = null
        let toastOption: ToastProps | null = null

        if (organization === 'jpl') {
            // jpl
            if (status === 'Open') {
                buttonOpt = {
                    label: 'UPDATE STATUS',
                    variant: 'logistical-lightblue-invert',
                    isButtonVisible: true,
                    nextStatus: 'In Progress',
                    onClick: () => {
                        poStatusModalService.openModalHandling()
                    },
                }
                toastOption = {
                    header: 'PO UPDATED TO IN PROGRESS',
                    message: `Purchase No. ${poNo} is now In Progress. Please make the shipment details.`,
                    type: 'success',
                }
            } else if (status === 'In Progress') {
                buttonOpt = {
                    label: 'UPDATE STATUS',
                    variant: 'logistical-lightblue-invert',
                    isButtonVisible: true,
                    nextStatus: 'Open',
                    onClick: () => {
                        poStatusModalService.openModalHandling()
                    },
                }
                toastOption = {
                    header: 'PO BACK TO OPEN',
                    message: `Please make the shipment details. Purchase No. ${poNo} is now back to Open.`,
                    type: 'success',
                }
            } else if (status === 'Canceled') {
                buttonOpt = {
                    label: 'VIEW REASON',
                    variant: 'danger',
                    isButtonVisible: true,
                    onClick: () => {
                        poCancelodalService.openModalHandling()
                    },
                }
            } else {
                buttonOpt = buttonStatusConfigInitial
            }
        } else {
            // pan
            if (status === 'Open') {
                buttonOpt = {
                    label: 'CANCEL PO',
                    variant: 'danger',
                    isButtonVisible: true,
                    nextStatus: 'Canceled',
                    onClick: () => {
                        poCancelInputModalService.openModalHandling()
                    },
                }
                toastOption = {
                    header: 'PO CANCELED',
                    message: `Purchase Order no. ${poNo} is canceled and successfully sent back to SAP`,
                    type: 'error',
                }
            } else if (status === 'In Progress') {
                buttonOpt = {
                    label: 'CLOSE PO',
                    variant: 'logistical-lightblue-invert',
                    isButtonVisible: true,
                    onClick: () => {
                        poStatusModalService.openModalHandling()
                    },
                    nextStatus: 'Closed',
                }
                toastOption = {
                    header: `Purchase Order No. ${poNo} Completed!`,
                    message: `Purchase Order successfully confirmed and marked as closed.`,
                    type: 'success',
                }
            } else if (status === 'Canceled') {
                buttonOpt = {
                    label: 'RE-OPEN PO',
                    variant: 'logistical-lightblue-invert',
                    isButtonVisible: true,
                    onClick: () => {
                        poStatusModalService.openModalHandling()
                    },
                    nextStatus: 'Open',
                }
                toastOption = {
                    header: 'PO REOPENED',
                    message: `Purchase No. ${poNo} is now Open`,
                    type: 'success',
                }
            } else {
                buttonOpt = buttonStatusConfigInitial
            }
        }

        if (buttonOpt) {
            setButtonStatus(buttonOpt)
        }
        if (toastOption) {
            setToast(toastOption)
        }
    }

    const getHeader = () => {
        if (user.organizationCode === 'jpl') {
            return
        }

        const phase1 = !isEditLineItems
            ? poLineItemsHeaders
            : attachDropdownHeader()
        const phase2 =
            poDetailData?.status === 'Canceled'
                ? phase1.filter((item) => item.accessor !== 'shipment')
                : phase1
        setHeaderLineItems(phase2)
    }

    const attachDropdownHeader = () => {
        let header = [...editPoLineItemsHeaders]
        header.push({
            accessor: 'form',
            label: 'Goods From',
            // eslint-disable-next-line no-unused-vars
            customBuild: (data, handle, index) => {
                const id = 'key-po-dropdown-' + index
                return (
                    <div className="flex items-center h-[50px]">
                        <FormDropdown
                            key={id}
                            parentDivClassName="w-[200px] !mb-0 "
                            options={countryList}
                            name={`data[${index}].poGoodValue`}
                            dropDownIndicator={true}
                            isSearchable={true}
                            placeholder="Goods From"
                            showErrorMessage={false}
                        />
                    </div>
                )
            },
        })
        return header
    }

    const submitEditContact = async (values: IContactSupplierSchema) => {
        if (!id) return
        await updateSupplierContact(id, values)
        loadDetailData()
    }

    const chageFromGoodsAll = (value: IDropdownItem) => {
        const val = value.value as string
        let allValue: IGoodsFromSchema = formik.values
        let formikValue: IGoodsFromSchema = { data: [] }
        allValue.data.forEach((dt) => {
            const poLines: {
                poLineId: string
                poGoodValue: string
            } = {
                ...dt,
                poGoodValue: val,
            }
            formikValue.data.push(poLines)
        })
        formik.setValues(formikValue)
    }

    const submitFromGoods = async (values: IGoodsFromSchema) => {
        setLoadingUpdatePoLine(true)
        await updateGoodsFrom(values)
        setLoadingUpdatePoLine(false)
        setIsEditLineItems(false)
        loadPoLinesData()
    }

    const resetGoodsFrom = () => {
        let totalShipmentInProgressTmp: number = 0
        let formikValue: IGoodsFromSchema = { data: [] }
        poLinesData.forEach((dt: IPoLineItem) => {
            const id = dt.id
            const value = dt.goodFrom ?? ''
            const poLines = {
                poLineId: id,
                poGoodValue: value,
            }
            formikValue.data.push(poLines)

            // total shipment

            const poShipments: IPoShipment[] = dt.poShipments ?? []
            let tmpTotal: number = 0
            poShipments.forEach(() => {
                tmpTotal++
            })

            totalShipmentInProgressTmp += tmpTotal
        })
        formik.setValues(formikValue)
        setTotalShipmentInProgress(totalShipmentInProgressTmp)
    }

    // Use Effect ----------------------------------------------
    useEffect(() => {
        if (!id) return
        setButtonStatus(buttonStatusConfigInitial)
        loadDetailData()
        loadHistoryData()
    }, [id])

    useEffect(() => {
        if (!poDetailData.id) return
        getButtonDetail()
        formikContactSupplier.setFieldValue(
            'contactSupplier',
            poDetailData.contactInfo,
        )
    }, [poDetailData])

    useEffect(() => {
        loadPoLinesData()
    }, [filter])

    useEffect(() => {
        getHeader()
    }, [isEditLineItems])

    useEffect(() => {
        if (isEditLineItems === false) {
            resetGoodsFrom()
        }
    }, [isEditLineItems])

    useEffect(() => {
        if (poLinesData.length < 1) {
            return
        }

        // set formik value
        resetGoodsFrom()
    }, [poLinesData])

    return {
        poDetailData,
        poHistoryData,
        loadingDetailData,
        loadingHistoryData,
        errorMessage,
        poHistoryError,
        organization,
        poHistoryModalService,
        poStatusModalService,
        poCancelodalService,
        poCancelInputModalService,
        buttonStatus,
        poLinesData,
        poLinesMeta,
        toast,
        isEditLineItems,
        headerLineItems,
        countryList,
        formik,
        user,
        formikContactSupplier,
        editContactSupplierModalService,
        totalShipmentInProgress,
        loadingUpdatePoLine,
        loadingLineData,
        setLoadingUpdatePoLine,
        setIsEditLineItems,
        getComponentDetail,
        changeStatus,
        setPageData,
        getHeader,
        chageFromGoodsAll,
    }
}
