import { ITableColumn } from 'components/table/table.interface'

export interface ITableExpandable<T = {}, D = {}> {
    data: T[]
    headerParent: ITableColumn<T>[]
    headerChild: ITableColumn<D>[]
    childAccessor: string
    notFoundMessage?: string
    highlightOnExpand?: boolean
    // eslint-disable-next-line no-unused-vars
    addChildRowHandling?: (value: string) => void
}
