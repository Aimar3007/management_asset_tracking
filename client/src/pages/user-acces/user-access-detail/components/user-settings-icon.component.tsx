import { useEffect, useRef, useState } from 'react'

export interface IUserSettingIcon {
    isActive: boolean
    suspendFunction: () => void
}
export const UserSettingIcon = ({ ...props }: IUserSettingIcon) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const menuRef = useRef<HTMLDivElement>(null)
    const option1Label = !props.isActive ? 'Unsuspend User' : 'Suspend User'
    const option1LabelClass = !props.isActive
        ? 'text-logistical-green-dark'
        : 'text-logistical-red-ver1 '

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative inline-block text-gray-700" ref={menuRef}>
            <button onClick={toggleMenu}>
                <i className="ri-more-2-line"></i>
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    {/* Your menu items go here */}
                    <div className="py-1">
                        <button
                            onClick={() => {
                                props.suspendFunction()
                            }}
                            className={`block px-4 py-2 text-left text-sm hover:bg-gray-100 w-full ${option1LabelClass}`}
                        >
                            {option1Label}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
