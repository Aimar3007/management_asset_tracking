const Overlay = ({
    children,
    isOverlayOpen,
    className,
}: {
    isOverlayOpen: boolean
    children: React.ReactElement
    className?: string
}) => {
    const mobileClass = ' sm:w-auto'
    return (
        <div
            className={`${className} overlay box-shadow fixed border rounded-logistical-radius mt-1 p-3 w-[400px] transition-all ease-out bg-white z-[1] right-[30px] ${mobileClass} ${isOverlayOpen ? '' : 'hidden'}`}
        >
            {children}
        </div>
    )
}

export default Overlay
