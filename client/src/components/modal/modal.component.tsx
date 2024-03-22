const Modal = ({
    children,
    isModalOpen,
    className,
}: {
    isModalOpen: boolean
    children: React.ReactElement
    className?: string
}) => {
    return (
        <div
            className={`z-[999999] fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity ${
                isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className={`bg-white p-4 rounded w-3/4 ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Modal
