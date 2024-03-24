import Button from 'components/button/button.component'
import { ISimpleTable } from './simple-table.interface'
import './simple-table.style.css'
import SpinnerTable from 'components/spinner-table/spinner-table.component'
import EmptyResult from 'components/empty-result/empty-result.component'

function SimpleTable<T>({
    headers,
    data,
    variant = 'white',
    isAddRow = false,
    ...props
}: ISimpleTable<T>) {
    const headerHover = props.headerHover ? 'hover:bg-gray-200' : ''
    const disableLastRowHover = props.disableLastRowHover
        ? 'hover:!bg-white'
        : ''
    const cursorClass = props.onRowClick ? 'cursor-pointer' : ''
    const loadingMessage = `loading Data . . .`
    const notFoundMessage = `No data found`

    return (
        <div
            className={`simple-table-container h-full w-full flex flex-col overflow-auto variant-${variant}`}
        >
            {props.loading === true ? (
                <div className="h-full">
                    <SpinnerTable className="w-full" message={loadingMessage} />
                </div>
            ) : data.length <= 0 && !isAddRow ? (
                <div className="h-full">
                    <EmptyResult className="w-full" message={notFoundMessage} />
                </div>
            ) : (
                <table className="simple-table table-auto">
                    <thead>
                        <tr className={`${headerHover} `}>
                            {headers.map((column, idx) => {
                                return (
                                    <th className="bg-white" key={idx}>
                                        {column.customHeader
                                            ? column.customHeader()
                                            : column.label}
                                    </th>
                                )
                            })}
                            {props.enableActionButton && (
                                <th className="bg-white">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="" id="table-body">
                        {data.map((row: any, idx2) => {
                            const hoverLastIndex =
                                idx2 + 1 === data.length
                                    ? disableLastRowHover
                                    : ''
                            return (
                                <tr
                                    key={idx2}
                                    className={`${hoverLastIndex} ${cursorClass}`}
                                    onClick={() => {
                                        if (props.onRowClick) {
                                            props.onRowClick(row)
                                        }
                                    }}
                                >
                                    {headers.map((column, idx3) => {
                                        return (
                                            <td
                                                key={`${idx3}-${column.accessor as string}`}
                                            >
                                                <div
                                                    className={`${column?.isTextValue ? 'max-w-[200px] overflow-hidden text-ellipsis' : ''}`}
                                                >
                                                    {column.customBuild
                                                        ? column.customBuild(
                                                              row[
                                                                  column
                                                                      .accessor
                                                              ],
                                                              () => {},
                                                              idx2,
                                                              '',
                                                              row,
                                                          )
                                                        : row[
                                                              column.accessor
                                                          ] || '-'}
                                                </div>
                                            </td>
                                        )
                                    })}
                                    {props.enableActionButton ? (
                                        <td className="pr-4 w-[65px] flex gap-x-2">
                                            <Button
                                                onClick={() => {
                                                    props.func &&
                                                        props.func(
                                                            row?.id,
                                                            'edit',
                                                        )
                                                }}
                                                icon="ri-edit-2-line"
                                                className={`!p-0 !w-full !h-[1.8rem]`}
                                                variant="logistical-lightblue-invert"
                                                isDisabled={
                                                    row?.statusTransaction
                                                        ?.type === 'approve' &&
                                                    row.type.type === 'return'
                                                }
                                            />
                                            <Button
                                                onClick={() => {
                                                    props.func &&
                                                        props.func(
                                                            row?.id,
                                                            'check',
                                                        )
                                                }}
                                                icon="ri-list-check"
                                                className={`!p-0 !w-full !h-[1.8rem]`}
                                                variant="logistical-lightblue-invert"
                                            />
                                        </td>
                                    ) : (
                                        ''
                                    )}
                                </tr>
                            )
                        })}
                        {/* add row */}
                        {isAddRow && (
                            <tr>
                                <td colSpan={headers?.length} className="p-0 ">
                                    Add a eDocument
                                </td>
                                <td className="pr-4 w-[65px]">
                                    <Button
                                        onClick={() => {
                                            props?.addRowClick &&
                                                props.addRowClick()
                                        }}
                                        icon="ri-add-fill"
                                        className={`!p-0 !w-full !h-[1.8rem]`}
                                        variant="logistical-lightblue-invert"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SimpleTable
