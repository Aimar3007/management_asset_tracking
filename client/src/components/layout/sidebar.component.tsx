import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from 'common/common.static'
import { IRoute } from 'common/common.interface'
import { useAppDispatch, useAppSelector } from 'store'
import {
    closeMenuHandler,
    openMenuHandler,
    getOpenMenu,
    closeSideModalHandler,
} from 'common/common.slice'
import Menu from './components/menu.component'
import logoSmalAssetManagement from '../../assets/img/icons/assetManagement.png'
import './layout.style.css'
import { isAccessible } from 'common/common.service'
import { useSelector } from 'react-redux'
import { classNameSelector } from 'store/slice'
import { IUserAuth } from 'repository/interface/user-auth.interface'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'

interface ISidebar {
    isMobileView: boolean
}

const Sidebar: React.FC<ISidebar> = ({ isMobileView }) => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const isExpand = useAppSelector(getOpenMenu)
    const expandHandler = () =>
        isExpand ? closeMenuHandler() : openMenuHandler()
    const [logoHiddenClass, setLogoHiddenClass] = useState<string>('')
    const [smallLogoHiddenClass, setSmallLogoHiddenClass] = useState<string>('')
    const widthClass = isExpand
        ? 'sm:w-[100vw] w-[250px] '
        : 'sm:w-0 sm:ml-[-80px]  w-[82px] '
    const mobilePadding = isExpand ? 'sm:p-[16px]' : 'sm:py-[16px]'
    const sidebarLogo = isExpand
        ? 'ri-arrow-left-double-line'
        : 'ri-arrow-right-double-line'
    const globalClassName = useSelector(classNameSelector)
    const session: IUserAuth = useSelector(sessionSelector)

    useEffect(() => {
        // smooth transition
        let delay = 0
        if (isExpand) {
            delay = 100
        }
        setTimeout(() => {
            setLogoHiddenClass(isExpand ? '!opacity-100' : 'opacity-0 hide')
            setSmallLogoHiddenClass(
                !isExpand ? '!opacity-100' : 'opacity-0 hide',
            )
        }, delay)
    }, [isExpand])

    const actionHandler = (path: string) => {
        dispatch(closeSideModalHandler())
        nav(path)
        if (isMobileView) {
            dispatch(isExpand ? closeMenuHandler() : openMenuHandler())
        }
    }

    return (
        <div
            className={`bg-white order-1 sm:border-t box-shadow mobile-version ${globalClassName || ''}`}
        >
            {/* Logo */}
            <div className="sm:hidden min-w-[82px] h-[4rem] flex w-full justify-between items-center">
                {!isExpand ? (
                    <div className="w-full flex justify-center">
                        <img
                            src={logoSmalAssetManagement}
                            alt="logo"
                            className={`cursor-pointer opacity-0 logo-small-animation ${smallLogoHiddenClass} `}
                            onClick={() => dispatch(expandHandler())}
                        />
                    </div>
                ) : (
                    <></>
                )}

                <div
                    className={`logo-animation w-full flex justify-between ${logoHiddenClass} px-5 `}
                    style={{ display: isExpand ? '' : 'none' }}
                >
                    <div className="text-size-M font-bold flex items-center text-green">
                        ASSET MANAGEMENT
                    </div>
                    <i
                        onClick={() => dispatch(expandHandler())}
                        className={`  ${sidebarLogo}  ease-in-out cursor-pointer z-50 text-[1.5rem]  text-logistical-gray-ver8`}
                    />
                </div>
            </div>

            <div className="mx-5 border-b sm:hidden "> </div>

            {/* Routes */}
            <div
                className={`top-0 left-0 transition-all ease-in-out duration-[0.5s] overflow-visible sm:overflow-hidden border-[#f6f7fb] h-[calc(100vh-4rem)] transform shadow-sm ${widthClass} ${mobilePadding} px-5 pt-2`}
            >
                {routes
                    ?.filter(
                        (route) =>
                            route.show === true && isAccessible(route.client),
                    )
                    .filter((route) => {
                        if (route.path === 'user') {
                            return (
                                (session.role === 'Super' ||
                                    session.role === 'Admin') &&
                                session.organizationCode !== 'pan'
                            )
                        }
                        return true
                    })
                    .map((route: IRoute, idx: number) => (
                        <Menu
                            {...route}
                            showName={isExpand}
                            key={idx}
                            openSideBar={() => dispatch(openMenuHandler())}
                            action={actionHandler}
                        />
                    ))}
                {/* Log out */}
                {/* <div className="logout-button-container">
                    <Menu
                        showName={isExpand}
                        icon={'ri-logout-box-r-line'}
                        text={'Log Out'}
                        path={'#'}
                        action={handleLogout}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar
