import { ITabContent } from './tab-content.interface'
import useTabContent from './tab-content.service'

const TabContent = ({ items, ...props }: ITabContent) => {
    const { labels, contents, activeIndex, setActiveIndex } =
        useTabContent(items)

    return (
        <div className={`tab-content ${props.className}`}>
            {/* Tab Items */}
            <div className={`flex gap-4 px-3 pt-3`}>
                {labels.map((label, idx) => {
                    const isActive = activeIndex === idx
                    const classActive = !isActive ? '' : 'font-bold'
                    return (
                        <div
                            className={`cursor-pointer ${classActive}`}
                            onClick={() => setActiveIndex(idx)}
                            key={idx}
                        >
                            {label}
                            <br />
                            <div
                                className={
                                    'mt-1 transition duration-300  h-[5px] ' +
                                    (isActive ? `bg-logistical-gray-ver4` : '')
                                }
                            ></div>
                        </div>
                    )
                })}
            </div>

            {/* border */}
            <div
                className={`border-b border-top border-logistical-gray-ver3`}
            ></div>

            {/* content Items */}
            <div className={`mt-4 content`}>
                {contents?.map((content, idx) => {
                    const isActive = activeIndex === idx

                    if (!isActive) return <></>
                    return content
                })}
            </div>

            {/* footer */}
            {props.footerComponent &&
                props.footerComponent(activeIndex, setActiveIndex)}
        </div>
    )
}

export default TabContent
