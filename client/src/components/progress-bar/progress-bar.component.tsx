import { IProgressBarProps } from './progress-bar.interface'
import './progress-bar.style.css'

const ProgressBar: React.FC<IProgressBarProps> = ({
    total,
    current,
    returned = 0,
    variant,
    icon,
}) => {
    const completedProgress = (current / total) * 100
    const remaining = total - current
    const isFull = completedProgress >= 100

    return (
        <div className={`progress-bar progress-bar-${variant} `}>
            {/* Show Current Data  */}
            <div className="min-w-[24px] flex flex-row-reverse mr-2">
                {variant === 'outline-blue' ? `` : `${current}`}
            </div>

            {/* Background Bar */}
            <div
                className={`  rounded flex-1 bg-bar min-w-[150px] max-w-[150px]`}
            >
                {/* Outline */}
                <div className={` h-5 rounded overflow-hidden border-bar`}>
                    {/* Progress Bar */}
                    <div
                        className={`bg-progress  top-0 left-0  h-full transition-width duration-500 ease-in-out`}
                        style={{
                            width: `${completedProgress}%`,
                        }}
                    >
                        {/* Completed Logo */}
                        {isFull && (
                            <div className="flex w-full h-full items-center justify-center z-10">
                                <i className={`${icon}`}></i>
                            </div>
                        )}
                    </div>
                    {variant === 'outline-green' && (
                        /* Returned Progress Bar */
                        <div
                            className={` top-0 left-0  h-full transition-width duration-500 ease-in-out bg-logistical-red-ver2`}
                            style={{
                                width: `${returned}%`,

                                marginLeft: `${completedProgress}%`,
                            }}
                        ></div>
                    )}
                </div>
            </div>

            {/* Show Remaining Data  */}
            <div className="ml-2 flex flex-row-reverse">
                {' '}
                {variant === 'outline-blue'
                    ? `${current}/${total}`
                    : variant === 'outline-green'
                      ? `${returned}`
                      : `${remaining}`}
            </div>
        </div>
    )
}

export default ProgressBar
