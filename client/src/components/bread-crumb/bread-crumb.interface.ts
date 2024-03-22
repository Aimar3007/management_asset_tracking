export interface IBreadCrumbButton {
    onClick?: () => void
    name: string
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
}

export interface IBreadCrumb {
    // eslint-disable-next-line no-unused-vars
    action: (path: string) => void
    paths: string[]
}

export interface IBreadcrumbButton {
    label: string
    linkIncluded: string[]
    link: string
}

export interface IBreadcrumbSearch {
    placeholder: string
    linkIncluded: string[]
}
