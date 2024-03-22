import { IBreadCrumbButton } from './bread-crumb.interface'

export default function BreadCrumbButton({
    onClick,
    className,
    name,
}: IBreadCrumbButton): React.ReactElement {
    return (
        <button onClick={onClick}>
            {className && <i className={className}></i>}
            {name}
        </button>
    )
}
