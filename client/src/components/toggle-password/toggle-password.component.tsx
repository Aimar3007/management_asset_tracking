import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ITogglePasswordButton } from './toggle-password.interface'

const TogglePassword = ({
    isPasswordVisible,
    toggleVisibility,
}: ITogglePasswordButton) => {
    return (
        <button
            type="button"
            className="bg-light-green absolute inset-y-0 right-0 text-size-XL rounded-[4px] w-[40px] justify-items-center"
            onClick={toggleVisibility}
        >
            {isPasswordVisible ? (
                <AiOutlineEye className="text-green align-middle justify-center mx-auto" />
            ) : (
                <AiOutlineEyeInvisible className="text-green align-middle justify-center mx-auto" />
            )}
        </button>
    )
}

export default TogglePassword
