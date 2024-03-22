/* eslint-disable no-unused-vars */
import { IUseModal } from 'components/modal/modal.service'
import { IPagination } from 'components/pagination/pagination.interface'
import { ITabItem } from 'components/tab/tab.interface'

export interface ITableColumn<T = {}> {
    label: string
    accessor: string
    sort?: boolean // default true
    showLabel?: boolean // default true
    exportColumn?: boolean // default true
    customBuild?: (
        data: string,
        rowData?: T,
        additionalData1?: any,
        additionalData2?: any,
    ) => React.ReactElement | string
    customHeader?: () => React.ReactElement | string
    headerClassName?: string
    className?: string
    ellipsis?: boolean
    width?: number
    minWidth?: number
    height?: number
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
    checkboxVisible?: boolean
    checkboxDataHandling?: (data: T[]) => void
    tabFilterItem?: ITabItem
    additionalButtonBottom?: JSX.Element
    enableExport?: boolean
    containerClassname?: string
    resetCheckedInitialValue?: T[]

    // generate report
    modalService?: IUseModal | any
    resetFilter?: () => void
    components?: JSX.Element
    getDataGenerate?: any
    generateReportData?: any
    GenerateReportHeaders?: any
    removeFilter?: any

    // refactor
    
}

export interface IUseTable<T>
    extends Pick<
        ITable<T>,
        | 'data'
        | 'headers'
        | 'checkboxVisible'
        | 'checkboxDataHandling'
        | 'tabFilterItem'
        | 'resetCheckedInitialValue'
    > {}

export interface IPoGenerateReportModal<T>
    extends Pick<
        ITable<T>,
        | 'data'
        | 'headers'
        | 'moduleTitle'
        | 'components'
        | 'resetFilter'
        | 'modalService'
        | 'getDataGenerate'
        | 'generateReportData'
        | 'GenerateReportHeaders'
        | 'removeFilter'
    > {
    exportType: 'pdf' | 'xlxs'
}
