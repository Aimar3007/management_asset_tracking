import { useState } from 'react'
import { ITabContentItem } from './tab-content.interface'

const useTabContent = (items: ITabContentItem[]) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [labels, setLabels] = useState<string[]>(
        items.map((data) => data.label),
    )
    const [contents, setContents] = useState<JSX.Element[]>(
        items.map((data) => data.content),
    )

    return {
        labels,
        contents,
        activeIndex,
        setLabels,
        setContents,
        setActiveIndex,
    }
}

export default useTabContent
