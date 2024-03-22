interface IMenuHover {
    text: string
    show: boolean
}

export default function MenuHover({ text = '', show = false }: IMenuHover) {
    const showClass = show
        ? ' opacity-100 visible duration-500'
        : 'opacity-0 invisible -mt-10'
    return (
        <div
            className={`${showClass} sm:hidden block absolute text-sm whitespace-nowrap shadow-[0_5px_10px_rgba(0,0,0,0.3)] left-0 ml-[82px] bg-[#50546D] text-white rounded-[4px] px-3 p-2 `}
        >
            {text}
        </div>
    )
}
