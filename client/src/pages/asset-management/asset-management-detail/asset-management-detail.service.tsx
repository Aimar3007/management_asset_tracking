import { Toast } from 'components/toast/toast.component'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getADData } from 'repository/asset-management.repository'
import { useAppDispatch } from 'store'
import { AMDDataSelector, setDataDetail } from '../asset-management.slice'
import { useSelector } from 'react-redux'
import RequestAssetModal from '../component/request-asset-modal.component'
import { useModal } from 'components/modal/modal.service'
import { createTransactionAsset } from 'repository/transaction-asset.repository'

const useAMDService = () => {
    // initial
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const AMDData = useSelector(AMDDataSelector)

    // state
    const [loadingDetailData, setLoadingDetailData] = useState<boolean>(true)
    const [reason, setReason] = useState<string>('')

    // modal
    const RAMService = useModal()

    useEffect(() => {
        if (!id) return
        loadDetailData()
    }, [id])

    const loadDetailData = async () => {
        try {
            setLoadingDetailData(true)
            const actionResult = await getADData(id as string)
            dispatch(setDataDetail(actionResult))
            setLoadingDetailData(false)
        } catch (e: any) {
            console.log(e)
            setLoadingDetailData(false)
            const errorMessage = e.message
            Toast({
                header: 'Failed Get Detail User',
                message: errorMessage,
                type: 'error',
            })
            setTimeout(() => {
                navigate(-1)
            }, 100)
        }
    }

    const requsetAsset = async () => {
        const payload = {
            userId: AMDData.userId,
            assetId: AMDData.id,
            reasonRequest: reason,
            typeTransactionAssetId: 1,
        }
        try {
            await createTransactionAsset(payload)
            Toast({
                header: 'Success Requset Asset',
                message: `Success Requset Asset ${AMDData.description}`,
                type: 'success',
            })
        } catch (e: any) {
            console.log(e)
            const errorMessage = e.message
            Toast({
                header: 'Failed Requset Asset',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    // component
    const allModalDetail = (
        <>
            <RequestAssetModal
                modalService={RAMService}
                onSubmit={() => requsetAsset()}
                description={AMDData.description}
                isDisabled={reason.length === 0}
                setReason={setReason}
            />
        </>
    )

    return { navigate, RAMService, AMDData, loadingDetailData, allModalDetail }
}

export default useAMDService
