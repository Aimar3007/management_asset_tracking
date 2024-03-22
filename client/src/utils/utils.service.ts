/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs'

export const mapPath = (path: string) => {
    if (typeof path !== 'string') return []
    const pathArray = path.split('/')?.filter((data) => data)
    return pathArray
}

export const parseDateString = (dateString: Date) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return {
        day,
        month,
        year,
    }
}

export const parseDateToString = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day)

    return date
}

export const parseKeyName = (key: string) => {
    if (key === 'orderType') return 'Order Type'
    else if (key === 'orderDate') return 'Order Date'
    else if (key === 'dateReceived') return 'Date Received'
    else if (key === 'dateReleased') return 'Date Released'
    else if (key === 'dateCompleted') return 'Date Completed'
    else return key
}

export const mapFilter = (props: any) => {
    const deliveryDate = 'deliveryDate'
    const dateReceived = 'dateReceived'
    const dateReleased = 'dateReleased'
    const dateCompleted = 'dateCompleted'
    const orderDate = 'orderDate'
    const startDate = 'startDate'
    const endDate = 'endDate'

    const filter: any = {
        startDateReleased: '',
        endDateReleased: '',

        startDateCompleted: '',
        endDateCompleted: '',

        startDeliveryDate: '',
        endDeliveryDate: '',

        startDateReceived: '',
        endDateReceived: '',

        search: '',

        filterType: '',
        startDate: '',
        endDate: '',

        site: '',
        client: '',
        status: '',
        orderType: '',
        task: '',
        customerOrderRef: '',
        product: '',
        page: 1,
    }

    for (const key in props) {
        if (key === deliveryDate) {
            filter.startDeliveryDate = dayjs(
                props[deliveryDate]?.dateFrom?.value,
            ).format('YYYY-MM-DD')
            filter.endDeliveryDate = dayjs(
                props[deliveryDate]?.dateTo?.value,
            ).format('YYYY-MM-DD')
        } else if (key === dateReceived) {
            filter.startDateReceived = dayjs(
                props[dateReceived]?.dateFrom?.value,
            ).format('YYYY-MM-DD')
            filter.endDateReceived = dayjs(
                props[dateReceived]?.dateTo?.value,
            ).format('YYYY-MM-DD')
        } else if (key === dateReleased) {
            filter.startDateReleased = dayjs(
                props[dateReleased]?.dateFrom?.value,
            ).format('YYYY-MM-DD')
            filter.endDateReleased = dayjs(
                props[dateReleased]?.dateTo?.value,
            ).format('YYYY-MM-DD')
        } else if (key === dateCompleted) {
            filter.startDateCompleted = dayjs(
                props[dateCompleted]?.dateFrom?.value,
            ).format('YYYY-MM-DD')
            filter.endDateCompleted = dayjs(
                props[dateCompleted]?.dateTo?.value,
            ).format('YYYY-MM-DD')
        } else if (key === orderDate) {
            filter.startDeliveryDate = dayjs(
                props[orderDate]?.dateFrom?.value,
            ).format('YYYY-MM-DD')
            filter.endDeliveryDate = dayjs(
                props[orderDate]?.dateTo?.value,
            ).format('YYYY-MM-DD')
        } else if (key === startDate) {
            filter.startDate = dayjs(props[startDate]?.value).format(
                'YYYY-MM-DD',
            )
        } else if (key === endDate) {
            filter.endDate = dayjs(props[endDate]?.value).format('YYYY-MM-DD')
        } else if (key === 'search') {
            filter.search = props[key] ?? ''
        } else if (key in props && 'value' in props[key]) {
            filter[key] = props[key].value ?? ''
        }
    }

    return filter
}

export const isEmpty = (value: string) => {
    return !value ? '-' : value
}

export const encodeParams = (param: any) => {
    if (!param) return ''
    return param?.replace('/', '*')
}

export const decodeParams = (param: any) => {
    if (!param) return ''
    return param?.replace('*', '/')
}
