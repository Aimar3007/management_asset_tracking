/* eslint-disable no-unused-vars */
import { IMeta, IResponseData } from 'common/common.interface'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import {
    formatCurrencyUsd,
    formatDate,
    formatDateTime,
    numberWithCommas,
} from 'common/common.service'
import {
    IPurchaseOrder,
    IPurchaseOrderFilterParams,
} from 'pages/purchase-order/purchase-order.interface'
import { IPoLineItem } from 'pages/purchase-order/purchase-order-detail/purchase-order-detail.interface'
import { Toast } from 'components/toast/toast.component'

interface IAttachPoSlice {
    // po data
    data: IPurchaseOrder[]
    meta: IMeta
    filterParams: IPurchaseOrderFilterParams

    // po line data
    poLinesDataTemp: IPoLineItem[]
    poLinesData: IPoLineItem[]
    poLinesMeta: IMeta
    poLinesfilter: IPurchaseOrderFilterParams

    // additional for modal
    selectedData: IPurchaseOrder[]
    temporarySelectedData: IPurchaseOrder[]
    selectedDataLine: IPoLineItem[]
    temporarySelectedDataLine: IPoLineItem[]
    helperModalSelectedPoId: string // for get data po line in modal
    helperDeleteSelectedPo?: IPurchaseOrder // for delete PO
    helperDeleteSelectedPoLine?: IPoLineItem // for delete PO line
}

const initialState: IAttachPoSlice = {
    data: [],
    selectedData: [],
    temporarySelectedData: [],
    meta: {
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total_page: 0,
        total_Items: 0,
        from: 0,
        to: 0,
        index_end: 0,
        index_start: 0,
    },
    filterParams: { pageNumber: 1, pageSize: 50 },
    poLinesData: [],
    poLinesMeta: {
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total_page: 0,
        total_Items: 0,
        from: 0,
        to: 0,
        index_end: 0,
        index_start: 0,
    },
    poLinesfilter: { pageNumber: 1, pageSize: 100 },
    selectedDataLine: [],
    temporarySelectedDataLine: [],
    helperModalSelectedPoId: '',
    poLinesDataTemp: [],
}

