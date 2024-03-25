import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from 'store'
import {
    MUDDataSelector,
    TADataSelector,
    TAMetaSelector,
    setDataDetail,
    setTAData,
} from '../manage-user.slice'
import { Toast } from 'components/toast/toast.component'
import { useEffect, useState } from 'react'
import { getUserDetail, updateUser } from 'repository/user.repository'
import {
    getTransactionAsset,
    updateTransactionAsset,
} from 'repository/transaction-asset.repository'
import TADModal from '../components/transaction-asset-detail-modal.component'
import { useModal } from 'components/modal/modal.service'
import { IUpdateTransactionAssetPayload } from 'repository/interface/transaction-asset.interface'
import { IUserAuth } from 'repository/interface/user-auth.interface'
import { userDataSelector as sessionSelector } from 'pages/login/login.slice'
import ChangeStatusUserModal from '../components/suspend-user-modal.component'
import { IUpdateUserPayload } from 'repository/interface/user.interface'

const useMUDetail = () => {
    // initial
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const session: IUserAuth = useSelector(sessionSelector)
    const MUDData = useSelector(MUDDataSelector)
    const TAData = useSelector(TADataSelector)
    const TAMeta = useSelector(TAMetaSelector)

    // state
    const [loadingDetailData, setLoadingDetailData] = useState<boolean>(true)
    const [loadingTAData, setLoadingTAData] = useState<boolean>(true)
    const [handlingLoadData, setHandlingLoadData] = useState<boolean>(false)
    const [TADAction, setTADAction] = useState<{ id: number; action: string }>({
        id: 0,
        action: '',
    })

    // modal
    const TADMService = useModal()
    const CSUMService = useModal()

    useEffect(() => {
        if (!id) return
        loadDetailData()
        loadTAData()
    }, [id, handlingLoadData])

    const loadDetailData = async () => {
        try {
            setLoadingDetailData(true)
            const actionResult = await getUserDetail(id as string)
            dispatch(setDataDetail(actionResult))
            setLoadingDetailData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingDetailData(false)
            const errorMessage = e.message
            Toast({
                header: 'Failed Get Detail PO',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate(-1)
            }, 100)
        }
    }

    const loadTAData = async () => {
        const payload = {
            page: 1,
            record: 50,
            userId: id,
        }

        try {
            setLoadingTAData(true)
            const actionResult = await getTransactionAsset(payload)
            dispatch(setTAData(actionResult))
            setLoadingTAData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingTAData(false)
            const errorMessage = e.message
            Toast({
                header: 'Failed Get Transaction Asset Data',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate(-1)
            }, 100)
        }
    }

    const updateTA = async (
        id: number,
        typeTransaction: string,
        statusTransaction: string,
    ) => {
        let payload: IUpdateTransactionAssetPayload = {
            id,
        }
        if (
            (typeTransaction === 'request' || typeTransaction === 'return') &&
            statusTransaction === 'pending'
        ) {
            payload = {
                id,
                deletedAt: new Date() as unknown as string,
            }
        } else if (
            typeTransaction === 'request' &&
            statusTransaction === 'approve'
        ) {
            // return asset
            payload = {
                id,
                typeTransactionAssetId: 2,
                statusTransactionAssetId: 1,
            }
        }
        try {
            await updateTransactionAsset(payload)
            Toast({
                header: 'Success',
                message: 'Success update asset',
                type: 'success',
            })
            loadTAData()
        } catch (e: any) {
            const errorMessage = e.message
            Toast({
                header: 'Failed Remove Transaction Asset Data',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    const actionTTAData = (id: number | string, action: string) => {
        TADMService.openModalHandling()
        setTADAction({ id: id as number, action })
    }

    const changeStatususer = async () => {
        const payload: IUpdateUserPayload = {
            id: Number(id),
            deletedAt: !MUDData?.deletedAt ? new Date() : null,
        }
        try {
            await updateUser(payload)
            Toast({
                header: 'Sucess',
                message: `Success ${!payload?.deletedAt ? 'suspend' : 'unsuspend'} user`,
                type: 'success',
            })
            setHandlingLoadData(!handlingLoadData)
        } catch (e: any) {
            console.log(e)
            const errorMessage = e.message
            Toast({
                header: 'Failed Update User',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    const AllModal = (
        <>
            <TADModal
                modalService={TADMService}
                onSubmit={updateTA}
                data={TAData?.filter((data) => data.id === TADAction?.id)[0]}
                action={TADAction?.action}
            />
            <ChangeStatusUserModal
                modalService={CSUMService}
                data={MUDData}
                onSubmit={changeStatususer}
            />
        </>
    )

    return {
        MUDData,
        loadingDetailData,
        loadingTAData,
        TAData,
        TAMeta,
        AllModal,
        session,
        CSUMService,
        id,
        actionTTAData,
        navigate,
    }
}

export default useMUDetail
