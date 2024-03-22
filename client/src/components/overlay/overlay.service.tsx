import { useState } from 'react'

export interface IUseOverlay {
    isOverlayOpen: boolean
    openOverlayHandling: () => void
    closeOverlayHandling: () => void
    toggleOverlayHandling: () => void
}

const useOverlay = (): IUseOverlay => {
    const [isOverlayOpen, setOverlayOpen] = useState<boolean>(false)

    const openOverlayHandling = () => setOverlayOpen(true)
    const closeOverlayHandling = () => setOverlayOpen(false)
    const toggleOverlayHandling = () => setOverlayOpen(!isOverlayOpen)

    return {
        openOverlayHandling,
        closeOverlayHandling,
        toggleOverlayHandling,
        isOverlayOpen,
    }
}

export default useOverlay
