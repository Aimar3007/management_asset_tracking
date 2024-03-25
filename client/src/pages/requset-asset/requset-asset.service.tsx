import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store'
import {
    RADataSelector,
    RAMetaSelector,
    filterSelector,
    payloadSelector,
    setData,
    setFilter,
    setPageNumber,
    setPayload,
} from './request-asset.slice'
import { useEffect, useState } from 'react'
import { IRAFileterOptions, IRAFilter } from './request-asset.interface'
import {
    IGetTransactionAssetPayload,
    ITransactionAsset,
    IUpdateTransactionAssetPayload,
} from 'repository/interface/transaction-asset.interface'
import {
    getTAfilter,
    getTransactionAsset,
    updateTransactionAsset,
} from 'repository/transaction-asset.repository'
import { useFormik } from 'formik'
import Button from 'components/button/button.component'
import RejectRequestModal from './component/reject-request-modal.component'
import { useModal } from 'components/modal/modal.service'
import ApproveRequestModal from './component/approve-requset-modal.component'
import { Toast } from 'components/toast/toast.component'

const useRequsetAsset = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // selector
    const filter = useSelector(filterSelector)
    const payload = useSelector(payloadSelector)
    const RAData = useSelector(RADataSelector)
    const RAMeta = useSelector(RAMetaSelector)

    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [handlingLoadData, setHandlingLoadData] = useState<boolean>(false)
    const [filterOptions, setFilterOptions] = useState<IRAFileterOptions>()
    const [dataRow, setDataRow] = useState<ITransactionAsset>()

    // modal
    const RejectRequest = useModal()
    const ApproveRequest = useModal()

    const formik = useFormik<{ searchTerm: string }>({
        initialValues: { searchTerm: '' },
        onSubmit: (value) => {
            if (value?.searchTerm.length >= 3) {
                dispatch(
                    setPayload({ ...payload, description: value.searchTerm }),
                )
            } else if (value.searchTerm.length <= 0)
                dispatch(setPayload({ ...payload, description: '' }))
        },
        validate: (values) => {
            const errors: any = {}
            if (
                values.searchTerm.length < 3 &&
                values.searchTerm.length !== 0
            ) {
                errors.searchTerm = 'Search term must be at least 3 characters'
            }
            return errors
        },
    })

    useEffect(() => {
        loadData()
    }, [payload, handlingLoadData   ])

    useEffect(() => {
        loadFilterOptions()
    }, [])

    const setValueFilter = (data: IRAFilter) => {
        dispatch(setFilter(data))
        const setData = {
            typeTransactionAssetId: data?.typeTransactionAsset?.value,
            statusTransactionAssetId: data?.statusTransactionAsset?.value,
            userId: data?.user?.value,
        } as IGetTransactionAssetPayload
        dispatch(setPayload({ ...payload, ...setData }))
    }

    const loadData = async () => {
        try {
            setLoading(true)
            const actionResult = await getTransactionAsset(payload)
            dispatch(setData(actionResult))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            console.log(errorMessage)
        }
    }

    const loadFilterOptions = async () => {
        try {
            const getDropdownOptions = await getTAfilter()

            const { user, typeTransactionAsset, statusTransactionAsset } =
                getDropdownOptions.data

            const setData = {
                typeTransactionAsset: typeTransactionAsset?.map((x) => ({
                    label: x.type,
                    value: x.id,
                })),
                statusTransactionAsset: statusTransactionAsset?.map((x) => ({
                    label: x.type,
                    value: x.id,
                })),
                user: user?.map((x) => ({ label: x.userName, value: x.id })),
            }

            setFilterOptions(setData)
        } catch (e) {
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            console.log(errorMessage)
        }
    }

    const setPageData = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    const updateTA = async (data: IUpdateTransactionAssetPayload) => {
        try {
            await updateTransactionAsset(data)
            setHandlingLoadData(!handlingLoadData)
            Toast({
                header: 'Success',
                message: 'Success update transaction asset',
                type: 'success',
            })
        } catch (e) {
            const errorMessage = typeof e !== 'string' ? 'Something wrong' : e
            console.log(errorMessage)
            Toast({
                header: 'Failed Update Transaction Asset',
                message: errorMessage,
                type: 'error',
            })
        }
    }

    // all components
    const actionComponent = (data: ITransactionAsset) => (
        <div className="flex gap-x-2">
            <Button
                onClick={() => {
                    RejectRequest.openModalHandling()
                    setDataRow(data)
                }}
                icon="ri-file-close-line"
                variant="danger"
                className="!p-0 w-[40px]"
                isDisabled={data?.statusTransaction?.type !== 'pending'}
            />
            <Button
                onClick={() => {
                    ApproveRequest.openModalHandling()
                    setDataRow(data)
                }}
                icon="ri-checkbox-line"
                className="!p-0 w-[40px]"
                variant="logistical-lightblue-invert"
                isDisabled={data?.statusTransaction?.type !== 'pending'}
            />
        </div>
    )

    const allModal = (
        <>
            <RejectRequestModal
                modalService={RejectRequest}
                onSubmit={updateTA}
                data={dataRow}
            />
            <ApproveRequestModal
                modalService={ApproveRequest}
                onSubmit={updateTA}
                data={dataRow}
            />
        </>
    )

    return {
        filter,
        formik,
        loading,
        filterOptions,
        RAData,
        RAMeta,
        allModal,
        actionComponent,
        setValueFilter,
        setPageData,
        navigate,
    }
}

export default useRequsetAsset
