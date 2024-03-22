// import TableExpandable from 'components/table-expandable/table-expandable.component'
// import {
//     addressHeaderSample,
//     userHeaderSample,
//     userSample,
// } from 'components/table-expandable/dummy'
import logoLogistical from '../../assets/img/logos/IconLogistical.png'

export default function WIP() {
    return (
        <div className="container-global">
            <div className="p-10 text-center"> Work In Progress</div>
        </div>
    )
}

export function DashboardInProgress() {
    return (
        <div className="container-global content-full-height  flex items-center justify-center">
            <img
                src={logoLogistical}
                alt="logo"
                className="h-[100px] sm:py-[20px] sm:px-[40px]"
            />
        </div>

        // SAMPLE TABLE EXPANDABLE
        // <div className="container-global content-full-height flex p-2">
        //     <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
        //         <TableExpandable
        //             headerParent={userHeaderSample}
        //             headerChild={addressHeaderSample}
        //             childAccessor="address"
        //             data={userSample}
        //         />
        //     </div>
        // </div>
    )
}
