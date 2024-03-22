/* eslint-disable no-unused-vars */
import { ITableExpandableRow } from './table-expandable-row.interface'
import { useTableExpandableRow } from './table-expandable-row.services'
import '../table-expandable.style.css'
import { useEffect, useRef } from 'react'
import Button from 'components/button/button.component'

export function TableExpandableRow<T, D>({
    ...props
}: ITableExpandableRow<T, D>) {
    const { data, isExpand, childData, setIsExpand } =
        useTableExpandableRow(props)
    const iconExpand = isExpand
        ? 'ri-arrow-up-s-line '
        : 'ri-arrow-down-s-line '
    const rowBgColor =
        !isExpand || props.highlightOnExpand === false
            ? 'bg-white'
            : '!bg-logistical-blue-ver6'
    const additionalClass = !isExpand ? 'hide' : 'show'
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = !isExpand
                ? '0px'
                : `${contentRef.current.scrollHeight}px`
        }
    }, [isExpand, childData])
    return (
        <>
            <tr className={`tr-expandable  ${rowBgColor} ${additionalClass}`}>
                <td
                    className={`th-expandable !w-[50px] `}
                    onClick={() => {
                        setIsExpand(!isExpand)
                    }}
                >
                    <i className={`${iconExpand}`}></i>
                </td>

                {props.headerParent.map((col, idx) => {
                    const accessor = col.accessor

                    // skip icon button
                    if (accessor === 'expandable-button-icon') {
                        return <></>
                    }

                    // get the value
                    let value: any = null
                    let tempData: any = { ...data }
                    if (accessor.includes('.')) {
                        const accessorArray = accessor.split('.')
                        for (const key of accessorArray) {
                            value = tempData?.[key]
                        }
                    } else {
                        value = tempData[accessor]
                    }

                    const width = col.width ? col.width + 'px' : ''
                    const minWidth = col.minWidth ? col.minWidth + 'px' : ''
                    const height = col.height ? col.height + 'px' : ''

                    const val =
                        !value || value === '' ? (
                            <div className="text-center w-full">-</div>
                        ) : (
                            value
                        )

                    const ellipsis = col.ellipsis
                        ? ' text-ellipsis overflow-hidden'
                        : ''

                    const inline = col.customBuild
                        ? ''
                        : '!inline-block align-middle'
                    //dimas

                    // return
                    return (
                        <td
                            className={`td-expandable`}
                            key={'col-' + idx}
                            onClick={() => {
                                if (accessor !== 'action') {
                                    setIsExpand(!isExpand)
                                }
                            }}
                            style={{
                                width: width,
                                minWidth: minWidth,
                            }}
                        >
                            <div
                                style={{
                                    height: height,
                                    width: col.ellipsis ? width : '',
                                    minWidth: minWidth,
                                }}
                                className={`${col?.className || ''}  ${inline} ${ellipsis}`}
                            >
                                {!col.customBuild
                                    ? val
                                    : col.customBuild(val, data)}
                            </div>
                        </td>
                    )
                })}
            </tr>

            {/* child */}
            <tr className="tr-child hide">
                <td></td>
                <td colSpan={props.headerParent.length - 1}>
                    <div className="extendable" ref={contentRef}>
                        <div
                            className={`m-2  rounded border border-logistical-gray-ver7 bg-logistical-gray-ver10`}
                        >
                            <table className="table-child">
                                <thead className="child-thead-expandable">
                                    {props.headerChild.map((data, idx) => {
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
                                                style={{
                                                    width: width,
                                                    minWidth: minWidth,
                                                }}
                                                key={'header-' + idx}
                                                className={`th-expandable`}
                                            >
                                                <div
                                                    key={data.accessor}
                                                    className={`${data?.headerClassName || ''}`}
                                                >
                                                    {!showLabel
                                                        ? null
                                                        : data.label}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </thead>
                                <tbody>
                                    {childData.length > 0 ? (
                                        <></>
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={
                                                    props.headerChild.length - 1
                                                }
                                                className="text-logistical-gray-ver7 pl-2"
                                            >
                                                Please add Line Item(s)
                                            </td>
                                            <td className="td-expandable text-right h-[40px]">
                                                <Button
                                                    onClick={() => {
                                                        props.addChildRowHandling &&
                                                            props.addChildRowHandling()
                                                    }}
                                                    style={{ height: '100%' }}
                                                    iconClassName="text-logistical-blue"
                                                    className="!p-0 !h-[30px] !w-[50px]"
                                                    variant="logistical-lightblue-invert"
                                                    icon="ri-add-line ri-1x"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                    {childData.map(
                                        (data: any, rowIndex: number) => {
                                            return (
                                                <tr>
                                                    {props.headerChild.map(
                                                        (col, idx) => {
                                                            const accessor =
                                                                col.accessor

                                                            // get the value
                                                            let value: any =
                                                                null
                                                            if (
                                                                accessor.includes(
                                                                    '.',
                                                                )
                                                            ) {
                                                                const accessorArray =
                                                                    accessor.split(
                                                                        '.',
                                                                    )
                                                                for (const key of accessorArray) {
                                                                    value =
                                                                        data?.[
                                                                            key
                                                                        ]
                                                                }
                                                            } else {
                                                                value =
                                                                    data[
                                                                        accessor
                                                                    ]
                                                            }

                                                            const ellipsis =
                                                                col.ellipsis
                                                                    ? ' text-ellipsis overflow-hidden'
                                                                    : ''
                                                            const width =
                                                                col.width
                                                                    ? col.width +
                                                                      'px'
                                                                    : ''
                                                            const height =
                                                                col.height
                                                                    ? col.height +
                                                                      'px'
                                                                    : '50px'
                                                            const minWidth =
                                                                col.minWidth
                                                                    ? col.minWidth +
                                                                      'px'
                                                                    : ''

                                                            // return
                                                            const val =
                                                                !value ||
                                                                value === '' ? (
                                                                    <div className="text-center w-full">
                                                                        -
                                                                    </div>
                                                                ) : (
                                                                    value
                                                                )
                                                            const inline =
                                                                col.customBuild
                                                                    ? ''
                                                                    : '!inline-block align-middle'
                                                            return (
                                                                <td
                                                                    style={{
                                                                        width: width,
                                                                        height: height,
                                                                        minWidth:
                                                                            minWidth,
                                                                    }}
                                                                    className={`td-expandable`}
                                                                    key={
                                                                        'col-' +
                                                                        idx
                                                                    }
                                                                >
                                                                    <div
                                                                        style={{
                                                                            width: col.ellipsis
                                                                                ? width
                                                                                : '',
                                                                        }}
                                                                        className={`${col?.className || ''} ${inline} ${ellipsis}`}
                                                                    >
                                                                        {!col.customBuild
                                                                            ? val
                                                                            : col.customBuild(
                                                                                  val,
                                                                                  data,
                                                                                  props.index,
                                                                                  rowIndex,
                                                                              )}
                                                                    </div>
                                                                </td>
                                                            )
                                                        },
                                                    )}
                                                </tr>
                                            )
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}
