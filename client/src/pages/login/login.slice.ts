import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { RootState, store } from 'store'
const initialState: IUserAuth = {
    id: '',
    portalLogin: '',
    role: '',
    token: '',
    expires_in: '',
    organizationCode: '',
    email: '',
}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginData(state, action: PayloadAction<IUserAuth>) {
            return {
                ...state,
                ...{
                    ...action.payload,
                    sessionExpiredMessage: undefined,
                },
            }
        },
        logoutAction() {
            return initialState
        },
        removeSessionAction() {
            return {
                ...initialState,
                sessionExpiredMessage: 'Session expired, please login again',
            }
        },
        removeSessionMessage(state) {
            return {
                ...state,
                sessionExpiredMessage: undefined,
            }
        },
    },
})

export const removeSession = () => {
    store.dispatch(removeSessionAction())
}

export const userDataSelector = (state: RootState) => state.login || {}
export const {
    setLoginData,
    logoutAction,
    removeSessionAction,
    removeSessionMessage,
} = loginSlice.actions
export default loginSlice.reducer
