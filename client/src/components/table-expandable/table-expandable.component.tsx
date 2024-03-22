import { TableExpandableRow } from './row/table-expandable-row.component'
import { ITableExpandable } from './table-expandable.interface'
import { useTableExpandable } from './table-expandable.services'
import './table-expandable.style.css'

function TableExpandable<T, D>({
    notFoundMessage = `No data found`,
    ...props
}: ITableExpandable<T, D>) {
    const { data, header, headerChild, childAccessor } =
        useTableExpandable(props)
    return (
        <div className="table-expandable h-full w-full  flex flex-col overflow-auto">
            <div className={`flex-1 ${!data.length && 'flex'}`}>
                <table className="w-full table-auto">
                    <thead className="thead-expandable">
                        <tr>
                            {header.map((data, idx) => {
                                const showLabel =
                                    data.showLabel === undefined
                                        ? true
                                        : data.showLabel
                                const width = data.width
                                    ? data.width + 'px'
                                    : ''

                                const minWidth = data.minWidth
                                    ? data.minWidth + 'px'
                                    : ''
                                return (
                                    <th
                                        key={'header-' + idx}
                                        className={`th-expandable`}
                                        style={{
                                            width: width,
                                            minWidth: minWidth,
                                        }}
                                    >
                                        <div
                                            key={data.accessor}
                                            className={`${data?.headerClassName || ''}`}
                                        >
                                            {!showLabel ? null : data.label}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length < 1 ? (
                            <tr>
                                <td colSpan={11.5}>
                                    <div className="w-full h-full flex justify-center items-center">
                                        {notFoundMessage}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                        {data.map((row: T, idx: number) => {
                            return (
                                <TableExpandableRow<T, D>
                                    key={'row-' + idx + (row as any)?.id}
                                    index={idx}
                                    data={row}
                                    headerParent={header}
                                    headerChild={headerChild}
                                    childAccessor={childAccessor}
                                    addChildRowHandling={() =>
                                        props.addChildRowHandling &&
                                        props.addChildRowHandling(
                                            (row as any)['id'] ?? '',
                                        )
                                    }
                                    highlightOnExpand={props.highlightOnExpand}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableExpandable
