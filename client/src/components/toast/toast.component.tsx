import React from 'react'
import { ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast.style.css'
import { ToastProps } from './toast.interface'

const CustomToast: React.FC<ToastProps> = ({ header, message }) => {
    return (
        <div className={`flex ml-3 pl-3 py-2 bg-white text-gray-700 `}>
            {/* You can add your custom content here */}
            <div>
                <div className=" font-bold text-size-M">
                    <span>{header}</span>
                </div>
                <div className="!text-size-xs">
                    <span>
                        {message.split('\n').map((str) => (
                            <p>{str}</p>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}

export const Toast = ({ header, message, type }: ToastProps) => {
    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#07bc0c' // Green for success
            case 'error':
                return '#e74c3c' // Red for error
            case 'info':
                return '#3498db' // Blue for info
            case 'warning':
                return '#f1c40f' // Yellow for warning
            default:
                return '#343a40' // Default background color
        }
    }

    const toastOptions: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyStyle: {
            backgroundColor: getBackgroundColor(),
        },
        closeButton: false,
    }

    switch (type) {
        case 'success':
            toast.success(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        case 'error':
            toast.error(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        case 'info':
            toast.info(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        case 'warning':
            toast.warning(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        case 'default':
            toast(
                <CustomToast header={header} message={message} type={type} />,
                toastOptions,
            )
            break
        default:
            break
    }
}
