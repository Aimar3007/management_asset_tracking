import { useEffect, useRef, useState } from 'react'

export function pickerDropdownBehaviour(selected: string) {
    const [expand, setExpand] = useState(false)

    const expandHandler = (value?: boolean) => {
        setExpand((s) => value ?? !s)
    }

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as HTMLDivElement)
            ) {
                setExpand(false)
                selected && isSelectedHandler(true)
            }
        }
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setExpand(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [])

    const [isSelected, setIsSelected] = useState(false)
    const isSelectedHandler = (value?: boolean) => {
        setIsSelected((val) => value ?? !val)
    }

    return {
        expand,
        expandHandler,
        dropdownRef,
        isSelectedHandler,
        isSelected,
    }
}
