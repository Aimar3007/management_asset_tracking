import { useState } from 'react'
import { ITabContentItem } from './tab-content.interface'

const useTabContent = (items: ITabContentItem[]) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [labels, setLabels] = useState<string[]>(
        items.map((data) => data.label),
    )
    const [contents, setContents] = useState<JSX.Element[]>(
        items.map((data) => data.accessor),
    )

    const nextCompo = () => {
        setActiveIndex(activeIndex + 1)
    }

    return {
        labels,
        contents,
        activeIndex,
        setLabels,
        setContents,
        setActiveIndex,
        nextCompo,
    }
}

export default useTabContent
