import './circleBadge.style.css'

const CircleBadge = ({ variant, className }: any) => {
    return (
        <span
            className={`inline-block h-2 w-2 rounded-full ${variant} ${className} `}
        ></span>
    )
}

export default CircleBadge
