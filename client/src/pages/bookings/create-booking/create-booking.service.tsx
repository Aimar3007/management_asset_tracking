import { useRef, useState } from 'react'

export const useCreateBooking = (data: any) => {
    const contentRef = useRef<HTMLTableElement>(null)
    const [generateData, setGenerateData] = useState(data)

    const [contentHeight, setContentHeight] = useState<number | undefined>(
        contentRef?.current?.getBoundingClientRect().height,
    )
    const [dynamicClass, setDynamicClass] = useState<string>(
        'h-[calc(100vh-230px)]',
    )

    const handleResize = () => {
        if (contentRef.current) {
            const newHeight = contentRef.current.getBoundingClientRect().height
            setContentHeight(newHeight)
            setDynamicClass(
                newHeight < 350
                    ? 'h-[calc(100vh-250px)]'
                    : 'h-[calc(100vh-230px)]',
            )
        }
    }

    const handleHalfScreenSize = () => {
        if (contentRef.current) {
            const newHeight =
                contentRef?.current?.getBoundingClientRect().height
            setContentHeight(newHeight)
            setDynamicClass(
                newHeight && newHeight < 350
                    ? 'h-[calc(100vh-405px)]'
                    : 'h-[calc(100vh-385px)]',
            )
        }
    }

    const removeDataRow = (dataLength: number, itemId: number) => {
        if (dataLength !== 1)
            setGenerateData((prevData: any) =>
                prevData.filter((_: any, idx: any) => idx + 1 !== itemId),
            )
    }

    const setAttachedOrderDataRow = (
        itemId: number,
        isAdd: boolean,
        value: string,
    ) => {
        if (!isAdd) {
            removeDataRow(generateData.length, itemId)
        } else {
            setGenerateData((prevData: any) => {
                const updatedData = prevData.map((item: any, idx: any) =>
                    idx + 1 === itemId ? { ...item, orderNumber: value } : item,
                )

                if (itemId === prevData.length) {
                    return [
                        ...updatedData,
                        {
                            orderNumber: {
                                label: 'Select pack type',
                                value: '',
                            },
                            date: '',
                            goodsDescription: '',
                        },
                    ]
                }

                return updatedData
            })
        }
    }

    const setGoodsDataRow = (itemId: number, isAdd: boolean, value: string) => {
        if (!isAdd) {
            removeDataRow(generateData.length, itemId)
        } else {
            setGenerateData((prevData: any) => {
                const updatedData = prevData.map((item: any, idx: any) =>
                    idx + 1 === itemId ? { ...item, pieces: value } : item,
                )

                if (itemId === prevData.length) {
                    return [
                        ...updatedData,
                        {
                            pieces: ``,
                            packType: ``,
                            length: ``,
                            width: ``,
                            height: ``,
                            ud: ``,
                            weight: ``,
                            uq: ``,
                            volume: ``,
                            uq2: ``,
                            description: ``,
                        },
                    ]
                }

                return updatedData
            })
        }
    }

    const setReferenceNumberDataRow = (
        itemId: number,
        isAdd: boolean,
        value: string,
    ) => {
        if (!isAdd) {
            removeDataRow(generateData.length, itemId)
        } else {
            setGenerateData((prevData: any) => {
                const updatedData = prevData.map((item: any, idx: any) =>
                    idx + 1 === itemId ? { ...item, country: value } : item,
                )

                if (itemId === prevData.length) {
                    return [
                        ...updatedData,
                        {
                            country: {
                                label: 'Select country/region',
                                value: '',
                            },
                            numberType: '',
                            number: '',
                            typeDescription: '',
                            issueDate: '',
                            information: '',
                        },
                    ]
                }

                return updatedData
            })
        }
    }

    return {
        contentRef,
        contentHeight,
        dynamicClass,
        handleResize,
        generateData,
        setAttachedOrderDataRow,
        setGoodsDataRow,
        setReferenceNumberDataRow,
        handleHalfScreenSize,
    }
}
