import useUserAccessDetail from './user-access-detail.service'
import Button from 'components/button/button.component'
import SelectModuleModal from '../user-access-form/modal/select-module-modal'
import EmptyResult from 'components/empty-result/empty-result.component'
import Spinner from 'components/spinner/spinner.component'
import SuspendUserModal from '../modal/suspend-user-modal.component'
import './user-access-detail.style.css'
import AvatarCircle from 'components/avatar-circle/avatar-circle.component'
import { UserSettingIcon } from './components/user-settings-icon.component'

const UserAccessDetail = () => {
    const {
        id,
        loadingDetailData,
        moduleAdjustmentList,
        modalService,
        modalSelectedPhase1,
        modalSelectedPhase2,
        organization,
        userDetailData,
        modalConfirmationService,
        session,
        setAccess,
        setModalSelectedPhase1,
        setAllAccess,
        setModalSelectedPhase2,
        openEmailClient,
        navigate,
        deleteUser,
        unDeleteUser,
    } = useUserAccessDetail()
    const spinnerShow = loadingDetailData ? '' : 'hidden'
    const detailShow = !loadingDetailData ? 'opacity-100' : 'opacity-0'
    const buttonEdit = (
        <Button
            variant="logistical-lightblue-invert"
            className="!w-[160px]"
            label={'Edit User'}
            onClick={() => {
                navigate('/user/update/' + id)
            }}
            useUpperCase={true}
        />
    )
    return (
        <>
            <div
                className={`${spinnerShow} flex w-full content-full-height items-center justify-center`}
            >
                <Spinner label="Please Wait..." />
            </div>

            <div
                className={`${detailShow} user-detail opacity-0 transition-opacity duration-500 `}
            >
                <div className="content-1 content-full-height">
                    {/* Flex 1, 2 rows */}

                    <div className="content-1-A container-global">
                        {/* Image Session */}
                        <div className="flex justify-between items-centers gap-4">
                            <AvatarCircle
                                name={userDetailData?.fullName ?? ''}
                                size={50}
                            />
                            <div className="flex-1 flex flex-col leading-none ">
                                <div className="text-size-L pb-1 pt-1 font-bold">
                                    {userDetailData?.fullName ??
                                        'User Full Name'}
                                </div>
                                <div className="text-size-M">
                                    {userDetailData?.role} User
                                </div>
                            </div>
                            <UserSettingIcon
                                isActive={userDetailData?.isActive ?? false}
                                suspendFunction={() => {
                                    modalConfirmationService.openModalHandling()
                                }}
                            />
                        </div>

                        {/* Border */}
                        <div className="border-t mx-[-1rem] my-4"></div>

                        {/* Detail User Session */}
                        <div className="flex-1 flex">
                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <ValueLabel
                                            label={'Email Address'}
                                            value={userDetailData?.email}
                                        />
                                        <div
                                            className="flex gap-2 items-center text-logistical-gray-ver3 hover:text-logistical-gray-ver8 cursor-pointer"
                                            onClick={() => {
                                                openEmailClient()
                                            }}
                                        >
                                            Contact User
                                            <i className="ri-mail-line"></i>
                                        </div>
                                    </div>
                                    <ValueLabel
                                        label={'Phone Number'}
                                        value={userDetailData?.workPhone}
                                    />
                                    <ValueLabel
                                        label={'Job Title'}
                                        value={userDetailData?.jobTittle}
                                    />
                                    <ValueLabel
                                        label={'User Role'}
                                        value={userDetailData?.role + ' User'}
                                    />
                                    <ValueLabel
                                        label={'Organisation Name'}
                                        value={organization
                                            .find(
                                                (x) =>
                                                    x.value ===
                                                    userDetailData?.organization,
                                            )
                                            ?.label.toString()}
                                    />
                                    <ValueLabel
                                        label={'Status'}
                                        value={
                                            userDetailData?.isActive
                                                ? 'ACTIVE'
                                                : 'SUSPENDED'
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Border */}
                        <div className="border-t mx-[-1rem] my-4"></div>
                        <div className="flex justify-between">
                            <Button
                                label="Back"
                                variant="logistical-white"
                                className="w-btnSmallWidth"
                                onClick={() => {
                                    navigate('/user')
                                }}
                            />
                            {session.role === 'Admin' &&
                            userDetailData?.role === 'Regular'
                                ? buttonEdit
                                : null}
                            {session.role === 'Super' ? buttonEdit : null}
                        </div>
                    </div>
                </div>
                <div className="content-2  container-global content-full-height">
                    {/* Flex 2, 1 rows */}

                    <div className="flex gap-4 pt-2">
                        <div className="flex-grow text-size-L pb-1 pt-1 font-bold">
                            USER ACTIVITY LOGS
                        </div>
                    </div>

                    {/* Border */}
                    <div className="border-t mx-[-1rem] my-4"></div>

                    <div className="flex-grow h-[70%] items-center">
                        <EmptyResult message={'No Logs Found'} />
                    </div>
                </div>

                <SelectModuleModal
                    modalService={modalService}
                    moduleList={moduleAdjustmentList}
                    setModalSelectedPhase1={(selected) => {
                        setModalSelectedPhase1(selected)
                    }}
                    setModalSelectedPhase2={(selected) => {
                        setModalSelectedPhase2(selected)
                    }}
                    setAccessHandling={(indexAction: number) => {
                        setAccess(indexAction)
                    }}
                    modalSelectedPhase1={modalSelectedPhase1}
                    modalSelectedPhase2={modalSelectedPhase2}
                    setAllAccess={() => {
                        setAllAccess({})
                    }}
                />
                <SuspendUserModal
                    data={userDetailData}
                    modalService={modalConfirmationService}
                    isActive={userDetailData?.isActive ?? false}
                    onSubmit={function (): void {
                        if (userDetailData?.isActive) {
                            deleteUser()
                        } else {
                            unDeleteUser()
                        }
                    }}
                />
            </div>
        </>
    )
}

const ValueLabel = ({
    label = ' - ',
    value = ' - ',
}: {
    label?: string
    value?: string
}) => {
    const labelShow = label === '' || !label ? '-' : label
    const valueShow = value === '' || !value ? '-' : value
    return (
        <div className="leading-none ">
            <p className="!text-size-XS font-light pb-1">{labelShow}</p>
            <p className="!text-size-M font-normal">{valueShow}</p>
        </div>
    )
}

export default UserAccessDetail
