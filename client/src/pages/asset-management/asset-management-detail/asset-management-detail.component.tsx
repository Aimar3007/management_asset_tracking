import bgLogin from 'assets/img/gallery/BgLogin.jpg'

import Button from 'components/button/button.component'
import { AMDHeader } from '../asset-management.static'
import useAMDService from './asset-management-detail.service'

const AMDetail = () => {
    const { navigate, RAMService, allModalDetail, AMDData } = useAMDService()
    return (
        <div className="container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)] justify-between">
                <div className="overflow-auto">
                    <div className="flex gap-x-10 p-4">
                        <div className="flex-initial w-1/2">
                            <img src={bgLogin} alt="" />
                        </div>
                        <div className="flex-grow oveflow-auto">
                            <div className="font-bold text-size-XL">
                                {AMDData?.description}
                            </div>
                            <div className="overflow-auto">
                                <div className="grid grid-cols-2 gap-3 mt-2 overflow-auto">
                                    {AMDHeader.map((x) => {
                                        const colSpan =
                                            x.accessor === 'repairHistory'
                                                ? 'col-span-2'
                                                : 'col-span-1'
                                        return (
                                            <div className={`${colSpan}`}>
                                                <div className="text-size-M text-[#707785] font-bold">
                                                    {x.label}
                                                </div>
                                                {x.customBuild
                                                    ? x.customBuild(
                                                          AMDData[
                                                              x.accessor
                                                          ] as string,
                                                          AMDData,
                                                      )
                                                    : (AMDData[
                                                          x.accessor
                                                      ] as string) || '-'}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* border */}
                    <div className="border-b border-solid border-logistical-gray-ver3"></div>
                    <div className="flex justify-between p-4">
                        <Button
                            label="Back"
                            className=""
                            variant="primary"
                            onClick={() => navigate(-1)}
                        />
                        <Button
                            label="Request Asset"
                            className=""
                            variant="primary"
                            onClick={() => {
                                RAMService.openModalHandling()
                            }}
                        />
                    </div>
                </div>
            </div>
            {allModalDetail && allModalDetail}
        </div>
    )
}

export default AMDetail
