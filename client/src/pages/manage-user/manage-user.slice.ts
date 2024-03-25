import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMeta, IResponseData } from 'common/common.interface'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'
import { IUser, IUserPayload } from 'repository/interface/user.interface'
import { RootState } from 'store'
import { IUMFilter } from './manage-user.interface'

interface IMUSlice {
    data: IUser[]
    payload: IUserPayload
    filter: IUMFilter
    meta: IMeta

    // segment details
    detailData: IUser
    TAData: ITransactionAsset[]
    TAMeta: IMeta
}

const initialState: IMUSlice = {
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
        deletedAt: 2
    },
    filter: {
        status: { label: '', value: '' },
        city: { label: '', value: '' },
        userName: '',
    },

    // segment detail
    detailData: {
        id: 0,
        userName: '',
        email: '',
        roleId: 0,
        role: {
            id: 0,
            type: '',
            createdAt: '',
            updatedAt: null,
        },
        city: '',
        deletedAt: null,
        createdAt: '',
        updatedAt: null,
    },
    TAData: [],
    TAMeta: {
        currentPage: 0,
        lastPage: 0,
        perPage: 0,
        totalPage: 0,
        totalItems: 0,
        indexEnd: 0,
        indexStart: 0,
    },
}

const manageUserSlice = createSlice({
    name: 'manageUser',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IResponseData<IUser[]>>) {
            const { data, isSuccess, message, meta } = action.payload
            const d = { data, isSuccess, message, meta }
            return {
                ...state,
                ...d,
            }
        },
        setFilter(state, action: PayloadAction<IUMFilter>) {
            const filter = action.payload
            return {
                ...state,
                filter,
            }
        },
        setPayload(state, action: PayloadAction<IUserPayload>) {
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
        setDataDetail(state, action: PayloadAction<IResponseData<IUser>>) {
            const { data } = action.payload
            return {
                ...state,
                detailData: data,
            }
        },
        setTAData(
            state,
            action: PayloadAction<IResponseData<ITransactionAsset[]>>,
        ) {
            const { data, meta } = action.payload
            const d = { TAData: data, TAMeta: meta }
            return {
                ...state,
                ...d,
            }
        },
    },
})

// these all the variables used for selector
export const MUDataSelector = (state: RootState) => state.manageUser.data || {}
export const filterSelector = (state: RootState) =>
    state.manageUser.filter || {}
export const payloadSelector = (state: RootState) =>
    state.manageUser.payload || {}
export const MUMetaSelector = (state: RootState) => state.manageUser.meta || {}

//segment detail
export const MUDDataSelector = (state: RootState) =>
    state.manageUser.detailData || {}
export const TADataSelector = (state: RootState) =>
    state.manageUser.TAData || {}
export const TAMetaSelector = (state: RootState) =>
    state.manageUser.TAMeta || {}

// all actions
export const {
    setData,
    setDataDetail,
    setFilter,
    setPayload,
    setPageNumber,
    setTAData,
} = manageUserSlice.actions

// Reducer
export default manageUserSlice.reducer
