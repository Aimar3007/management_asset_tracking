// import { useAxios } from 'common/hooks'
import Content from 'components/layout/content.component'
import Header from 'components/layout/header.component'
import Sidebar from 'components/layout/sidebar.component'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import './components/layout/layout.style.css'
import { useAxios } from 'common/hooks'
import { IUserAuth } from 'repository/data/user-auth.interface'
import { userDataSelector } from 'pages/login/login.slice'
import { useSelector } from 'react-redux'

function App(): React.ReactElement {
    const user: IUserAuth = useSelector(userDataSelector)
    console.log('user', user)

    // this is temporary solution

    const isMobile = process.env.REACT_APP_API_URL_ISMOBILE
    const isMobileView = document.documentElement.clientWidth <= 900
    useEffect(() => {
        if (isMobileView && isMobile === 'true') {
            window.location.assign('')
        }
    }, [isMobileView, isMobile])
    useAxios()
    return (
        <>
            <div className="logistical-layout">
                <div className="flex">
                    <div className="flex-grow flex flex-col order-2 overflow-auto">
                        <div className="logistical-content order-last">
                            <Content>
                                <Outlet />
                            </Content>
                        </div>
                        <Header />
                    </div>
                    {user?.role === 'admin' && (
                        <Sidebar isMobileView={isMobileView} />
                    )}
                </div>
            </div>
        </>
    )
}

export default App
