import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMeta, IResponseData } from 'common/common.interface'
import { ITabItem } from 'components/tab/tab.interface'
import { IUserStatusTotal } from 'repository/data/user-status-count.interface'
import { IUser, IUserDetail } from 'repository/data/user.interface'
import { RootState } from 'store'
import { IUserAccessFilter } from './user-access.interface'
import { IRole } from 'repository/data/role.interface'
import { IRoleModule } from 'repository/data/role-module.interface'
import { tabItemsInitial } from './user-access.static'

interface IUserAccessSlice {
    data: IUser[]
    meta: IMeta
    responseMessage: string | null
    responseStatus: boolean | null
    statusTotal: IUserStatusTotal
    statusSelected: ITabItem
    filter: IUserAccessFilter
    role: IRole[]
    roleModule: IRoleModule[]
    detailUser?: IUserDetail
    tabItems: ITabItem[]
}

const initialState: IUserAccessSlice = {
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
    responseMessage: null,
    responseStatus: null,
    statusTotal: {
        active: 0,
        all: 0,
        suspended: 0,
    },
    statusSelected: {
        value: '',
        key: '',
        label: '',
        totalData: 0,
    },
    filter: { pageNumber: 1, pageSize: 50 },
    role: [],
    roleModule: [],
    tabItems: tabItemsInitial,
}

const userAccessSlice = createSlice({
    name: 'userAccess',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<IResponseData<IUser[]>>) {
            const { data, links, isSuccess, message, meta } = action.payload
            const d = { data, links, isSuccess, message, meta }
            return {
                ...state,
                ...d,
            }
        },
        setTabItems(state, action: PayloadAction<ITabItem[]>) {
            const tabItems = action.payload
            return {
                ...state,
                tabItems,
            }
        },
        setSelectedStatus(state, action: PayloadAction<ITabItem>) {
            const statusSelected = action.payload
            return {
                ...state,
                statusSelected,
            }
        },
        setFilter(state, action: PayloadAction<IUserAccessFilter>) {
            const filter = action.payload
            return {
                ...state,
                filter,
            }
        },
        setFilterSearchUser(state, action: PayloadAction<string>) {
            const search = action.payload
            const filter = { ...state.filter, search }
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
        setRole(state, action: PayloadAction<IResponseData<IRole[]>>) {
            const role = action.payload.data
            return {
                ...state,
                role,
            }
        },
        setRoleModule(
            state,
            action: PayloadAction<IResponseData<IRoleModule[]>>,
        ) {
            const roleModule = action.payload.data
            return {
                ...state,
                roleModule,
            }
        },
        setDetailUser(
            state,
            action: PayloadAction<IResponseData<IUserDetail>>,
        ) {
            const detailUser = action.payload.data ?? undefined
            return {
                ...state,
                detailUser,
            }
        },
    },
})

// these all the variables used for selector
export const tabStatusFilterSelector = (state: RootState) =>
    state.user.statusSelected || {}
export const filterSelector = (state: RootState) => state.user.filter || {}
export const userTotalStatus = (state: RootState) =>
    state.user.statusTotal || {}
export const userDataSelector = (state: RootState) => state.user.data || {}
export const userMeta = (state: RootState) => state.user.meta || {}
export const userResponseMessage = (state: RootState) =>
    state.user.responseMessage || {}
export const userResponseStatus = (state: RootState) =>
    state.user.responseStatus || {}
export const roleSelector = (state: RootState) => state.user.role || {}
export const roleModuleSelector = (state: RootState) =>
    state.user.roleModule || {}
export const userDetailSelector = (state: RootState) =>
    state.user.detailUser || undefined
export const tabItemsSelector = (state: RootState) => state.user.tabItems || []

// all actions
export const {
    setUserData,
    setSelectedStatus,
    setFilter,
    setFilterSearchUser,
    setPageNumber,
    setRole,
    setRoleModule,
    setDetailUser,
    setTabItems,
} = userAccessSlice.actions

// Reducer
export default userAccessSlice.reducer
