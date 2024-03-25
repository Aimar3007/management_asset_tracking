import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { ISTColumn } from 'components/simple-table/simple-table.interface'
import { ITableColumn } from 'components/table/table.interface'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'
import { IUser } from 'repository/interface/user.interface'

export const UMHeaders: ITableColumn<IUser>[] = [
    {
        accessor: 'userName',
        label: 'Username',
    },
    {
        accessor: 'email',
        label: 'Email',
    },
    {
        accessor: 'deletedAt',
        label: 'Status',
        customBuild: (data) => <>{data ? 'Suspended' : 'Active'}</>,
    },
    {
        accessor: 'position',
        label: 'Position',
    },
    {
        accessor: 'city',
        label: 'Base on',
    },
    {
        accessor: 'roleId',
        label: 'Role Access',
        customBuild: (data, rowData) => <div>{rowData?.role?.type}</div>,
    },
]

export const userStatus: IDropdownItem[] = [
    {
        value: 0,
        label: 'Active',
    },
    {
        value: 1,
        label: 'Suspended',
    },
]

export const roleOptions: IDropdownItem[] = [
    { label: 'Admin', value: 1 },
    { label: 'Regular', value: 2 },
]

// segment detail
export const MUDetailHeader: ITableColumn<IUser>[] = [
    {
        accessor: 'email',
        label: 'Email',
    },
    {
        accessor: 'position',
        label: 'Position',
    },
    {
        accessor: 'city',
        label: 'Base on',
    },
    {
        accessor: 'roleId',
        label: 'Role Access',
        customBuild: (data, rowData) => <div>{rowData?.role?.type}</div>,
    },
]

export const TAHeaders: ISTColumn<ITransactionAsset>[] = [
    {
        accessor: 'assetId',
        label: 'Name',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.asset?.name}</div>
        ),
    },
    {
        accessor: 'assetId',
        label: 'Brand',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.asset?.brand}</div>
        ),
    },
    {
        accessor: 'assetId',
        label: 'Description',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.asset?.description}</div>
        ),
    },
    {
        accessor: 'assetId',
        label: 'Serial Number',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.asset?.serialNumber}</div>
        ),
    },
    {
        accessor: 'typeTransactionAssetId',
        label: 'Type Transaction',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.type?.type}</div>
        ),
    },
    {
        accessor: 'statusTransactionAssetId',
        label: 'Request Status',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.statusTransaction?.type}</div>
        ),
    },
    {
        accessor: 'assetId',
        label: 'Date of Use',
        customBuild: (data, x, y, z, rowData) => (
            <div>{rowData?.asset?.dateOfUse}</div>
        ),
    },
]
