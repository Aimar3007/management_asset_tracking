import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setClassNames } from 'store/slice'

export interface IUseModal {
    isModalOpen: boolean
    openModalHandling: () => void
    closeModalHandling: () => void
    toggleModalHandling: () => void
}
export const useModal = (): IUseModal => {
    const dispatch = useDispatch()

    const [isModalOpen, setModalOpen] = useState(false)

    const openModalHandling = () => setModalOpen(true)
    const closeModalHandling = () => setModalOpen(false)
    const toggleModalHandling = () => setModalOpen(!isModalOpen)

    useEffect(() => {
        const className = isModalOpen ? 'z-[1]' : 'z-[2]'
        if (className) dispatch(setClassNames(className))
    }, [isModalOpen])

    return {
        isModalOpen,
        openModalHandling,
        closeModalHandling,
        toggleModalHandling,
    }
}
