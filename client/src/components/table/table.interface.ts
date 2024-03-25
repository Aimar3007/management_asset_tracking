/* eslint-disable no-unused-vars */
import { IPagination } from 'components/pagination/pagination.interface'

export interface ITableColumn<T = {}> {
    label: string
    accessor: keyof T
    exportColumn?: boolean // default true
    customBuild?: (
        data: string | number,
        rowData?: T,
    ) => React.ReactElement | string
}

export interface ITableFilter {
    accessor: string
    value: string
}

export interface ITable<T = {}> extends IPagination {
    data: T[]
    headers: ITableColumn<T>[]
    loading: boolean
    moduleTitle: string
    onRowClick?: (data: T) => void
    onTableFilter?: (filter: ITableFilter) => void
    containerClassname?: string

    actionComponent?: (data: T) => JSX.Element
}

// export interface IUseTable<T>
//     extends Pick<
//         ITable<T>,
//         | 'data'
//         | 'headers'
//         | 'checkboxVisible'
//         | 'checkboxDataHandling'
//         | 'tabFilterItem'
//         | 'resetCheckedInitialValue'
//     > {}
