import { useEffect, useState } from 'react'
import { ITableExpandable } from './table-expandable.interface'
import { ITableColumn } from 'components/table/table.interface'

export function useTableExpandable<T, D>({
    data,
    headerChild,
    headerParent,
    childAccessor,
}: ITableExpandable<T, D>) {
    const [header, setHeader] = useState<ITableColumn<T>[]>([])

    //remove child accessor in header
    useEffect(() => {
        const dt = headerParent.filter((d) => {
            if (d.accessor === childAccessor) return false
            return true
        })
        const expandableColumn: ITableColumn = {
            accessor: 'expandable-button-icon', // initial to skip in rows
            showLabel: false,
            label: '',
        }

        setHeader([expandableColumn, ...dt] as unknown as ITableColumn<T>[])
    }, [])
    return {
        childAccessor,
        data,
        headerChild,
        headerParent,
        header,
    }
}
