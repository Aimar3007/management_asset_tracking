import Button from 'components/button/button.component'
import Overlay from 'components/overlay/overlay.component'
import { IUseOverlay } from 'components/overlay/overlay.service'

const PoFilterOverlay = ({
    filterOverlayService,
    componentFilter,
    resetFilter,
    applyFilter,
    removeTemporyFilter,
}: {
    filterOverlayService: IUseOverlay
    componentFilter: JSX.Element
    resetFilter: () => void
    applyFilter: any
    removeTemporyFilter: any
}) => {
    return (
        <Overlay
            isOverlayOpen={filterOverlayService.isOverlayOpen}
            className="w-[600px]"
        >
            <form
                className={`w-full `}
                onSubmit={(e) => {
                    e.preventDefault()
                    applyFilter()
                }}
            >
                <div className="flex font-bold text-size-L justify-between">
                    Filters
                    <Button
                        className="!w-4 !h-4 !border-0 mb-2"
                        icon="ri-close-fill"
                        onClick={() => {
                            filterOverlayService.closeOverlayHandling()

                            // remove temproray filter when close filter
                            removeTemporyFilter()
                        }}
                    />
                </div>
                <div className="border-b border-gray-40"></div>
                {componentFilter}
                <div className="border-b border-gray-40 mt-2"></div>
                <div className="w-full flex mt-2 gap-3">
                    <Button
                        onClick={async () => {
                            resetFilter()
                        }}
                        label="RESET"
                        className="w-1/4"
                        variant="danger"
                    />
                    <Button
                        onClick={() => {}}
                        type="submit"
                        label="APPLY FILTER"
                        className="w-3/4"
                        variant="logistical-lightblue"
                    />
                </div>
            </form>
        </Overlay>
    )
}

export default PoFilterOverlay
