/* eslint-disable no-unused-vars */
import { ITable } from './table.interface'
import SpinnerTable from 'components/spinner-table/spinner-table.component'
import Pagination from 'components/pagination/pagination.component'
import './table.style.css'
import SortButton from './component/sort-button.component'
import { useTable } from './table.service'
import Checkbox from 'components/checkbox/checkbox.component'
import Button from 'components/button/button.component'
import EmptyResult from 'components/empty-result/empty-result.component'
import PoGenerateReportModal from './component/po-generate-report-modal.component'

function Table<T>({ ...props }: ITable<T>) {
    const loadingMessage = `loading ${props.moduleTitle} Data . . .`
    const notFoundMessage = `No data found`
    const {
        generatedData,
        generatedHeaders,
        sortBy,
        sortOrder,
        setSortColumn,
        checkboxSingleHandling,
        checkboxAllHandling,
    } = useTable<T>({
        data: props.data,
        headers: props.headers,
        checkboxVisible: props.checkboxVisible,
        checkboxDataHandling: props.checkboxDataHandling,
        tabFilterItem: props.tabFilterItem,
        resetCheckedInitialValue: props.resetCheckedInitialValue,
    })

    return (
        <>
            <div className="h-full flex flex-col overflow-auto">
                <div className={`flex-1 ${props.containerClassname}`}>
                    {props.loading === true ? (
                        <SpinnerTable message={loadingMessage} />
                    ) : generatedData.length <= 0 ? (
                        <EmptyResult message={notFoundMessage} />
                    ) : (
                        <table
                            className="table-master table-auto"
                            id="table-master"
                        >
                            <thead className="thead-master">
                                <tr className="tr-master">
                                    {!props.checkboxVisible ? (
                                        <></>
                                    ) : (
                                        <th className="th-master sticky-column">
                                            <Checkbox
                                                onChecked={(x: boolean) => {
                                                    checkboxAllHandling(x)
                                                }}
                                            />
                                        </th>
                                    )}

                                    {generatedHeaders.map((data, idx) => {
                                        const classColumnActive =
                                            sortBy === data.accessor
                                                ? 'sort-active'
                                                : ''
                                        const sortEnable =
                                            data.sort === undefined
                                                ? true
                                                : data.sort
                                        const header =
                                            data.showLabel === false ? (
                                                <></>
                                            ) : data.customHeader ? (
                                                data.customHeader()
                                            ) : (
                                                data.label
                                            )

                                        const width = data.width
                                            ? data.width + 'px'
                                            : ''

                                        const minWidth = data.minWidth
                                            ? data.minWidth + 'px'
                                            : ''

                                        return (
                                            <th
                                                key={'header-' + idx}
                                                className={`th-master`}
                                                style={{
                                                    width: width,
                                                    minWidth: minWidth,
                                                }}
                                            >
                                                <div
                                                    key={data.accessor}
                                                    className={`${classColumnActive} ${data?.headerClassName || ''}`}
                                                >
                                                    {header}
                                                    {!data.showLabel ||
                                                    !sortEnable ? null : (
                                                        <SortButton
                                                            key={
                                                                'sortButton-' +
                                                                idx
                                                            }
                                                            columnKey={
                                                                data.accessor
                                                            }
                                                            sortKey={sortBy}
                                                            sortOrder={
                                                                sortOrder
                                                            }
                                                            onClick={(
                                                                accessor,
                                                            ) => {
                                                                setSortColumn(
                                                                    accessor,
                                                                    sortOrder ===
                                                                        'asc',
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {generatedData.map((row: any, idx) => {
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
                                            {!props.checkboxVisible ? (
                                                <></>
                                            ) : (
                                                <td
                                                    className={`td-master sticky-column`}
                                                >
                                                    <Checkbox
                                                        isChecked={
                                                            row['selected']
                                                        }
                                                        onChecked={(
                                                            isChecked: boolean,
                                                        ) => {
                                                            checkboxSingleHandling(
                                                                isChecked,
                                                                row,
                                                                idx,
                                                            )
                                                        }}
                                                    />
                                                </td>
                                            )}
                                            {generatedHeaders.map(
                                                (col, idx) => {
                                                    const accessor =
                                                        col.accessor
                                                    let data: any = null
                                                    if (
                                                        accessor.includes('.')
                                                    ) {
                                                        const accessorArray =
                                                            accessor.split('.')
                                                        data = row
                                                        for (const key of accessorArray) {
                                                            data = data?.[key]
                                                        }
                                                    } else {
                                                        data = row[accessor]
                                                    }

                                                    const width = col.width
                                                        ? col.width + 'px'
                                                        : ''
                                                    const minWidth =
                                                        col.minWidth
                                                            ? col.minWidth +
                                                              'px'
                                                            : ''
                                                    const height = col.height
                                                        ? col.height + 'px'
                                                        : ''
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
                                                            style={{
                                                                height: height,
                                                                width: col.ellipsis
                                                                    ? width
                                                                    : '',
                                                                minWidth:
                                                                    minWidth,
                                                            }}
                                                        >
                                                            <div
                                                                className={`${col?.className || ''}`}
                                                            >
                                                                {!col.customBuild
                                                                    ? data !==
                                                                      ''
                                                                        ? data
                                                                        : '-'
                                                                    : col.customBuild(
                                                                          data,
                                                                          row,
                                                                      )}
                                                            </div>
                                                        </td>
                                                    )
                                                },
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {props?.modalService && (
                    <PoGenerateReportModal
                        modalService={props?.modalService}
                        resetFilter={props?.resetFilter}
                        components={props?.components}
                        moduleTitle={props?.moduleTitle}
                        data={props?.data}
                        headers={props?.headers}
                        exportType="xlxs"
                        getDataGenerate={props?.getDataGenerate}
                        generateReportData={props?.generateReportData}
                        GenerateReportHeaders={props?.GenerateReportHeaders}
                        removeFilter={props?.removeFilter}
                    />
                )}
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
                <div className="m-4 flex gap-2">
                    {props.additionalButtonBottom}
                    {props.enableExport ? (
                        <Button
                            label="Generate Report"
                            onClick={() => {
                                props.modalService?.openModalHandling()
                            }}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    )
}

export default Table
