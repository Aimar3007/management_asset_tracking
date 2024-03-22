/* eslint-disable jsx-a11y/alt-text */
import { IEmptyResult } from './empty-result.interface'
import emptyImage from '../../assets/img/gallery/NotFound.png'

export default function EmptyResult({ message, className }: IEmptyResult) {
    return (
        <div
            className={`h-full flex flex-col justify-center items-center bg-white gap-4 ${className}`}
        >
            <img src={emptyImage} className="w-[8rem] h-[11rem]" />
            <p>{message}</p>
        </div>
    )
}
