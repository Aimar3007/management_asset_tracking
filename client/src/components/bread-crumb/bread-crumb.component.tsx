import { IBreadCrumb } from './bread-crumb.interface'
import './bread-crumb.style.css'
import { useLocation } from 'react-router-dom'
import { useBreadCrumb } from './bread-crumb.service'

const BreadCrumb = ({ paths }: IBreadCrumb) => {
    const location = useLocation()
    const currentPath = paths?.length === 0 ? '/' : location.pathname

    const { route } = useBreadCrumb(currentPath)

    return (
        <div className="bread-crumb flex items-center">
            <div className=" font-bold text-logistical-grey-ver8">
                {route.text}
            </div>
        </div>
    )
}

export default BreadCrumb
