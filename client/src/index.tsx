import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { IRoute } from './common/common.interface'
import { routes } from './common/common.static'
import Login from 'pages/login/login-page.component'
import ResetPassword from 'pages/reset-password/reset-password-page.component'
import Page404 from 'pages/404-page/404-page.component'
import { isAccessible } from 'common/common.service'
import { ToastContainer } from 'react-toastify'
import App from 'App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/change-password"
                        element={<ResetPassword />}
                    />
                    <Route path="/*" element={<Page404 />} />
                    <Route element={<App />}>
                        {routes.map(
                            (
                                {
                                    Content,
                                    path,
                                    expandable,
                                    sub,
                                    client,
                                }: IRoute,
                                idx: number,
                            ) => {
                                if (!isAccessible(client)) {
                                    return null
                                }
                                if (!expandable) {
                                    return (
                                        <Route
                                            key={idx}
                                            path={path}
                                            Component={Content}
                                        />
                                    )
                                } else {
                                    return sub?.map((item, idxx) => {
                                        if (!isAccessible(item.client)) {
                                            return null
                                        }
                                        return (
                                            <Route
                                                key={idxx}
                                                path={item.path}
                                                Component={item.Content}
                                            />
                                        )
                                    })
                                }
                            },
                        )}
                    </Route>
                </Routes>
                <ToastContainer />
            </HashRouter>
        </PersistGate>
    </Provider>,
)

reportWebVitals()
