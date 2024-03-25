import { ITableColumn } from 'components/table/table.interface'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'

export const TAHeaders: ITableColumn<ITransactionAsset>[] = [
    {
        accessor: 'assetId',
        label: 'Name',
        customBuild: (data, rowData) => <div>{rowData?.asset?.name}</div>,
    },
    {
        accessor: 'assetId',
        label: 'Brand',
        customBuild: (data, rowData) => <div>{rowData?.asset?.brand}</div>,
    },
    {
        accessor: 'assetId',
        label: 'Description',
        customBuild: (data, rowData) => (
            <div>{rowData?.asset?.description}</div>
        ),
    },
    {
        accessor: 'assetId',
        label: 'Serial Number',
        customBuild: (data, rowData) => (
            <div>{rowData?.asset?.serialNumber}</div>
        ),
    },
    {
        accessor: 'typeTransactionAssetId',
        label: 'Type Transaction',
        customBuild: (data, rowData) => <div>{rowData?.type?.type}</div>,
    },
    {
        accessor: 'statusTransactionAssetId',
        label: 'Request Status',
        customBuild: (data, rowData) => (
            <div>{rowData?.statusTransaction?.type}</div>
        ),
    },
    {
        accessor: 'createdAt',
        label: 'Date of Request',
        customBuild: (data) => <div>{data}</div>,
    },
]
