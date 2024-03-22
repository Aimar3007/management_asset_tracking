import './spinner.style.css'
const Spinner = ({ label }: { label?: string }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="loader mb-3"></div>
            {!label ? (
                <></>
            ) : (
                <div className="text-size-M text-logistical-gray-ver8">
                    {label}
                </div>
            )}
        </div>
    )
}

export default Spinner
