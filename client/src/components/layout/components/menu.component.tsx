import { IMenu, IRoute } from 'common/common.interface'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import MenuHover from './menu-hover.component'
import { isAccessible } from 'common/common.service'

export default function Menu({
    action,
    path,
    showName,
    icon,
    text,
    expandable,
    sub,
    isSubMenu,
    openSideBar,
}: IMenu & IRoute) {
    const [isHover, setIsHover] = useState(false)
    const [expand, setExpand] = useState(false)
    const location = useLocation()
    const currentURL = location.pathname
    // is module active?
    const active = currentURL?.includes(path)
    // is sub module active
    const isSubActive = !sub?.map
        ? false
        : sub.find((x) => currentURL?.includes(x.path))
          ? true
          : false
    const expandableBorder = expandable && expand ? ' border-[#dee1ed]' : ''
    const subMenuSpacingClass = isSubMenu ? '' : 'mb-2'
    const cIcon = isSubMenu ? `ri-circle-${active ? 'fill' : 'line'}` : icon
    const sideMenuHeight = isSubMenu
        ? 'min-h-[30px] text-[10px]'
        : 'min-h-[40px] text-[18px]'
    const subMenuIconClass = isSubMenu ? '!text-[10px]' : ''

    // active class or hover --------------------------------------------------------
    const textClass =
        isHover || active ? 'text-white' : 'text-logistical-gray-ver8'
    const divClass = isHover || active ? 'bg-green' : ''
    const divClassRelatedWithSub =
        isSubActive && !expand ? '!bg-logistical-blue !text-white' : ''
    const textClassRelatedWithSub = isSubActive && !expand ? 'text-white' : ''
    // smooth animation sidebar ------------------------------------------------------

    const [showMenuNameClass, setShowMenuClass] = useState(
        showName ? '' : 'hide',
    )

    const [iconDisplay, setIconDisplay] = useState('')

    useEffect(() => {
        if (showName) {
            setShowMenuClass('')
            setIconDisplay(`flex justify-start pr-3 pl-3  `)
            return
        }
        setShowMenuClass('hide')

        const cls =
            'flex w-full transform transition-all  translate-x-[25%]  duration-[2s]'
        setIconDisplay(cls)
        setTimeout(() => {
            setIconDisplay(cls + `   `)
        }, 500)
    }, [showName])

    // end smooth animation side bar  ------------------------------------------------------

    const onClickHandler = () => {
        if (expandable) {
            if (!expand) {
                setExpand((c) => !c)
            }
            openSideBar && !showName && openSideBar()
        } else {
            action(path)
        }
    }

    useEffect(() => {
        if (!showName) {
            setExpand(false)
        }
    }, [showName])

    useEffect(() => {
        if (!active && !isSubActive && sub) {
            setExpand(false)
        }
    }, [active, isSubActive])

    return (
        <div
            onClick={onClickHandler}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`cursor-pointer w-full flex select-none flex-col justify-center items-center  ${subMenuSpacingClass} last:mb-0`}
        >
            <MenuHover show={isHover && !showName} text={text} />
            <div
                className={` w-full transition-all duration-200 flex items-center rounded-[0.5rem] ${divClassRelatedWithSub} ${divClass} ${expandableBorder}`}
            >
                <div
                    className={`items-center ${iconDisplay} ${sideMenuHeight}`}
                >
                    <i
                        className={`cursor-pointer ${subMenuIconClass} ${textClass} ${cIcon} ${textClassRelatedWithSub}`}
                    />
                </div>

                <div
                    className={`${showMenuNameClass} ${textClassRelatedWithSub} ${textClass} transition-all duration-200 text-[15px] font-[400] tracking-tight text-animation whitespace-nowrap`}
                >
                    {text}
                </div>
            </div>

            <div
                className={`${
                    expand ? 'max-h-[150px] ' : 'max-h-[0px] invisible'
                } ${sub ? 'mt-1' : ''} transform duration-[0.5s] w-full z-50 overflow-hidden`}
            >
                {sub
                    ?.filter((d) => isAccessible(d.client))
                    .filter(
                        (route) =>
                            route.show === true && isAccessible(route.client),
                    )
                    .map((child, idx) => (
                        <Menu
                            key={idx}
                            index={idx}
                            active={currentURL?.includes(child.path)}
                            showName={true}
                            action={action}
                            {...child}
                            isSubMenu={true}
                        />
                    ))}
            </div>
        </div>
    )
}
