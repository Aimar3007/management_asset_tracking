import { ITableColumn } from 'components/table/table.interface'
import { ITabItem } from 'components/tab/tab.interface'
import { formatDateTime } from 'common/common.service'
import AvatarCircle from 'components/avatar-circle/avatar-circle.component'
import { IUser } from 'repository/data/user.interface'

export const UAHeaders: ITableColumn<IUser>[] = [
    {
        label: 'Image',
        accessor: 'staffPortalData.fullName',
        showLabel: false,
        exportColumn: false,
        sort: false,
        width: 30, // min width
        customBuild: (data) => {
            return (
                <div>
                    <AvatarCircle name={data} />
                </div>
            )
        },
    },
    {
        label: 'Name',
        accessor: 'staffPortalData.fullName',
        width: 1, // min width
    },
    {
        label: 'Email',
        accessor: 'email',
        width: 1, // min width
    },
    {
        label: 'Job Title',
        accessor: 'staffPortalData.jobTitle',
        width: 1, // min width
    },
    {
        label: 'Role',
        accessor: 'role.roleDescription',
        width: 1, // min width
    },
    {
        label: 'Organization',
        accessor: 'organization',
        width: 1, // min width
        customBuild: (data) => {
            return <div> {data.toUpperCase()} </div>
        },
    },
    {
        label: 'Status',
        accessor: 'isActive',
        width: 1, // min width
        customBuild: (data, rowData) => {
            const status = rowData?.isActive ? 'Active' : 'Suspended'
            return <div> {status} </div>
        },
    },
    {
        label: 'Last Access',
        accessor: 'lastLogin',
        customBuild: (data) => {
            return <>{formatDateTime(data)}</>
        },
    },
]

export const TabDataUser: ITabItem[] = [
    {
        label: 'All Users',
        key: 'status',
        value: 'all',
        totalData: 13,
        colorClassname: 'bg-logistical-blue-ver1',
        textColorClassname: 'text-logistical-blue-ver5',
        lineColorClassname: 'bg-logistical-blue-ver5',
    },
    {
        label: 'Active',
        key: 'status',
        value: 'active',
        totalData: 13,
        colorClassname: 'bg-logistical-green-ver2',
        textColorClassname: 'text-logistical-green-dark-ver1',
        lineColorClassname: 'bg-logistical-green-dark-ver1',
    },
    {
        label: 'Suspended',
        key: 'status',
        value: 'suspended',
        totalData: 13,
        colorClassname: 'bg-logistical-red-ver2',
        textColorClassname: 'text-logistical-red-dark-ver1',
        lineColorClassname: 'bg-logistical-red-dark-ver1',
    },
]

export const UserDetailHeaders: ITableColumn[] = [
    {
        label: 'Select',
        accessor: 'selected',
    },
    {
        label: 'Image',
        accessor: 'image',
    },
    {
        label: 'User ID',
        accessor: 'user_id',
    },
    {
        label: 'Name',
        accessor: 'name',
    },
    {
        label: 'Role',
        accessor: 'role',
    },
    {
        label: 'Organization Name',
        accessor: 'organization_name',
    },
    {
        label: 'Status',
        accessor: 'status',
    },
    {
        label: 'Last Access',
        accessor: 'last_access',
    },
    {
        label: 'Address',
        accessor: 'address',
    },
    {
        label: 'Module Adjusment',
        accessor: 'module_access',
    },
    {
        label: 'Log',
        accessor: 'log',
    },
    {
        label: 'Email Address',
        accessor: 'email',
    },
    {
        label: 'Phone Number',
        accessor: 'phone_number',
    },
]

export const ButtonActionName = [
    'CONTACT USER',
    'EDIT USER',
    'RESET PASSWORD',
    'SUSPEND USER',
    'REMOVE USER',
]

export const tabItemsInitial: ITabItem[] = [
    {
        label: 'All Users',
        key: 'status',
        value: '',
        totalData: 0,
        colorClassname: 'bg-logistical-blue-ver1',
        textColorClassname: 'text-logistical-blue-ver5',
        lineColorClassname: 'bg-logistical-blue-ver5',
    },
    {
        label: 'Active',
        key: 'status',
        value: 'Active',
        totalData: 0,
        colorClassname: 'bg-logistical-green-ver2',
        textColorClassname: 'text-logistical-green-dark-ver1',
        lineColorClassname: 'bg-logistical-green-dark-ver1',
    },
    {
        label: 'Suspended',
        key: 'status',
        value: 'Suspended',
        totalData: 0,
        colorClassname: 'bg-logistical-red-light',
        textColorClassname: 'text-logistical-red-dark-ver1',
        lineColorClassname: 'bg-logistical-red-dark-ver1',
    },
]
