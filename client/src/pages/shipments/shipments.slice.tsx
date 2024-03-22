import { IMeta, IResponseData } from 'common/common.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import {
    IShipment2,
    IShipmentFilterDropdown,
    IShipmentFilterDropdownOptions,
    IShipmentStatusTotal,
    IShipmentsFilter,
} from './shipments.interface'
import { ITabItem } from 'components/tab/tab.interface'
import { formatDate, toCamelCase } from 'common/common.service'
import {
    shipmentSortByOption,
    transportScheduleOption,
} from './shipments.static'
import { IRouteCode } from 'repository/data/route-code.interface'

interface IShipmentsSlice {
    data: IShipment2[]
    meta: IMeta
    search: string | null
    responseMessage: string
    filter: IShipmentsFilter
    statusSelected: ITabItem
    statusTotal: IShipmentStatusTotal
    filterDropdown: IShipmentFilterDropdown
    filterDropdownOptions: IShipmentFilterDropdownOptions

    // shipment details
    detailDataError: string | null
    detailData: IShipment2
    routeCode: IRouteCode[]
}

const initialState: IShipmentsSlice = {
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
    filter: {
        status: '',
        inProgressStat: '',
        pageNumber: 1,
        pageSize: 50,
    },
    statusTotal: {
        inprogress: {
            count: 0,
            child: {
                booked: 0,
                shipped: 0,
                delivered: 0,
                infactory: 0,
            },
        },
        confirmed: 0,
    },
    statusSelected: {
        value: 'inProgress',
        key: 'status',
        label: 'In Progress',
        totalData: 0,
        childStatus: [
            { key: 'status', value: 'booked', label: 'Booked', totalData: 0 },
        ],
    },
    filterDropdown: {
        transportSchedule: {
            etd: {
                from: '',
                to: '',
            },
            eta: {
                from: '',
                to: '',
            },
            // hide because there is no data yet
            // atd: {
            //     from: '',
            //     to: '',
            // },
            // ata: {
            //     from: '',
            //     to: '',
            // },
        },
        transportScheduleOption: transportScheduleOption[0],
        sortBy: shipmentSortByOption[0],
        transport: [],
        origin: [],
        destination: [],
        consignee: [],
        shipper: [],
    },
    filterDropdownOptions: {
        transport: [],
        origin: [],
        destination: [],
        consignee: [],
        shipper: [],
    },

    // shipment details
    detailDataError: null,
    detailData: {
        shipmentID: '',
        transport: '',
        origin: '',
        destination: '',
        shipper: '',
        consignee: '',
        etd: '',
        eta: '',
        weight: 0,
        uw: '',
        volume: 0,
        uv: '',
        houseBill: '',
        chargeable: 0,
        goodValue: 0,
        containerMode: '',
        shipmentType: '',
        containerType: '',
        voyageOrFlight: '',
        wv: '',
        inners: '',
        insuranceValue: 0,
        description: '',
        marksAndNumber: '',
        incoterm: '',
        additionalTerm: '',
        spotRate: 0,
        serviceRate: '',
        serviceLevel: '',
        entryDetails: '',
        issueDate: '',
        expiryDate: '',
        releaseType: '',
        chargeApply: '',
        packs: 0,
        screeningStatus: '',
        shipmentStatus: '',
        phase: '',
        efreightStatus: '',
        size: 0,
        milestone: [],
        goodOrPacks: [],
        containers: [],
        poLines: '',
        carrier: '',
        transports: [],
        relatedInvoices: [],
        eDocumentationDetails: [],
        poAttached: '',
        routeCode: '',
        supplierInvoice: '',
        packsType: '',
        innersType: '',
        goodValueCurrency: '',
        insuranceValueCurrency: '',
        addressDetails: [],

        // delete this field when there are no missing fields
        dataNull: null,
        shippingDate: null,
        chargesApply: null,
    },
    routeCode: [],
}

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        setShipmentData(
            state,
            action: PayloadAction<IResponseData<IShipment2[]>>,
        ) {
            const { data, isSuccess, message, meta, links, additionals } =
                action.payload

            // set total status
            const updatedStatusTotal: any = {
                ...initialState.statusTotal,
            }
            const stats: {
                status: string
                count: number
                childStatus?: { status: string; count: number }[]
            }[] = additionals ?? []
            // Iterasi melalui setiap elemen dalam 'stats'
            stats.forEach((stat) => {
                const statusName = toCamelCase(stat.status)
                // Perbarui nilai 'statusTotal' sesuai dengan count dari 'stats'
                if (stat?.childStatus) {
                    let childCount: any = {
                        booked: 0,
                        shipped: 0,
                        delivered: 0,
                        infactory: 0,
                    }

                    stat?.childStatus?.forEach((childStat) => {
                        const statusNameChild = toCamelCase(childStat.status)
                        if (statusNameChild in childCount)
                            childCount[statusNameChild] = childStat.count
                    })

                    updatedStatusTotal[statusName] = {
                        count: stat.count,
                        child: childCount,
                    }
                } else if (statusName in updatedStatusTotal) {
                    updatedStatusTotal[statusName] = stat.count
                }
            })

            // set data
            const updatedData = data.map((item) => ({
                ...item,
                etd: formatDate(item?.etd as string),
                atd: formatDate(item?.atd as string),
                eta: formatDate(item?.eta as string),
                ata: formatDate(item?.ata as string),
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
        setSelectedStatus(state, action: PayloadAction<ITabItem>) {
            const statusSelected = action.payload

            return {
                ...state,
                statusSelected,
            }
        },
        setFilter(state, action: PayloadAction<IShipmentsFilter>) {
            const filter = action.payload
            return {
                ...state,
                filter,
            }
        },
        setPageNumber(state, action: PayloadAction<number>) {
            const pageNumber = action.payload
            const filter = { ...state.filter, pageNumber }
            return {
                ...state,
                filter,
            }
        },
        setFilterDropdown(
            state,
            action: PayloadAction<IShipmentFilterDropdown>,
        ) {
            const filterDropdown = action.payload
            return {
                ...state,
                filterDropdown,
            }
        },
        setFilterDropdownOptions(
            state,
            action: PayloadAction<IShipmentFilterDropdownOptions>,
        ) {
            const filterDropdownOptions = action.payload
            return {
                ...state,
                filterDropdownOptions,
            }
        },

        // Detail Segment -------------------------------------------------
        setShipmentDetailsData(
            state,
            action: PayloadAction<IResponseData<IShipment2>>,
        ) {
            const { isSuccess, errors, data } = action.payload
            if (!isSuccess) {
                state.detailDataError =
                    errors?.poId[0] ?? 'Error, No Data Found'
                return
            }
            state.detailData = data
        },
        setRouteCode(
            state,
            action: PayloadAction<IResponseData<IRouteCode[]>>,
        ) {
            return {
                ...state,
                routeCode: action.payload.data ?? [],
            }
        },
    },
})

// these all the variables used for selector
export const shipmentsDataSelector = (state: RootState) =>
    state.shipment.data || {}
export const filterSelector = (state: RootState) => state.shipment.filter || {}
export const shipmentMetaSelector = (state: RootState) =>
    state.shipment.meta || {}
export const shipmentsFilterSelector = (state: RootState) =>
    state.shipment.filter || {}
export const shipmentsStatusTotalSelector = (state: RootState) =>
    state.shipment.statusTotal || {}
export const tabStatusFilterSelector = (state: RootState) =>
    state.shipment.statusSelected || {}
export const filterDropdownSelector = (state: RootState) =>
    state.shipment.filterDropdown || {}
export const filterDropdownOptionsSelector = (state: RootState) =>
    state.shipment.filterDropdownOptions || {}

// variables shipment Details
export const shipmentDetailsDataSelector = (state: RootState) =>
    state.shipment.detailData || {}
export const routeCodeSelector = (state: RootState) =>
    state.shipment.routeCode || []

// all actions
export const {
    setShipmentData,
    setShipmentDetailsData,
    setSelectedStatus,
    setPageNumber,
    setFilter,
    setFilterDropdownOptions,
    setFilterDropdown,
    setRouteCode,
} = shipmentsSlice.actions

// Reducer
export default shipmentsSlice.reducer
