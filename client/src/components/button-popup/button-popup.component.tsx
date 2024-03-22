import Button from 'components/button/button.component'
import { useButtonPopup } from './button-popup.service'
import { IButtonPopup } from './button-popup.interface'

const ButtonPopUp = ({ items }: IButtonPopup) => {
    const { dropdownRef, isDropdownVisible, toggleDropdown } = useButtonPopup()
    return (
        <div className="relative ">
            {/* Floating Div */}
            {isDropdownVisible && (
                <div
                    ref={dropdownRef}
                    className="absolute bottom-full right-0 bg-white !border-2 container-border text-size-S w-[200px]  mb-2  gap-3"
                >
                    {items.map((data) => {
                        return (
                            <div className="p-2 hover:bg-logistical-gray-ver5 cursor-pointer">
                                <i className={`ri-${data.icon} mr-2`} />
                                {data.label}
                            </div>
                        )
                    })}
                </div>
            )}

            <Button
                label="Attach To"
                iconSuffix="ri-arrow-up-s-line"
                variant={'logistical-lightblue'}
                button-id="dropdownTopButton"
                data-dropdown-toggle="dropdownTop"
                data-dropdown-placement="top"
                type="button"
                onClick={toggleDropdown}
            />
        </div>
    )
}

export default ButtonPopUp
