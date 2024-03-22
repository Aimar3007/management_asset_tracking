/* eslint-disable no-unused-vars */
import { IMeta, IResponseData } from 'common/common.interface'
import {
    IPurchaseOrder,
    IPurchaseOrderFilterParams,
    IPurchaseOrderFilterBody,
    IPurchaseOrderStatusTotal,
    IPoFilterDropdownOptions,
    IPoFilterDropdown,
} from './purchase-order.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { ITabItem } from 'components/tab/tab.interface'
import {
    formatCurrencyUsd,
    formatDate,
    formatDateTime,
    numberWithCommas,
    toCamelCase,
} from 'common/common.service'
import {
    IHistories,
    IPODetail,
    IPoLineItem,
} from './purchase-order-detail/purchase-order-detail.interface'

import countryJson from '../../repository/data/country.json'
import { ICountry } from 'repository/data/country.interface'

interface IPurchaseOrderSlice {
    data: IPurchaseOrder[]
    meta: IMeta
    search: string | null
    responseMessage: string
    additionals: []
    statusTotal: IPurchaseOrderStatusTotal
    statusSelected: ITabItem
    filterParams: IPurchaseOrderFilterParams
    filterBody: IPurchaseOrderFilterBody
    filterDropdownOptions: IPoFilterDropdownOptions
    filterDropdown: IPoFilterDropdown

    // additional for detail
    detailData: IPODetail
    detailDataError: string | null
    historyData: IHistories[]
    historyDataError: string | null

    // po line items
    poLinesData: IPoLineItem[]
    poLinesMeta: IMeta
    poLinesfilter: IPurchaseOrderFilterParams
}

const initialState: IPurchaseOrderSlice = {
    data: [],
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
    search: '',
    responseMessage: '',
    additionals: [],
    statusTotal: {
        all: 0,
        open: 0,
        inProgress: 0,
        canceled: 0,
        closed: 0,
    },
    statusSelected: {
        value: 'all',
        key: '',
        label: '',
        totalData: 0,
    },
    filterParams: { pageNumber: 1, pageSize: 50 },
    filterBody: {
        poNo: '',
        vendors: [],
        consignees: [],
        shippers: [],
        creators: [],
        fillStatuses: [],
        updaters: [],
        statuses: ['Open', 'In Progress', 'Canceled'],
        poDateFrom: null,
        poDateTo: null,
    },
    filterDropdownOptions: {
        vendors: [],
        updatedsBy: [],
        fillStatuses: [],
    },
    filterDropdown: {
        range: {
            from: '',
            to: '',
        },
        vendors: [],
        updatedByUsers: [],
        fillStatuses: [],
        poStatus: [],
    },

    // additional for detail
    detailData: {
        id: '',
        poNo: '',
        vendor: '',
        piNumber: '',
        piDelivery: '',
        poDate: '',
        status: '',
        buyer: '',
        shippers: [],
        rejectedReason: '',
        fillStatus: '',
        createBy: '',
        createdAt: '',
        updatedAt: '',
    },
    detailDataError: null,
    historyData: [],
    historyDataError: null,

    // po line items
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

    poLinesfilter: { pageNumber: 1, pageSize: 50 },
}

const purchaseOrderSlice = createSlice({
    name: 'purchaseOrder',
    initialState,
    reducers: {
        setPoData(
            state,
            action: PayloadAction<IResponseData<IPurchaseOrder[]>>,
        ) {
            const { data, isSuccess, message, meta, links, additionals } =
                action.payload

            // set total status
            const updatedStatusTotal: any = {
                ...initialState.statusTotal,
            }
            const stats: { status: string; count: number }[] =
                additionals?.stats ?? []
            // Iterasi melalui setiap elemen dalam 'stats'
            stats.forEach((stat) => {
                const statusName = toCamelCase(stat.status)
                // Perbarui nilai 'statusTotal' sesuai dengan count dari 'stats'
                if (statusName in updatedStatusTotal) {
                    updatedStatusTotal[statusName] = stat.count
                    stat.status !== 'Closed' &&
                        (updatedStatusTotal.all += stat.count)
                }
            })

            // set data
            const updatedData = data.map((item) => ({
                ...item,
                totalAmount: formatCurrencyUsd(item?.totalAmount),
                totalQty: numberWithCommas(item?.totalQty),
                updatedAt: formatDateTime(item.updatedAt),
                poDate: formatDate(item.poDate),
            }))

            const d = {
                data: updatedData,
                isSuccess,
                message,
                meta,
                links,
                statusTotal: updatedStatusTotal,
            }

            return {
                ...state,
                ...d,
            }
        },
        setTotalStatus(
            state,
            action: PayloadAction<IResponseData<IPurchaseOrderStatusTotal>>,
        ) {
            const statusTotal = action.payload.data
            return {
                ...state,
                statusTotal,
            }
        },
        setSelectedStatus(state, action: PayloadAction<ITabItem>) {
            const statusSelected = action.payload

            return {
                ...state,
                statusSelected,
            }
        },
        setFilterParams(
            state,
            action: PayloadAction<IPurchaseOrderFilterParams>,
        ) {
            const filterParams = action.payload
            return {
                ...state,
                filterParams,
            }
        },
        setFilterBody(state, action: PayloadAction<IPurchaseOrderFilterBody>) {
            const filterBody = action.payload
            return {
                ...state,
                filterBody,
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
        setFilterDropdownOptions(state, action: PayloadAction<any>) {
            const filterDropdownOptions = action.payload
            return {
                ...state,
                filterDropdownOptions,
            }
        },
        setFilterDropdown(state, action: PayloadAction<any>) {
            const filterDropdown = action.payload
            return {
                ...state,
                filterDropdown,
            }
        },

        // Detail Segment -------------------------------------------------
        setPoDetailData(
            state,
            action: PayloadAction<IResponseData<IPODetail>>,
        ) {
            const { isSuccess, errors, data } = action.payload
            if (!isSuccess) {
                state.detailDataError =
                    errors?.poId[0] ?? 'Error, No Data Found'
                return
            }
            // set data
            const updatedData = {
                ...data,
                updatedAt: formatDate(data.updatedAt),
                poDate: formatDate(data.poDate),
            }

            state.detailData = updatedData
        },
        setPoHistoryData(
            state,
            action: PayloadAction<IResponseData<IHistories[]>>,
        ) {
            const response = action.payload
            if (!response.isSuccess) {
                state.historyDataError =
                    response.errors?.poId[0] ?? 'Failed, Get History Data'
                return
            }
            const descDate = response.data.sort(
                (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
            )
            state.historyData = descDate
        },

        // po line items
        setPoLinesData(state, action: PayloadAction<IResponseData<any>>) {
            const { isSuccess, data, meta, errors } = action.payload
            if (!isSuccess) {
                state.historyDataError =
                    errors?.poId[0] ?? 'Failed, Get PO Line Data'
                return
            }

            const countryList = countryJson as unknown[] as ICountry[]
            let goodsValCode: string[] = []
            let goodsNameCode: string[] = []
            countryList.forEach((data) => {
                goodsValCode.push(data.alpha2)
                goodsNameCode.push(data.name)
            })

            const d = data.map((item: IPoLineItem) => {
                const {
                    lineId,
                    itemdesc,
                    qtyPo,
                    price,
                    amount,
                    colorcode,
                    size,
                    matcontents,
                    hsCode,
                    unit,
                    goodFrom,
                    ...prop
                } = item

                let label = '-'
                const index = goodsValCode.findIndex(
                    (value) => value === goodFrom,
                )
                if (index >= 0) {
                    label = goodFrom + ' - ' + goodsNameCode[index]
                }

                const shipment = {
                    ...prop,
                    goodFrom: goodFrom,
                    goodFromLabel: label,
                    lineId,
                    itemdesc,
                    qtyPo,
                    price: price,
                    amount: formatCurrencyUsd(amount),
                    colorcode,
                    size,
                    matcontents,
                    hsCode,
                    unit,
                    shipment: {
                        totalQty: item.qtyPo,
                    },
                }
                return shipment
            })

            state.poLinesData = d
            state.poLinesMeta = meta
        },
        setPoLinesPageNumber(state, action: PayloadAction<number>) {
            const pageNumber = action.payload
            const filter = { ...state.filterParams, pageNumber }
            return {
                ...state,
                filter,
            }
        },
    },
})

// these all the variables used for selector
export const tabStatusFilterSelector = (state: RootState) =>
    state.purchaseOrder.statusSelected || {}
export const filterParamsSelector = (state: RootState) =>
    state.purchaseOrder.filterParams || {}
export const filterBodySelector = (state: RootState) =>
    state.purchaseOrder.filterBody || {}
export const filterDropdownOptionSelector = (state: RootState) =>
    state.purchaseOrder.filterDropdownOptions || {}
export const filterDropdownSelector = (state: RootState) =>
    state.purchaseOrder.filterDropdown || {}
export const poTotalStatus = (state: RootState) =>
    state.purchaseOrder.statusTotal || {}
export const poDataSelector = (state: RootState) =>
    state.purchaseOrder.data || {}
export const poMeta = (state: RootState) => state.purchaseOrder.meta || {}

// selector for details ------
export const poDetailSelector = (state: RootState) =>
    state.purchaseOrder.detailData
export const poDetailErrorSelector = (state: RootState) =>
    state.purchaseOrder.detailDataError || null
export const poHistorySelector = (state: RootState) =>
    state.purchaseOrder.historyData
export const poHistoryErrorSelector = (state: RootState) =>
    state.purchaseOrder.historyDataError || null

// selector for po line items
export const poLinesDataSelector = (state: RootState) =>
    state.purchaseOrder.poLinesData
export const poLinesFilterSelector = (state: RootState) =>
    state.purchaseOrder.poLinesfilter
export const poLinesMetaSelector = (state: RootState) =>
    state.purchaseOrder.poLinesMeta || {}

// all actions
export const {
    setPoData,
    setPoDetailData,
    setTotalStatus,
    setSelectedStatus,
    setFilterParams,
    setPageNumber,
    setPoHistoryData,
    setPoLinesData,
    setPoLinesPageNumber,
    setFilterBody,
    setFilterDropdownOptions,
    setFilterDropdown,
} = purchaseOrderSlice.actions

// Reducer
export default purchaseOrderSlice.reducer
