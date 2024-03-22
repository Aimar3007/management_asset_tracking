import BreadCrumb from 'components/bread-crumb/bread-crumb.component'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mapPath } from 'utils/utils.service'
import './layout.style.css'
import { useAppDispatch, useAppSelector } from 'store'
import {
    closeMenuHandler,
    getOpenMenu,
    openMenuHandler,
} from 'common/common.slice'
import { useOutsideClickHandling } from 'common/common.service'
import { logoutAction } from 'pages/login/login.slice'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'
import { IUserAuth } from 'repository/interface/user-auth.interface'
import { useSelector } from 'react-redux'
import AvatarCircle from 'components/avatar-circle/avatar-circle.component'
export default function Header(): React.ReactElement {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const expandMenu = useAppSelector(getOpenMenu)
    const session: IUserAuth = useSelector(sessionSelector)
    const wrapperRef = useRef(null)
    const expandHandler = () =>
        expandMenu ? closeMenuHandler() : openMenuHandler()
    const nav = useNavigate()
    const paths: string[] = mapPath(location.pathname)

    // Side Menu Right handling
    const [openUserMenu, setOpenUserMenu] = useState(false)

    // outside click handler

    useOutsideClickHandling(wrapperRef, () => {
        setOpenUserMenu(false)
    })

    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="sm:w-screen" ref={wrapperRef}>
            <div className="h-[4rem] overflow-hidden w-full flex items-center justify-between static bg-white px-5">
                {/* Breadcrumb */}
                <BreadCrumb action={nav} paths={paths} />

                {/* Additional header in mobile */}
                <div className="flex mobile-header-additional w-full">
                    <i
                        className={`ri-menu-line cursor-pointer z-50 text-[1.5rem] text-logistical-gray-ver8`}
                        onClick={() => dispatch(expandHandler())}
                    />
                </div>

                {/* User Section */}
                <div className=" flex justify-end text-logistical-gray-ver4">
                    {/* <div className=" border-r px-3 text-center">
                        <i className="ri-message-3-line  cursor-pointer"></i>
                    </div>
                    <div className=" border-r px-3  cursor-pointer text-center   ">
                        <i className="ri-notification-line  cursor-pointer"></i>
                    </div> */}
                    <div
                        className="pl-3 items-center flex gap-2"
                        onClick={() => {
                            setOpenUserMenu(!openUserMenu)
                        }}
                    >
                        <div className="rounded-full w-6 mr-3 cursor-pointer">
                            <AvatarCircle name={session.email} />
                        </div>
                        <div className="sm:hidden flex flex-1 flex-col leading-[18px]  cursor-pointer">
                            <p className="text-size-S logistical-gray-ver4 font-medium">
                                {session.email}
                            </p>
                            <p className="text-size-S text-logistical-gray-ver8">
                                {session.role} User
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setOpenUserMenu(!openUserMenu)
                        }}
                        className="cursor-pointer sm:pl-0 pl-3"
                    >
                        <i className="ri-arrow-down-s-line"></i>
                    </div>
                    <PopupUserMenu
                        menuRef={menuRef}
                        isOpen={openUserMenu}
                        funcProfile={() => {
                            nav('/profile')
                        }}
                        funcLogout={() => {
                            dispatch(logoutAction())
                            nav('/login')
                        }}
                        setCloseUserMenu={() => {
                            setOpenUserMenu(false)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export const PopupUserMenu = ({
    isOpen,
    funcLogout,
    funcProfile,
    menuRef,
    setCloseUserMenu,
}: {
    isOpen: boolean
    funcLogout: () => void
    funcProfile: () => void
    menuRef: React.LegacyRef<HTMLDivElement>
    setCloseUserMenu: () => void
}) => {
    // eslint-disable-next-line no-unused-vars
    const showClass = isOpen
        ? ' opacity-100 visible duration-300'
        : 'opacity-0 invisible ! mt-[3.5rem]'

    return (
        <>
            <div
                ref={menuRef}
                className={`${showClass} rounded-logistical-radius  absolute right-0 top-0 bg-white border border-gray-300 py-3 shadow-md mt-[4.2rem] mr-4 z-[1]`}
            >
                {/* Popup content goes here */}
                <div
                    className="flex px-4 py-1  pr-11 gap-4 items-center cursor-pointer hover:!bg-logistical-gray-ver5"
                    onClick={() => {
                        funcProfile()
                        setCloseUserMenu()
                    }}
                >
                    <i className="ri-user-line"></i>
                    Profile
                </div>
                <div
                    className="flex px-4 py-1 gap-4 items-center cursor-pointer hover:!bg-logistical-gray-ver5"
                    onClick={() => {
                        funcLogout()
                        setCloseUserMenu()
                    }}
                >
                    <i className="ri-logout-box-r-line"></i>
                    Logout
                </div>
            </div>
        </>
    )
}
