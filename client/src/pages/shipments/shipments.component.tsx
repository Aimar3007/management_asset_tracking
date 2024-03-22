/* eslint-disable no-unused-vars */
import Table from 'components/table/table.component'
import './shipments.style.css'
import { IShipment2 } from './shipments.interface'
import TabMaster from 'components/tab-master/tab-master.component'
import useShipments from './shipments.service'
import { ShipmentGenerateReportHeader } from './shipments.static'

const Shipments = () => {
    const {
        setTabFilter,
        navigate,
        generateHeaderShipment,
        setPageData,
        handleSearch,
        removeTemporyFilter2,
        resetFilterGenerateReport,
        generateReportData,
        getDataGenerate,
        loading,
        ShipmentGenerateReportModalService,
        componentFilter,
        componentPoFilterOverlay,
        filterOverlayService,
        shipemntsDataMeta,
        tabFilter,
        shipmentsData,
        tabItems,
    } = useShipments()

    return (
        <div className="shipments container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                <TabMaster
                    items={tabItems || []}
                    tabFilter={tabFilter}
                    onChange={(item) => setTabFilter(item)}
                    //  search ----------------------------------------------------------------
                    useSearch={true}
                    placeHolderSearch={'Search Shipment ID (min 3 char)'}
                    onSearchSubmit={(values) => handleSearch(values)}
                    containerSearchClassName={'flex-1'}
                    //  button for overlay or something ----------------------------------------
                    iconButton1={{
                        onClick: () =>
                            filterOverlayService.toggleOverlayHandling(),
                        icon: 'ri-filter-2-line',
                        filterOverlayComponent: componentPoFilterOverlay,
                    }}
                />

                <Table<IShipment2>
                    headers={generateHeaderShipment()}
                    data={shipmentsData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={shipemntsDataMeta}
                    moduleTitle={'Shipment'}
                    onRowClick={function (data): void {
                        const id = data.shipmentID
                        navigate('/shipments-detail/' + id)
                    }}
                    enableExport={true}
                    modalService={ShipmentGenerateReportModalService}
                    components={componentFilter}
                    resetFilter={resetFilterGenerateReport}
                    removeFilter={removeTemporyFilter2}
                    getDataGenerate={getDataGenerate}
                    generateReportData={generateReportData}
                    GenerateReportHeaders={ShipmentGenerateReportHeader}
                />
            </div>
        </div>
    )
}

export default Shipments
