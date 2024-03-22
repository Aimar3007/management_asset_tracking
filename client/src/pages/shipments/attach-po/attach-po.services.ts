import { useModal } from 'components/modal/modal.service'
import {
    IPurchaseOrder,
    IPurchaseOrderFilterBody,
} from 'pages/purchase-order/purchase-order.interface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    filterLineParamsSelector,
    filterParamsSelector,
    poDataSelector,
    poLineDataSelector,
    poLineMeta,
    poMeta,
    selectedPoDataSelector,
    selectedPoIdDeleteHelperSelector,
    selectedPoIdModalHelperSelector,
    selectedPoLineDataSelector,
    selectedPoLineIdDeleteHelperSelector,
    setHelperDeletePo,
    setHelperDeletePoLine,
    setHelperSelectedPo,
    setPageNumber,
    setPageNumberLineData,
    setPoData,
    setPoLinesData,
    setSearchPoLines,
    setSelectedPo,
    setSelectedPoLine,
    setTemporarySelectedPo,
    setTemporarySelectedPoLine,
    temporarySelectedPoDataSelector,
    temporarySelectedPoLineDataSelector,
} from './attach-po.slice'
import { useDispatch } from 'react-redux'
import { getPoData, getPoLineItems } from 'repository/purchase-order.repository'
import { Toast } from 'components/toast/toast.component'
import { IUseAttachPO } from './attach-po.interface'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { store } from 'store'
import { useFormik } from 'formik'
import {
    IAttachPoValidation,
    attachPoInitialValue,
} from 'form-validation/attach-po.validation'
import {
    attachPoLineRepository,
    attachPoRepository,
} from 'repository/attach-po.repository'
import {
    getShipmentDetails,
    updateStatusShipment,
} from 'repository/shipment.repository'
import {
    setShipmentDetailsData,
    shipmentDetailsDataSelector,
} from '../shipments.slice'
import { IShipment2 } from '../shipments.interface'