const attachPOSlice = createSlice({
    name: 'attachPo',
    initialState,
    reducers: {
        setPoData(
            state,
            action: PayloadAction<IResponseData<IPurchaseOrder[]>>,
        ) {
            const { data, isSuccess, message, meta, links } = action.payload
            const tempSelectedPo = state.selectedData
            const currentSelectedPoId = tempSelectedPo.map((data) => data.id)

            // set data
            const updatedData = data.map((item) => ({
                ...item,
                totalAmount: formatCurrencyUsd(item?.totalAmount),
                totalQty: numberWithCommas(item?.totalQty),
                updatedAt: formatDateTime(item.updatedAt),
                poDate: formatDate(item.poDate),
                selected: currentSelectedPoId.includes(item.id),
            }))

            const d = {
                data: updatedData,
                isSuccess,
                message,
                meta,
                links,
            }

            return {
                ...state,
                ...d,
                temporarySelectedData: tempSelectedPo,
            }
        },
        setPageNumber(state, action: PayloadAction<number>) {
            const pageNumber = action.payload
            const filter = { ...state.filterParams, pageNumber }
            return {
                ...state,
                filter,
            }
        },
        setTemporarySelectedPo(state, action: PayloadAction<IPurchaseOrder[]>) {
            return {
                ...state,
                temporarySelectedData: action.payload,
            }
        },
        setSelectedPo(state) {
            // dont replace current selected po
            // add the new po on the last array
            const selectedPo = state.selectedData
            const temporarySelectedPo = state.temporarySelectedData
            const currentSelectedPoId = selectedPo.map((data) => data.id)
            const temporarySelectedPoId = temporarySelectedPo.map(
                (data) => data.id,
            )
            // 1. remove current po, if not selected on temporary
            const phase1 = selectedPo.filter((data) => {
                const id = data.id
                if (!temporarySelectedPoId.includes(id)) {
                    return false
                }
                return true
            })

            // 2. remove temporary selected po, if already exists in current po
            const phase2 = temporarySelectedPo.filter((data) => {
                const id = data.id
                console.log(id, currentSelectedPoId.includes(id))
                if (!currentSelectedPoId.includes(id)) {
                    return true
                }
                return false
            })
            console.log(phase2.length)

            // 3. merge
            const phase3 = [...phase1, ...phase2]
            console.log(phase3)
            return {
                ...state,
                selectedData: phase3,
            }
        },
        removeSelectedPo(
            state,
            action: PayloadAction<{
                removeAllLinesFormik: (index: number) => void
            }>,
        ) {
            const id = state.helperDeleteSelectedPo?.id ?? ''
            let arr = [...state.selectedData]
            let deletedItem = arr.findIndex((item) => item.id === id)
            arr.splice(deletedItem, 1)

            const poNo = state.helperDeleteSelectedPo?.poNo ?? ''
            Toast({
                header: 'PO NO. ' + poNo + ' REMOVED',
                message: 'PO has been successfully removed.',
                type: 'error',
            })

            action.payload.removeAllLinesFormik(deletedItem)

            return {
                ...state,
                helperDeleteSelectedPo: undefined,
                selectedData: arr,
            }
        },
        setHelperDeletePo(
            state,
            action: PayloadAction<IPurchaseOrder | undefined>,
        ) {
            return {
                ...state,
                helperDeleteSelectedPo: action.payload,
            }
        },

        // Line Item-----------------------------------------------------------------------------------
        setHelperDeletePoLine(
            state,
            action: PayloadAction<IPoLineItem | undefined>,
        ) {
            return {
                ...state,
                helperDeleteSelectedPoLine: action.payload,
            }
        },
        removeSelectedPoLine(
            state,
            action: PayloadAction<{
                setFormik: (
                    poIndex: number,
                    poId: string,
                    phase3: IPoLineItem[],
                ) => void
            }>,
        ) {
            const selectedPoLine = state.helperDeleteSelectedPoLine
            const poId = selectedPoLine?.poId
            if (!poId) return

            // get po
            let allSelectedPO = JSON.parse(
                JSON.stringify(state.selectedData),
            ) as IPurchaseOrder[]
            let selectedPOIndex = allSelectedPO.findIndex(
                (data) => data.id === poId,
            )
            let selectedPO = allSelectedPO[selectedPOIndex]
            if (!selectedPO) {
                Toast({
                    header: 'ERROR',
                    message: 'Failed delete Line Item',
                    type: 'error',
                })
                return
            }

            // replace po line
            const lineId = selectedPoLine?.id
            const newPoLines = selectedPO.poLines.filter((data) => {
                if (data.id !== lineId) {
                    return true
                }
                return false
            })
            action.payload.setFormik(selectedPOIndex, poId, newPoLines)
            selectedPO.poLines = newPoLines
            allSelectedPO[selectedPOIndex] = selectedPO

            return {
                ...state,
                helperDeleteSelectedPoLine: undefined,
                selectedData: allSelectedPO,
            }
        },
        setSearchPoLines(state, action: PayloadAction<string>) {
            const searchString = action.payload
            const currentSelectedPoId = state.temporarySelectedDataLine.map(
                (data) => data.id,
            )
            const filterData = state.poLinesDataTemp
                .filter((data) => {
                    const dt: any = data
                    let result: boolean = false
                    for (const key in data) {
                        const value = dt[key]

                        if (value === searchString) {
                            result = true // Found the value, return true
                        }
                    }
                    return result
                })
                .map((data) => {
                    return {
                        ...data,
                        selected: currentSelectedPoId.includes(data.id),
                    }
                })
            return {
                ...state,
                poLinesData: filterData,
            }
        },
        setHelperSelectedPo(state, action: PayloadAction<string>) {
            const id = action.payload

            // if id == '', it means close modal
            if (id === '') {
                return {
                    ...state,
                    temporarySelectedDataLine: [],
                    helperModalSelectedPoId: id,
                }
            }

            // get current line data to temporary
            const selectedPO = state.selectedData.find((data) => data.id === id)
            if (!selectedPO) {
                Toast({
                    header: 'Error',
                    message: 'Failed to get current PO line',
                    type: 'error',
                })
                return
            }
            const temporarySlectedLines = selectedPO.poLines ?? []

            // set selected id
            return {
                ...state,
                temporarySelectedDataLine: temporarySlectedLines,
                helperModalSelectedPoId: id,
            }
        },
        setPoLinesData(
            state,
            action: PayloadAction<IResponseData<IPoLineItem[]>>,
        ) {
            const { isSuccess, data, meta, errors } = action.payload
            if (!isSuccess) {
                const errorMessage = errors?.poId[0] ?? 'Failed, Get Lines Data'
                Toast({
                    header: 'Error',
                    message: errorMessage,
                    type: 'error',
                })
                return
            }
            const tempSelectedPoLines = state.temporarySelectedDataLine
            const currentSelectedPoId = tempSelectedPoLines.map(
                (data) => data.id,
            )

            const d = data.map((item: IPoLineItem) => {
                const { poShipments, ...props } = item

                // count total qty in ship
                let qtyInShip = 0
                if (poShipments && poShipments?.length > 0) {
                    poShipments.forEach((data) => {
                        qtyInShip += data.qty
                    })
                }
                const qtyAvailable = parseInt(props.qtyPo ?? '0') - qtyInShip
                const shipment: IPoLineItem = {
                    ...props,
                    poShipments: poShipments,
                    totalPoShipments: qtyInShip,
                    qtyAvailable: qtyAvailable,
                    amount: formatCurrencyUsd(props.amount),
                    shipment: {
                        totalQty: item.qtyPo,
                        shipmentItem: {
                            itemsInShip:
                                item.shipment?.shipmentItem?.itemsInShip ?? 0,
                            itemsToShip:
                                item.shipment?.shipmentItem?.itemsToShip ?? 0,
                        },
                        deliveryStatus: {
                            received:
                                item.shipment?.deliveryStatus?.received ?? 0,
                            returned:
                                item.shipment?.deliveryStatus?.returned ?? 0,
                        },
                    },
                    selected: currentSelectedPoId.includes(item.id),
                }
                return shipment
            })

            state.poLinesData = d
            state.poLinesDataTemp = d
            state.poLinesMeta = meta
        },
        setPageNumberLineData(state, action: PayloadAction<number>) {
            const pageNumber = action.payload
            const filter = { ...state.poLinesfilter, pageNumber }
            return {
                ...state,
                ...filter,
            }
        },
        setTemporarySelectedPoLine(
            state,
            action: PayloadAction<IPoLineItem[]>,
        ) {
            console.log(action.payload)
            return {
                ...state,
                temporarySelectedDataLine: action.payload,
            }
        },
        setSelectedPoLine(
            state,
            action: PayloadAction<{
                setFormik: (
                    poIndex: number,
                    poId: string,
                    phase3: IPoLineItem[],
                ) => void
            }>,
        ) {
            // dont replace current selected po
            // add the new po on the last array
            // order by line id
            const id = state.helperModalSelectedPoId
            let allSelectedPO = JSON.parse(
                JSON.stringify(state.selectedData),
            ) as IPurchaseOrder[]
            let selectedPOIndex = allSelectedPO.findIndex(
                (data) => data.id === id,
            )
            let selectedPO = allSelectedPO[selectedPOIndex]
            if (!selectedPO) {
                return
            }
            let currentPOLines: IPoLineItem[]
            if (selectedPO.poLines) {
                currentPOLines = [...selectedPO.poLines]
            } else {
                currentPOLines = []
            }
            const temporarySelectedPoLine = state.temporarySelectedDataLine

            const currentSelectedPoLineId = currentPOLines.map(
                (data) => data.id,
            )
            const temporarySelectedPoId = temporarySelectedPoLine.map(
                (data) => data.lineId,
            )
            // 1. remove current po lines, if not selected on temporary
            const phase1 = currentPOLines.filter((data) => {
                const id = data.id
                if (!temporarySelectedPoId.includes(id)) {
                    return false
                }
                return true
            })
            // 2. remove temporary selected po, if already exists in current po
            const phase2 = temporarySelectedPoLine.filter((data) => {
                const id = data.lineId
                if (!currentSelectedPoLineId.includes(id)) {
                    return true
                }
                return false
            })

            // 3. merge & sort
            const phase3 = [...phase1, ...phase2].sort(
                (a, b) => parseInt(a.lineId) - parseInt(b.lineId),
            )
            const merged: IPurchaseOrder = { ...selectedPO, poLines: phase3 }
            allSelectedPO[selectedPOIndex] = merged

            // set formik values
            action.payload.setFormik(selectedPOIndex, selectedPO.id, phase3)
            return {
                ...state,
                selectedData: allSelectedPO,
            }
        },
    },
})

