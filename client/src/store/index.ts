import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers, Store } from 'redux'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import commonReducer from 'common/common.slice'
import loginReducer from '../pages/login/login.slice'
import userReducer from '../pages/user-acces/user-access.slice'
import poReducer from '../pages/purchase-order/purchase-order.slice'
import shipmentsReducer from '../pages/shipments/shipments.slice'
import assetManagementReducer from '../pages/asset-management/asset-management.slice'
import attachPoReducer from '../pages/shipments/attach-po/attach-po.slice'
import storeReducer from '../store/slice'

const rootReducer = combineReducers({
    common: commonReducer,
    login: loginReducer,
    user: userReducer,
    purchaseOrder: poReducer,
    shipment: shipmentsReducer,
    attachPo: attachPoReducer,
    assetManagement: assetManagementReducer,
    storeReducer,
})

const key = 'logisticaldatastore'

const persistConfig = {
    key,
    storage,
    whitelist: ['login', 'common'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const devTools = process.env.NODE_ENV !== 'production'
export const store = configureStore({
    reducer: persistedReducer,
    devTools,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: true,
            },
        }).concat(thunk),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
    dispatch: AppThunkDispatch
}

export type AppDispatch = ThunkDispatch<string, any, AnyAction>

// Create the typed versions of the useDispatch and useSelector Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
