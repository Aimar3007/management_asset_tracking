import { useEffect, useState } from 'react'
import { ITableExpandableRow } from './table-expandable-row.interface'

export function useTableExpandableRow<T, D>({
    data,
    ...props
}: ITableExpandableRow<T, D>) {
    const [isExpand, setIsExpand] = useState<boolean>(false)
    const childData: [] = (data as any)[props.childAccessor] ?? []
    const [currentChildLength, setCurrentChildLength] = useState<number>(
        childData.length,
    )

    // handling expand if new data was added
    useEffect(() => {
        if (childData.length > currentChildLength) {
            setIsExpand(true)
        }
        setCurrentChildLength(childData.length)
    }, [childData.length])

    // when delete
    useEffect(() => {
        if (childData.length > currentChildLength) {
            setIsExpand(true)
        }
        setCurrentChildLength(childData.length)
    }, [childData.length])

    return {
        data,
        isExpand,
        childData,
        setIsExpand,
    }
}
