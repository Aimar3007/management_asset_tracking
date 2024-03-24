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
import { getUserDetail } from 'repository/user.repository'
import {
    getTransactionAsset,
    updateTransactionAsset,
} from 'repository/transaction-asset.repository'
import TADModal from '../components/transaction-asset-detail-modal.component'
import { useModal } from 'components/modal/modal.service'
import { IUpdateTransactionAssetPayload } from 'repository/interface/transaction-asset.interface'

const useMUDetail = () => {
    // initial
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const MUDData = useSelector(MUDDataSelector)
    const TAData = useSelector(TADataSelector)
    const TAMeta = useSelector(TAMetaSelector)

    // state
    const [loadingDetailData, setLoadingDetailData] = useState<boolean>(true)
    const [loadingTAData, setLoadingTAData] = useState<boolean>(true)
    const [TADAction, setTADAction] = useState<{ id: number; action: string }>({
        id: 0,
        action: '',
    })

    // modal
    const TADMService = useModal()

    useEffect(() => {
        if (!id) return
        loadDetailData()
        loadTAData()
    }, [id])

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

    const AllModal = (
        <>
            <TADModal
                modalService={TADMService}
                onSubmit={updateTA}
                data={TAData?.filter((data) => data.id === TADAction?.id)[0]}
                action={TADAction?.action}
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
        actionTTAData,
        navigate,
    }
}

export default useMUDetail
