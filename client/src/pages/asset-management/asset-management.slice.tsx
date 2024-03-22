import { IPagination, IResponseData } from 'common/common.interface'
import { IAssetManagementFilter } from './asset-management.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import {
    IAssetManagement,
    IAssetManagementPayload,
} from 'repository/data/asset-management-data.interface'

interface IAssetManagementSlice {
    data: IAssetManagement[]
    payload: IAssetManagementPayload
    filter: IAssetManagementFilter
    pagination: IPagination
}

const initialState: IAssetManagementSlice = {
    data: [],
    pagination: {
        totalPage: 0,
    },
    payload: {
        page: 1,
        record: 50,
    },
    filter: {
        name: { label: '', value: '' },
        brand: { label: '', value: '' },
        user: { label: '', value: '' },
        description: '',
    },
}

const assetManagementSlice = createSlice({
    name: 'assetManagement',
    initialState,
    reducers: {
        setData(
            state,
            action: PayloadAction<IResponseData<IAssetManagement[]>>,
        ) {
            const { data, links, isSuccess, message, meta, pagination } =
                action.payload
            const d = { data, links, isSuccess, message, meta, pagination }
            return {
                ...state,
                ...d,
            }
        },
        setFilter(state, action: PayloadAction<IAssetManagementFilter>) {
            const filter = action.payload
            return {
                ...state,
                filter,
            }
        },
        setPayload(state, action: PayloadAction<IAssetManagementPayload>) {
            const payload = action.payload
            return {
                ...state,
                payload,
            }
        },
    },
})

// these all the variables used for selector
export const assetManagementDataSelector = (state: RootState) =>
    state.assetManagement.data || {}
export const filterSelector = (state: RootState) =>
    state.assetManagement.filter || {}
export const payloadSelector = (state: RootState) =>
    state.assetManagement.payload || {}
export const assetManagementPaginationSelector = (state: RootState) =>
    state.assetManagement.pagination || {}

// all actions
export const { setData, setPayload, setFilter } = assetManagementSlice.actions

// Reducer
export default assetManagementSlice.reducer
