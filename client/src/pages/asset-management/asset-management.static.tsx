import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { ITableColumn } from 'components/table/table.interface'
import { IAssetManagement } from 'repository/interface/asset-management-data.interface'

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
        accessor: 'user.city',
        label: 'City',
    },
    {
        accessor: 'user.name',
        label: 'User',
    },
    {
        accessor: 'name',
        label: 'name',
    },
    {
        accessor: 'previousUser.name',
        label: 'Previous User',
    },
]