// these all the variables used for selector PO
export const filterParamsSelector = (state: RootState) =>
    state.attachPo.filterParams || {}
export const poDataSelector = (state: RootState) => state.attachPo.data || {}
export const poMeta = (state: RootState) => state.attachPo.meta || {}
export const selectedPoDataSelector = (state: RootState) =>
    state.attachPo.selectedData || {}
export const temporarySelectedPoDataSelector = (state: RootState) =>
    state.attachPo.temporarySelectedData || {}
export const selectedPoIdModalHelperSelector = (state: RootState) =>
    state.attachPo.helperModalSelectedPoId || ''
export const selectedPoIdDeleteHelperSelector = (state: RootState) =>
    state.attachPo.helperDeleteSelectedPo || undefined

// these all the variables used for selector PO Lines
export const filterLineParamsSelector = (state: RootState) =>
    state.attachPo.poLinesfilter || {}
export const poLineDataSelector = (state: RootState) =>
    state.attachPo.poLinesData || {}
export const poLineMeta = (state: RootState) => state.attachPo.poLinesMeta || {}
export const selectedPoLineDataSelector = (state: RootState) =>
    state.attachPo.selectedDataLine || {}
export const temporarySelectedPoLineDataSelector = (state: RootState) =>
    state.attachPo.temporarySelectedDataLine || {}
export const selectedPoLineIdDeleteHelperSelector = (state: RootState) =>
    state.attachPo.helperDeleteSelectedPoLine || undefined

// all actions
export const {
    setPoData,
    setPageNumber,
    setSelectedPo,
    setTemporarySelectedPo,
    setPageNumberLineData,
    setPoLinesData,
    setSelectedPoLine,
    setTemporarySelectedPoLine,
    setHelperSelectedPo,
    removeSelectedPo,
    removeSelectedPoLine,
    setHelperDeletePo,
    setSearchPoLines,
    setHelperDeletePoLine,
} = attachPOSlice.actions

// Reducer
export default attachPOSlice.reducer
