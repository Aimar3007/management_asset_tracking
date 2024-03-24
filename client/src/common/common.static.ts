import AMDetail from 'pages/asset-management/asset-management-detail/asset-management-detail.component'
import { IRoute } from '../common/common.interface'
import AssetManagement from 'pages/asset-management/asset-management.component'
import ManageUserDetail from 'pages/manage-user/manage-user-detail/manage-user-detail.component'

// const version = process.env.REACT_APP_API_URL_VERSION

export const endpoints = {
    // attach po
    attach_po: 'Po/Shipment',

    // asset management
    asset_management_getAll: 'assets',
    AM_getDetail: 'assets/details/',
    AM_getDropdown: 'assets/dropdown-options',

    // transaction asset
    TA_getAll: 'transaction-assets',
    TA_createTA: 'transaction-assets/crete',

    // user
    login: 'auth',
    user_currentUser: 'user/current-user',
    user_getAll: 'user',
    user_getDetail: 'user/details/',
}

export const commonErrorMessage: string = 'must be entered'
export const arrayCommonErrorMessage = 'Please enable at least one on'

export const routes: IRoute[] = [
    {
        path: '/',
        text: 'Asset Management',
        Content: AssetManagement,
        show: false,
        icon: 'ri-dashboard-line',
        client: ['logistical', 'jpl'],
        parentId: '1',
    },
    {
        path: '/asset-management',
        text: 'Asset Management',
        Content: AssetManagement,
        show: false,
        icon: 'ri-dashboard-line',
        client: ['logistical', 'jpl'],
        parentId: '1',
    },

    {
        path: '/asset-management',
        text: 'Asset Management',
        Content: AssetManagement,
        show: true,
        icon: 'ri-dashboard-line',
        client: ['logistical', 'jpl'],
        parentId: '1',
    },
    {
        path: '/asset-management-detail/:id',
        text: 'Asset Management Detail',
        Content: AMDetail,
        client: ['logistical', 'jpl'],
    },
    {
        path: '/profile/:id',
        text: 'Profile',
        Content: ManageUserDetail,
        client: ['logistical', 'jpl'],
    },
    // {
    //     path: 'purchase-order',
    //     text: 'Purchase Order',
    //     Content: PurchaseOrderPage,
    //     show: true,
    //     icon: 'ri-file-list-3-line',
    //     client: ['logistical', 'jpl', 'pan'],
    //     showSearch: true,
    //     parentId: '2',
    // },
    // {
    //     path: 'purchase-order-detail/:id',
    //     text: 'Purchase Order Detail',
    //     Content: PurchaseOrderDetail,
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'shipments',
    //     text: 'Shipments',
    //     Content: Shipments,
    //     parentId: '3.2',
    //     show: true,
    //     client: ['logistical', 'jpl'],
    //     icon: 'ri-truck-line',
    // },
    // {
    //     path: 'forwarding',
    //     text: 'Forwarding',
    //     show: false,
    //     expandable: true,
    //     icon: 'ri-book-mark-line',
    //     client: ['logistical', 'jpl'],
    //     parentId: '3',
    //     sub: [
    //         {
    //             path: 'shipments',
    //             text: 'Shipments',
    //             Content: Shipments,
    //             parentId: '3.2',
    //             show: true,
    //             client: ['logistical', 'jpl'],
    //             showSearch: true,
    //         },
    //         {
    //             path: 'bookings',
    //             text: 'Bookings',
    //             parentId: '3.1',
    //             Content: Bookings,
    //             show: false,
    //             client: ['logistical', 'jpl'],
    //             showSearch: true,
    //         },
    //         {
    //             path: 'orders',
    //             text: 'Orders',
    //             Content: WIP,
    //             show: true,
    //             parentId: '3.3',
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'container',
    //             text: 'Containers',
    //             parentId: '3.4',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'spot-quotes',
    //             text: 'Spot Quotes',
    //             parentId: '3.5',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'reports',
    //             text: 'Reports',
    //             parentId: '3.6',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'flight',
    //             text: 'Flight',
    //             parentId: '3.7',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'sailings',
    //             text: 'Sailings',
    //             Content: WIP,
    //             parentId: '3.8',
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'road',
    //             text: 'Road',
    //             parentId: '3.9',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //         {
    //             path: 'rail',
    //             text: 'Rail',
    //             parentId: '3.10',
    //             Content: WIP,
    //             show: true,
    //             client: ['logistical'],
    //         },
    //     ],
    // },
    // {
    //     path: 'linear-agency',
    //     text: 'Linear Agency',
    //     Content: WIP,
    //     parentId: '4',
    //     client: ['logistical'],
    // },
    // {
    //     path: 'customs',
    //     text: 'Customs',
    //     Content: WIP,
    //     parentId: '5',
    //     client: ['logistical'],
    // },
    // {
    //     path: 'warehouse',
    //     text: 'Warehouse',
    //     Content: WIP,
    //     parentId: '6',
    //     show: true,
    //     icon: 'ri-building-4-line',
    //     client: ['logistical'],
    // },
    // {
    //     path: 'port-transport',
    //     text: 'Port Transport',
    //     parentId: '7',
    //     Content: WIP,
    //     show: true,
    //     icon: 'ri-caravan-fill',
    //     client: ['logistical'],
    // },
    // {
    //     path: 'accounts',
    //     text: 'Accounts',
    //     Content: WIP,
    //     parentId: '8',
    //     show: true,
    //     icon: 'ri-caravan-fill',
    //     client: ['logistical'],
    // },
    // {
    //     path: 'user',
    //     text: 'Manage User',
    //     parentId: '9',
    //     Content: UserAccess,
    //     show: true,
    //     icon: 'ri-shield-user-line',
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'demo-payment',
    //     text: 'Demo Payment',
    //     Content: WIP,
    //     icon: 'ri-wallet-2-line',
    //     client: ['logistical'],
    //     show: true,
    // },
    // {
    //     path: 'organisation',
    //     parentId: '10',
    //     text: 'Organisation',
    //     show: false,
    //     Content: WIP,
    //     icon: 'ri-organization-chart',
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'settings',
    //     text: 'Settings',
    //     Content: WIP,
    //     show: false,
    //     parentId: '11',
    //     icon: 'ri-settings-line',
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'shipments-detail/:id',
    //     text: 'Shipments Detail',
    //     Content: ShipmentDetails,
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'bookings-detail/:id',
    //     text: 'Bookings Detail',
    //     Content: BookingsDetail,
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'create-booking',
    //     text: 'Create Booking',
    //     Content: CreateBooking,
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'user/detail/:id',
    //     text: 'User Detail',
    //     Content: UserAccessDetail,
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'profile',
    //     text: 'Profile',
    //     Content: () => UserAccessCreate({ isNew: false, isProfilePage: true }),
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'user/create/',
    //     text: 'Create User',
    //     Content: () => UserAccessCreate({ isNew: true, isProfilePage: false }),
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'user/update/:id',
    //     text: 'Update User',
    //     Content: () => UserAccessCreate({ isNew: false, isProfilePage: false }),
    //     client: ['logistical', 'jpl'],
    // },
    // {
    //     path: 'shipments-detail/attach-po/:id',
    //     text: 'Attach Purchase Order',
    //     Content: AttachPo,
    //     client: ['jpl'],
    // },
]
