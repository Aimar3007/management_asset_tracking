import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { ITableColumn } from 'components/table/table.interface'
import { IAssetManagement } from 'repository/interface/asset-management-data.interface'
import { IAMFileterOptions } from './asset-management.interface'

export const assetNameOptions: IDropdownItem[] = [
    {
        value: 'laptop',
        label: 'Laptop',
    },
    {
        value: 'handset',
        label: 'Handset',
    },
    {
        value: 'mouse',
        label: 'Mouse',
    },
    {
        value: 'keyboard',
        label: 'Keyboard',
    },
    {
        value: 'cpu',
        label: 'CPU',
    },
]

export const AMHeader: ITableColumn<IAssetManagement>[] = [
    {
        accessor: 'name',
        label: 'Name',
    },
    {
        accessor: 'description',
        label: 'Description',
    },
    {
        accessor: 'brand',
        label: 'Brand',
    },
    {
        accessor: 'serialNumber',
        label: 'Serial Number',
    },
    {
        accessor: 'condition',
        label: 'Condition',
    },
    {
        accessor: 'purchaseDate',
        label: 'Purchase Date',
    },
    {
        accessor: 'user',
        label: 'City',
        customBuild: (data, rowData) => {
            return <div>{rowData?.user.city}</div>
        },
    },
    {
        accessor: 'user',
        label: 'User',
        customBuild: (data, rowData) => {
            return <div>{rowData?.user?.userName}</div>
        },
    },
    {
        accessor: 'previousUser',
        label: 'Previous User',
        customBuild: (data, rowData) => {
            return <div>{rowData?.previousUser?.userName}</div>
        },
    },
]

export const intialFilterOptions: IAMFileterOptions = {
    names: [{ label: '', value: '' }],
    brands: [{ label: '', value: '' }],
    users: [{ label: '', value: '' }],
}

// detail segment
export const AMDHeader: ITableColumn<IAssetManagement>[] = [
    {
        accessor: 'name',
        label: 'Name',
    },
    {
        accessor: 'description',
        label: 'Description',
    },
    {
        accessor: 'brand',
        label: 'Brand',
    },
    {
        accessor: 'serialNumber',
        label: 'Serial Number',
    },
    {
        accessor: 'condition',
        label: 'Condition',
    },
    {
        accessor: 'purchaseDate',
        label: 'Purchase Date',
    },
    {
        accessor: 'user',
        label: 'City',
        customBuild: (data, rowData) => {
            return <div> {rowData?.user.city}</div>
        },
    },
    {
        accessor: 'user',
        label: 'User',
        customBuild: (data, rowData) => {
            return <div> {rowData?.user?.userName}</div>
        },
    },
    {
        accessor: 'previousUser',
        label: 'Previous User',
        customBuild: (data, rowData) => {
            return <div>{rowData?.previousUser?.userName}</div>
        },
    },
    {
        accessor: 'notes',
        label: 'Notes',
    },
    {
        accessor: 'lastDateOfRepair',
        label: 'Last Date of Repair',
    },
    {
        accessor: 'repairHistory',
        label: 'Repair History',
        customBuild: () => {
            const data = [
                {
                    date: '12-Jan-2023',
                    description: 'Upadate Ram',
                },
                {
                    date: '12-Jan-2023',
                    description: 'Upadate Ram',
                },
            ]

            return (
                <div>
                    {data?.map((x: any) => (
                        <div className="flex">
                            <div className="max-w-[100px] min-w-[100px]">
                                {x.date}
                            </div>
                            <div className="">{x.description}</div>
                        </div>
                    ))}
                </div>
            )
        },
    },
]
