import {
    IGetTransactionAssetPayload,
    ITransactionAsset,
} from 'repository/interface/transaction-asset.interface'
import { IRAFilter } from './request-asset.interface'
import { IMeta, IResponseData } from 'common/common.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface IRequsetAssetSlice {
    data: ITransactionAsset[]
    payload: IGetTransactionAssetPayload
    filter: IRAFilter
    meta: IMeta

    // segment details
    detailData: ITransactionAsset
}

const initialState: IRequsetAssetSlice = {
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
        typeTransactionAsset: { label: '', value: '' },
        statusTransactionAsset: { label: '', value: '' },
        description: '',
    },

    // segment detail
    detailData: {
        id: 0,
        userId: 0,
        assetId: 0,
        statusTransactionAssetId: 0,
        reasonRequest: '',
        reasonReject: '',
        manageBy: 0,
        createdAt: '',
        updatedAt: '',
        typeTransactionAssetId: 0,
    },
}

const requestAssetSlice = createSlice({
    name: 'requestAsset',
    initialState,
    reducers: {
        setData(
            state,
            action: PayloadAction<IResponseData<ITransactionAsset[]>>,
        ) {
            const { data, isSuccess, message, meta } = action.payload
            const d = { data, isSuccess, message, meta }
            return {
                ...state,
                ...d,
            }
        },
        setFilter(state, action: PayloadAction<IRAFilter>) {
            const filter = action.payload
            return {
                ...state,
                filter,
            }
        },
        setPayload(state, action: PayloadAction<IGetTransactionAssetPayload>) {
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

        // segment details
        setDataDetail(
            state,
            action: PayloadAction<IResponseData<ITransactionAsset>>,
        ) {
            const { data } = action.payload
            return {
                ...state,
                detailData: data,
            }
        },
    },
})

// these all the variables used for selector
export const RADataSelector = (state: RootState) => state.requestAsset.data || {}
export const filterSelector = (state: RootState) =>
    state.requestAsset.filter || {}
export const payloadSelector = (state: RootState) =>
    state.requestAsset.payload || {}
export const RAMetaSelector = (state: RootState) => state.requestAsset.meta || {}

//segment detail
export const RADDataSelector = (state: RootState) =>
    state.requestAsset.detailData || {}

// all actions
export const {
    setData,
    setDataDetail,
    setFilter,
    setPayload,
    setPageNumber,
} = requestAssetSlice.actions

// Reducer
export default requestAssetSlice.reducer
