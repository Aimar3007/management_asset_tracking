import { IAssetManagementFilter } from './asset-management.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
import {
    IAssetManagement,
    IAssetManagementPayload,
} from 'repository/interface/asset-management-data.interface'
import { IMeta, IResponseData } from 'common/common.interface'

interface IAssetManagementSlice {
    data: IAssetManagement[]
    payload: IAssetManagementPayload
    filter: IAssetManagementFilter
    meta: IMeta
}

const initialState: IAssetManagementSlice = {
    data: [],
    meta: {
        currentPage: 0,
        lastPage: 0,
        perPage: 0,
        totalPage: 0,
        totalItems: 0,
        indexEnd: 0,
        indexStart: 0,
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
            const { data, isSuccess, message, meta } = action.payload
            const d = { data, isSuccess, message, meta }
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
        setPageNumber(state, action: PayloadAction<number>) {
            const page = action.payload
            const payload = { ...state.payload, page }
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
export const AMMetaSelector = (state: RootState) =>
    state.assetManagement.meta || {}

// all actions
export const { setData, setPayload, setFilter, setPageNumber } =
    assetManagementSlice.actions

// Reducer
export default assetManagementSlice.reducer
