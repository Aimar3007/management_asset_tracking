import moment from 'moment'
import { ITracker } from './tracker.interface'
import './tracker.style.css'

const Tracker = ({ data, bgColor = 'white', isLoading = true }: ITracker) => {
    return (
        <div
            className={`tracker-bg-${bgColor} h-full rounded-sm p-4 overflow-auto`}
        >
            {isLoading ? (
                <div className="text-center pt-2 pb-2"> Please Wait </div>
            ) : (
                <></>
            )}

            {isLoading ? (
                <></>
            ) : (
                data.map((item, idx: number) => {
                    const styleCircle = 'w-[12px] h-[12px]'
                    const styleLine = 'mx-[4px]'
                    const title =
                        item.title && item.title !== ''
                            ? item.title
                            : 'Empty Title'
                    const description =
                        item.description && item.description !== ''
                            ? item.description
                            : 'Empty Description'

                    const tempStamp = moment(item.at).format(
                        'MMM D, YYYY, HH:mm',
                    )
                    return (
                        <div
                            className={`flex ${idx === 0 ? 'active' : 'inactive'}`}
                            key={idx}
                        >
                            <div>
                                <div
                                    className={`${styleCircle} flex items-center mt-3 justify-center rounded-full circle`}
                                ></div>

                                {/* line */}
                                <div
                                    className={`h-[102px] w-[4px] ${styleLine} my-1 bg-black rounded-sm line`}
                                ></div>
                            </div>

                            {/* description tracker */}
                            <div className="ml-3">
                                <div className="item-status text-size-XL">
                                    {title}
                                </div>
                                <div className="item-description text-size-M">
                                    {description}
                                </div>
                                <div className="item-details">
                                    <div className="flex">
                                        <div className="w-40">By User</div>
                                        <div>: {item.byUserName}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-40">
                                            Date/Timestamp
                                        </div>
                                        <div>: {tempStamp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Tracker