const useAttachPo = (): IUseAttachPO => {
    // Initial
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik<IAttachPoValidation>({
        initialValues: attachPoInitialValue,
        onSubmit: (values) => {
            submitLine(values)
        },
    })

    // selector PO
    const shipmentDetailsData = useSelector(
        shipmentDetailsDataSelector,
    ) as IShipment2
    const poData = useSelector(poDataSelector)
    const poDataMeta = useSelector(poMeta)
    const filter = useSelector(filterParamsSelector)
    const selectedPO = useSelector(selectedPoDataSelector)
    const temporarySelectedPO = useSelector(temporarySelectedPoDataSelector)
    const helperModalSelectedPoId = useSelector(selectedPoIdModalHelperSelector)
    const helperDeletePo = useSelector(selectedPoIdDeleteHelperSelector)
    const helperDeletePoLine = useSelector(selectedPoLineIdDeleteHelperSelector)

    // selector PO Lines
    const poLinesData = useSelector(poLineDataSelector)
    const poLinesMeta = useSelector(poLineMeta)
    const poLinesfilter = useSelector(filterLineParamsSelector)
    const poLinesSelected = useSelector(selectedPoLineDataSelector)
    const poLinesSelectedTemporary = useSelector(
        temporarySelectedPoLineDataSelector,
    )

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDetailData, setLoadingDetailData] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [poLinesLoading, setPoLinesLoading] = useState<boolean>(false)
    const [poLinesResetCheckedData, setPoLinesResetCheckedData] =
        useState<boolean>(false)

    // modal Service
    const attachPoModalService = useModal()
    const attachPoLinesModalService = useModal()
    const deletePoModalService = useModal()
    const deletePoLineModalService = useModal()

    // use Effect     ------------------------------------------------
    const { isModalOpen } = attachPoModalService
    useEffect(() => {
        // set temporary
        if (isModalOpen === true) {
            loadData()
        } else {
            setTemporarySelectedPO([])
        }
    }, [isModalOpen])

    useEffect(() => {
        // load data on load page
        loadData()
        loadDetailData()
        dispatch(setTemporarySelectedPo([]))
        dispatch(setSelectedPo())
    }, [])

    useEffect(() => {
        if (helperModalSelectedPoId === '') {
            return
        }
        attachPoLinesModalService.openModalHandling()
        loadPoLinesData()
    }, [helperModalSelectedPoId])

    useEffect(() => {
        if (!helperDeletePo) {
            return
        }
        deletePoModalService.openModalHandling()
    }, [helperDeletePo])

    useEffect(() => {
        if (!helperDeletePoLine) {
            return
        }
        deletePoLineModalService.openModalHandling()
    }, [helperDeletePoLine])

    useEffect(() => {
        if (attachPoLinesModalService.isModalOpen === false) {
            setHelperSelectedPoModal('')
            return
        }
    }, [attachPoLinesModalService.isModalOpen])

    useEffect(() => {
        // update selected PO to Backend
        if (!id) return
        const poIds = selectedPO.map((data) => data.id)
        attachPoRepository(id, poIds)
    }, [selectedPO])

    // other function ------------------------------------------------

    // Get PO
    const loadData = async (search?: string) => {
        const filterBody: IPurchaseOrderFilterBody = {
            poNo: search,
            statuses: ['In Progress'],
        }
        try {
            setLoading(true)
            const actionResult = await getPoData(filter, filterBody)
            dispatch(setPoData(actionResult))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            Toast({
                header: 'Error',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    // get PO Lines
    const loadPoLinesData = async () => {
        try {
            setPoLinesLoading(true)
            const actionResult = await getPoLineItems(
                poLinesfilter,
                helperModalSelectedPoId,
            )
            dispatch(setPoLinesData(actionResult))
            setPoLinesLoading(false)
        } catch (e) {
            setPoLinesLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            Toast({
                header: 'Error',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    // set page
    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }
    const setPagePoLineData = (pageNumber: number) => {
        dispatch(setPageNumberLineData(pageNumber))
    }

    // when select po
    const setTemporarySelectedPO = (temporaryData: IPurchaseOrder[]) => {
        dispatch(setTemporarySelectedPo(temporaryData))
    }
    const proceedPurchaseOrder = () => {
        dispatch(setSelectedPo())
    }

    // when select po lines
    const setTemporarySelectedPoLines = (temporaryData: IPoLineItem[]) => {
        dispatch(setTemporarySelectedPoLine(temporaryData))
    }

    const proceedPurchaseOrderLines = () => {
        dispatch(setSelectedPoLine({ setFormik: setFormikValues }))
    }

    // helper reset checkbox po lines
    const resetPoLinesCheckedData = (val: boolean) => {
        setPoLinesResetCheckedData(val)
        if (val) {
            setTimeout(() => {
                setPoLinesResetCheckedData(false)
            }, 500)
        }
    }

    const searchPoLines = (value: string) => {
        dispatch(setSearchPoLines(value))
    }

    const removeFormikAllLines = (poIndex: number) => {
        const currentLineValues = formik.values.data ?? undefined
        if (!currentLineValues) return

        const newLineValues = currentLineValues.filter((data, index) => {
            if (poIndex === index) {
                return false
            }
            return true
        })

        formik.setFieldValue('data', newLineValues)
    }

    const setFormikValues = (
        poIndex: number,
        poId: string,
        newLines: IPoLineItem[],
    ) => {
        const key = `data[${poIndex}].poLines`
        const currentLineValues =
            formik.values.data[poIndex]?.poLines ?? undefined

        if (!currentLineValues) {
            const newLineValues = newLines.map((data) => {
                return {
                    poLineId: data.id,
                    qty: data.qtyAvailable,
                }
            })
            formik.setFieldValue(key, newLineValues)
            return
        }

        const newLineValues = newLines.map((data) => {
            const formikLineIndex = currentLineValues.findIndex(
                (dt) => dt?.poLineId === data?.lineId && dt.poLineId,
            )

            if (formikLineIndex < 0) {
                return {
                    poLineId: data.id,
                    qty: data.qtyPo ?? '0',
                }
            } else {
                return currentLineValues[formikLineIndex]
            }
        })
        formik.setFieldValue(key, newLineValues)
    }

    const submitLine = async (submitValue: IAttachPoValidation) => {
        if (!id) return

        setSubmitLoading(true)
        let newData: { poLineId: string; qty: string }[] = []
        try {
            //reshaping payload
            submitValue.data.forEach((dataPo) => {
                dataPo.poLines.forEach((d) => {
                    newData.push(d)
                })
            })
        } catch (e) {
            setSubmitLoading(false)
            console.error(e)
        }

        try {
            await attachPoLineRepository(id, newData)
            if (shipmentDetailsData?.shipmentStatus === 'Booked')
                await updateStatusShipment(id, 'shipped')
            Toast({
                header: 'Success',
                message: 'Success Attach PO',
                type: 'success',
            })
            setSubmitLoading(false)
            navigate(-1)
        } catch (e) {
            setSubmitLoading(false)
        }
    }

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

    return {
        id,
        attachPoModalService,
        attachPoLinesModalService,
        temporarySelectedPO,
        selectedPO,
        poData,
        poDataMeta,
        loading,
        poLinesData,
        poLinesMeta,
        poLinesSelected,
        poLinesSelectedTemporary,
        poLinesLoading,
        poLinesResetCheckedData,
        deletePoModalService,
        deletePoLineModalService,
        formik,
        submitLoading,
        loadingDetailData,
        shipmentDetailsData,
        setTemporarySelectedPO,
        proceedPurchaseOrder,
        loadData,
        setPageData,
        setPagePoLineData,
        proceedPurchaseOrderLines,
        setTemporarySelectedPoLines,
        resetPoLinesCheckedData,
        searchPoLines,
        setFormikValues,
        removeFormikAllLines,
    }
}

export const setHelperSelectedPoModal = (id: string) => {
    store.dispatch(setHelperSelectedPo(id))
}
export const removePo = (po: IPurchaseOrder) => {
    store.dispatch(setHelperDeletePo(po))
}
export const removePoLine = (poLine: IPoLineItem) => {
    store.dispatch(setHelperDeletePoLine(poLine))
}

export default useAttachPo
