import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface ICommonInitial {
    showMenu: boolean
    openSideModal: boolean
    module: string
}

const initialState: ICommonInitial = {
    showMenu: false,
    openSideModal: false,
    module: '',
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openMenuHandler: (state) => {
            state.showMenu = true
        },
        closeMenuHandler: (state) => {
            state.showMenu = false
        },
        openSideModalHandler: (state) => {
            state.openSideModal = true
        },
        closeSideModalHandler: (state) => {
            state.openSideModal = false
        },
        openSideModalModule: (state, action) => {
            state.openSideModal = true
            state.module = action.payload
        },
    },
})

export const {
    openMenuHandler,
    closeMenuHandler,
    openSideModalHandler,
    closeSideModalHandler,
    openSideModalModule,
} = commonSlice.actions

export const getOpenMenu = (state: RootState) => state.common.showMenu
export const getOpenSideModal = (state: RootState) => ({
    open: state.common.openSideModal,
    module: state.common.module,
})

export default commonSlice.reducer
