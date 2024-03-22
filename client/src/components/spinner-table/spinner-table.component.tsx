/* eslint-disable jsx-a11y/alt-text */
// import { Spinner } from 'flowbite-react'
import './spinner-table.style.css'
import { ISpinnerTable } from './spinner-table.interface'
import loadingImage from '../../assets/gif/LOADING-MLS-GRAY.gif'

export default function SpinnerTable({ message, className }: ISpinnerTable) {
    return (
        <div className={`spinner-container flex-col gap-4 ${className}`}>
            <img src={loadingImage} className="w-20 h-20" />
            <p>{message}</p>
        </div>
    )
}
