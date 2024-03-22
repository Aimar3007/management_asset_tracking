import React from 'react'

interface IAvatarCircle {
    name: string
    size?: number
}

const AvatarCircle = ({ name, size }: IAvatarCircle) => {
    const getInitials = (name: string): string => {
        const words = name.split(' ')
        return words
            .map((word) => word[0])
            .join('')
            .toUpperCase()
    }

    const initials = getInitials(name)
    const circleSize = !size ? 'w-8 h-8' : ''

    return (
        <div
            className={`flex items-center justify-center bg-gray-400 rounded-full ${circleSize}`}
            style={{ height: size, width: size }}
        >
            <span className="text-white text-size-S font-semibold ml-[0.9px] mt-1">
                {initials}
            </span>
        </div>
    )
}

export default AvatarCircle
