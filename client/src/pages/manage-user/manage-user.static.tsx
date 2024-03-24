import { ISTColumn } from 'components/simple-table/simple-table.interface'
import { ITableColumn } from 'components/table/table.interface'
import { ITransactionAsset } from 'repository/interface/transaction-asset.interface'
import { IUser } from 'repository/interface/user.interface'

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
    // {
    //     accessor: 'assetId',
    //     label: 'Action',
    //     // customBuild: (data, func, y, z, rowData) => (
    //     //     <div className="flex gap-x-2">
    //     //         <Button
    //     //             onClick={() => {}}
    //     //             icon="ri-edit-2-line"
    //     //             className={`!p-0 !w-full !h-[1.8rem]`}
    //     //             variant="logistical-lightblue-invert"
    //     //         />
    //     //         <Button
    //     //             onClick={() => {}}
    //     //             icon="ri-list-check"
    //     //             className={`!p-0 !w-full !h-[1.8rem]`}
    //     //             variant="logistical-lightblue-invert"
    //     //         />
    //     //     </div>
    //     // ),
    // },
]
