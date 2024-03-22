import { ITableColumn } from 'components/table/table.interface'

export interface ITableExpandableRow<T, D> {
    data: T
    index: number
    headerParent: ITableColumn<T>[]
    headerChild: ITableColumn<D>[]
    childAccessor: string
    highlightOnExpand?: boolean
    addChildRowHandling?: () => void
}
