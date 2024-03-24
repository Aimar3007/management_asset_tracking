/* eslint-disable no-unused-vars */
import { ITable } from './table.interface'
import SpinnerTable from 'components/spinner-table/spinner-table.component'
import Pagination from 'components/pagination/pagination.component'
import './table.style.css'
// import SortButton from './component/sort-button.component'
// import { useTable } from './table.service'
// import Checkbox from 'components/checkbox/checkbox.component'
// import Button from 'components/button/button.component'
import EmptyResult from 'components/empty-result/empty-result.component'
// import PoGenerateReportModal from './component/po-generate-report-modal.component'

function Table<T>({ ...props }: ITable<T>) {
    const loadingMessage = `loading ${props.moduleTitle} Data . . .`
    const notFoundMessage = `No data found`

    return (
        <>
            <div className="h-full flex flex-col overflow-auto">
                <div className={`flex-1 ${props.containerClassname}`}>
                    {props.loading === true ? (
                        <SpinnerTable message={loadingMessage} />
                    ) : props?.data?.length <= 0 ? (
                        <EmptyResult message={notFoundMessage} />
                    ) : (
                        <table
                            className="table-master table-auto"
                            id="table-master"
                        >
                            <thead className="thead-master">
                                <tr className="tr-master">
                                    {props?.headers.map((data, idx) => {
                                        return (
                                            <th
                                                key={'header-' + idx}
                                                className={`th-master`}
                                            >
                                                <div
                                                    key={
                                                        data.accessor as string
                                                    }
                                                >
                                                    {data.label}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {props?.data.map((row: any, idx) => {
                                    const selectedClass =
                                        row['selected'] === true
                                            ? 'tr-selected'
                                            : ''
                                    const cursor = props.onRowClick
                                        ? 'cursor-pointer'
                                        : ''

                                    return (
                                        <tr
                                            key={'row-' + idx}
                                            className={`${selectedClass} ${cursor} tr-master`}
                                        >
                                            {props.headers.map((col, idx) => {
                                                const accessor =
                                                    col.accessor as string
                                                let data: any = null
                                                if (accessor.includes('.')) {
                                                    const accessorArray =
                                                        accessor.split('.')
                                                    data = row
                                                    for (const key of accessorArray) {
                                                        data = data?.[key]
                                                    }
                                                } else {
                                                    data = row[accessor]
                                                }

                                                return (
                                                    <td
                                                        className={`td-master`}
                                                        key={'col-' + idx}
                                                        onClick={() => {
                                                            const {
                                                                selected,
                                                                ...values
                                                            } = row
                                                            props.onRowClick &&
                                                                props.onRowClick(
                                                                    values,
                                                                )
                                                        }}
                                                    >
                                                        <div>
                                                            {!col.customBuild
                                                                ? data !== ''
                                                                    ? data
                                                                    : '-'
                                                                : col.customBuild(
                                                                      data,
                                                                      row,
                                                                  )}
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="border-t border-logistical-gray-ver3 flex justify-between">
                <Pagination
                    meta={props.meta}
                    previousHandling={(page) => {
                        props.previousHandling(page)
                    }}
                    nextHandling={(page) => {
                        props.nextHandling(page)
                    }}
                />
            </div>
        </>
    )
}

export default Table
