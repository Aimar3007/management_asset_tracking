import Table from 'components/table/table.component'
import { UAHeaders } from './user-access.static'
import './user-access.style.css'
import useUserAccess from './user-access.service'
import { IUser } from 'repository/data/user.interface'
import TabMaster from 'components/tab-master/tab-master.component'

export default function UserAccess() {
    const {
        loading,
        userData,
        userDataMeta,
        tabItems,
        tabFilter,
        setSearch,
        setTabFilter,
        navigate,
        setPageData,
    } = useUserAccess()

    return (
        <div className="container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                <TabMaster
                    items={tabItems ?? []}
                    selectedItem={tabFilter}
                    onChange={(item) => setTabFilter(item)}
                    iconButton1={{
                        icon: 'ri-add-line',
                        onClick: () => {
                            navigate('/user/create')
                        },
                    }}
                    //  search ----------------------------------------------------------------
                    useSearch={true}
                    placeHolderSearch="Search User (minimum 3 char)"
                    onSearchSubmit={(values) => setSearch(values)}
                />
                <Table<IUser>
                    headers={UAHeaders}
                    data={userData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={userDataMeta}
                    moduleTitle={'User'}
                    onRowClick={(data) => {
                        const id = data.id
                        navigate(`/user/detail/${id}`)
                    }}
                    enableExport={false}
                />
            </div>
        </div>
    )
}
