import { IRoute } from 'common/common.interface'
import { routes } from 'common/common.static'
import { IBreadcrumbButton, IBreadcrumbSearch } from './bread-crumb.interface'
// import { useDispatch } from 'react-redux'
// import { setFilterSearchUser } from 'pages/user-acces/user-access.slice'

const breadCrumbButtonName: IBreadcrumbButton[] = [
    {
        label: 'CREATE USER',
        linkIncluded: ['/user', '/user/user-detail'],
        link: 'user/create',
    },
    {
        label: 'CREATE BOOKING',
        linkIncluded: ['/bookings'],
        link: 'create-booking',
    },
    {
        label: 'CREATE SHIPMENT',
        linkIncluded: ['/shipments'],
        link: 'create-shipment',
    },
]

const breadCrumbSearch: IBreadcrumbSearch[] = [
    {
        linkIncluded: ['/user'],
        placeholder: 'Enter Keyword to search',
    },
]

const flattenArray = (inputArray: IRoute[]) => {
    let flattedArray: IRoute[] = []

    inputArray.forEach((item) => {
        flattedArray.push(item)

        if (item.sub && item.sub.length > 0) {
            flattedArray.push(...item.sub)
        }
    })
    return flattedArray
}

export const useBreadCrumb = (currentPath: string) => {
    // const dispatch = useDispatch()
    const flattedArray = flattenArray(routes)
    const emptyRoute: IRoute = { path: 'unknown', text: 'unknown' }

    if (currentPath !== '/') {
        flattedArray.shift()
    }
    const singleRoute = flattedArray.find((data) => {
        const x = data.path.replace('/:id', '')
        const isPathSame = currentPath.includes(x)
        if (isPathSame) {
            return true
        }
        return false
    })

    const route = singleRoute ?? emptyRoute

    // button & search visibility
    const buttonCreate = breadCrumbButtonName.find((x) =>
        x.linkIncluded.includes(currentPath),
    )
    const searchBar = breadCrumbSearch.find((x) =>
        x.linkIncluded.includes(currentPath),
    )

    // Search Function
    let searchFunction = (searchString: string | null) => {
        console.log(searchString)
    }
    // if (route.path === 'user') {
    //     searchFunction = (searchString) => {
    //         dispatch(setFilterSearchUser(searchString ?? ''))
    //     }
    // }

    return { route, buttonCreate, searchBar, searchFunction }
}
