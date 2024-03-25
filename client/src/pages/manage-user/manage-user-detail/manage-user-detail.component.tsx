import unknownImg from 'assets/img/gallery/unknown.png'
import { MUDetailHeader, TAHeaders } from '../manage-user.static'
import useMUDetail from './manage-user-detail.service'
import Button from 'components/button/button.component'
import SimpleTable from 'components/simple-table/simple-table.component'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'
import Pagination from 'components/pagination/pagination.component'

const ManageUserDetail = () => {
    const {
        MUDData,
        TAData,
        loadingTAData,
        TAMeta,
        AllModal,
        session,
        CSUMService,
        id,
        actionTTAData,
        navigate,
    } = useMUDetail()

    const labelButton = MUDData?.deletedAt ? 'Unsuspend User' : 'Suspend User'
    const variantButton = MUDData?.deletedAt ? 'primary' : 'danger'

    return (
        <div className="flex gap-x-5">
            <div className="flex-initial w-[25%] bg-white">
                <div className="p-4">
                    <img src={unknownImg} alt="" />
                    <div className="font-bold text-size-XL">Aimar Penanda</div>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {session.role === 'admin' && (
                            <>{MUDData.deletedAt ? 'Suspend' : 'Active'}</>
                        )}
                        {MUDetailHeader.map((header) => (
                            <div className="">
                                <div className="font-bold">{header.label}</div>
                                {header.customBuild
                                    ? header.customBuild(
                                          MUDData[header.accessor] as string,
                                          MUDData,
                                      )
                                    : (MUDData[header.accessor] as string) ||
                                      '-'}
                            </div>
                        ))}
                    </div>
                </div>

                {/* border */}
                <div className="border-b border-solid border-logistical-gray-ver3"></div>
                <div className="p-4 flex gap-x-2">
                    <Button
                        label="Back"
                        className="!w-[12rem]"
                        variant="primary"
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    {session.role === 'admin' && session.id != id && (
                        <Button
                            label={labelButton}
                            className="w-[15rem]"
                            variant={variantButton}
                            onClick={() => {
                                CSUMService.openModalHandling()
                            }}
                        />
                    )}
                </div>
            </div>

            <div className="flex-grow flex md:gap-y-4 gap-x-4 md:w-[calc(100vw-900px)]  sm:w-[calc(100vw-1rem)]  bg-white container-border p-4 container-global">
                {/* Flex 2.1 */}
                <div className="flex flex-grow flex-col justify-between border rounded border-logistical-gray-ver7 overflow-auto h-[calc(100vh-151px)]">
                    <div className="p-4 font-normal text-size-L border-b border-logistical-gray-ver7 flex justify-between">
                        <div>Transaction Asset</div>
                    </div>
                    <div className="h-full overflow-auto">
                        <SimpleTable<ITransactionAsset>
                            data={TAData || []}
                            headers={TAHeaders}
                            loading={loadingTAData}
                            func={actionTTAData}
                            enableActionButton={true}
                        />
                    </div>
                    <div className="border-t border-logistical-gray-ver3 flex justify-between">
                        <Pagination
                            meta={TAMeta}
                            previousHandling={(page) => {
                                console.log('hit prev API -> ' + page)
                            }}
                            nextHandling={(page) => {
                                console.log('hit Next API -> ' + page)
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* modal */}
            {AllModal}
        </div>
    )
}

export default ManageUserDetail
