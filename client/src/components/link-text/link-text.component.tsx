import { ILinkText } from './link-text.interface'

const LinkText = ({ label, onClick }: ILinkText) => {
    return (
        <p
            onClick={() => {
                onClick()
            }}
            className="text-logistical-blue-ver3 font-bold cursor-pointer text-[14px] w-full"
        >
            {label}
        </p>
    )
}

export default LinkText
