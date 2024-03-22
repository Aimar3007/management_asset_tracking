import { useEffect, useState } from 'react'
import { IUseTable } from './table.interface'

export function useTable<T>({
    data,
    headers,
    checkboxVisible,
    checkboxDataHandling,
    tabFilterItem,
    resetCheckedInitialValue,
}: IUseTable<T>) {
    // initial
    const [sortBy, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [generatedData, setGeneratedData] = useState<T[]>([])
    const [checkedData, setCheckedData] = useState<T[]>([])

    // useEffect ---------------------------------------------------------------
    useEffect(() => {
        if (!tabFilterItem) {
            return
        }
        setGeneratedData(generateData(generatedData))
    }, [])

    useEffect(() => {
        setGeneratedData(generateData(data))
    }, [data])

    useEffect(() => {
        setCheckedData(resetCheckedInitialValue ?? [])
    }, [resetCheckedInitialValue])
    // End useEffect -----------------------------------------------------------

    // additional function -----------------------------------------------------
    function generateData(dt: T[]) {
        if ((typeof dt === 'object' && !Array.isArray(dt)) || !dt) {
            return []
        }

        let dt_: T[] = dt

        if (tabFilterItem) {
            if (tabFilterItem.value === 'all') {
                dt_ = data.filter((d: any) => {
                    return d
                })
            } else {
                dt_ = data.filter((d: any) => {
                    if (d[tabFilterItem.key] === tabFilterItem.value) {
                        return d
                    }
                })
            }
        }

        if (checkboxVisible) {
            dt_ = dt_.map((dt__: any) => {
                const newObj = Object.assign({ selected: false }, dt__)
                return newObj
            })
        }
        return dt_
    }

    function setSortColumn(accessor: string, isAscending: boolean) {
        const sortOrder = !isAscending ? 'asc' : 'desc'
        let sortedData: T[] = []
        setSortOrder(sortOrder)
        setSortBy(accessor)

        if (!isAscending) {
            sortedData = generatedData.sort((a: any, b: any) => {
                return a[accessor] > b[accessor] ? 1 : -1
            })
        } else {
            sortedData = generatedData.sort((a: any, b: any) => {
                return a[accessor] < b[accessor] ? 1 : -1
            })
        }
        setGeneratedData(sortedData)
    }

    function checkboxAllHandling(isChecked: boolean) {
        let checkedData_: T[] = []
        let generatedData_: T[] = []
        if (isChecked) {
            generatedData_ = generatedData.map((dt: any) => {
                return { ...dt, selected: true }
            })
            checkedData_ = generatedData.map((dt: any) => {
                // eslint-disable-next-line no-unused-vars
                const { selected, ...values } = dt
                return values
            })
        } else {
            generatedData_ = generatedData.map((dt: any) => {
                return { ...dt, selected: false }
            })
        }
        setCheckedData(checkedData_)
        setGeneratedData(generatedData_)
        checkboxDataHandling && checkboxDataHandling(checkedData_ as T[])
    }

    function checkboxSingleHandling(
        isChecked: boolean,
        data: any,
        index: number,
    ) {
        let checkedData_ = [...checkedData]
        let generatedData_ = [...generatedData]

        if (isChecked) {
            generatedData_[index] = { ...data, selected: true }
            setGeneratedData(generatedData_)

            const { ...values } = data
            checkedData_.push(values)
        } else {
            generatedData_[index] = { ...data, selected: false }
            setGeneratedData(generatedData_)
            const idx = checkedData_.findIndex((d: any) => d?.id === data?.id)
            checkedData_.splice(idx, 1)
        }
        setCheckedData(checkedData_)
        checkboxDataHandling && checkboxDataHandling(checkedData_ as T[])
    }

    // end function -------------------------------------------------

    // return function or variable
    const generatedHeaders = headers
    return {
        generatedData,
        generatedHeaders,
        sortBy,
        sortOrder,
        setSortColumn,
        checkboxSingleHandling,
        checkboxAllHandling,
        checkedData,
    }
}
