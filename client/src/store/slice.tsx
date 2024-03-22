import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface IStore {
    className: string
}
const initialState: IStore = {
    className: 'z-[2]',
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setClassNames(state, action: PayloadAction<string>) {
            const className = action.payload

            return {
                ...state,
                className,
            }
        },
    },
})

export const classNameSelector = (state: RootState) =>
    state.storeReducer.className || {}

// all actions
export const { setClassNames } = storeSlice.actions

// Reducer
export default storeSlice.reducer
