import Table from 'components/table/table.component'
import { POGenerateReportHeader, POHeader } from './purchase-order.static'
import { IPurchaseOrder } from './purchase-order.interface'
import usePurchaseOrder from './purchase-order.service'
import Button from 'components/button/button.component'
import PoBulkUpdateModal from './components/po-bulk-update-modal.component'
import { Toast } from 'components/toast/toast.component'
import TabMaster from 'components/tab-master/tab-master.component'

const PurchaseOrderPage = () => {
    const {
        setSelectedPo,
        bulkUpdateToOpen,
        setTabFilter,
        setPageData,
        navigate,
        getDataGenerate,
        handleSearch,
        resetFilterGenerateReport,
        removeTemporyFilter2,
        componentPoFilterOverlay,
        componentFilter,
        generateReportData,
        filterOverlayService,
        poData,
        tabItems,
        poDataMeta,
        organization,
        tabFilter,
        loading,
        selectedPo,
        poBulkStatusModalService,
        poGenerateReportModalService,
    } = usePurchaseOrder()

    return (
        <div className="purchase-order container-global content-full-height flex">
            <div className="flex flex-grow flex-col w-[calc(100vw-20rem)] sm:w-[calc(100vw-4rem)]">
                {/* Header Tabs & Search */}
                <TabMaster
                    // tab items --------------------------------------------------------------
                    items={tabItems ?? []}
                    onChange={(item) => {
                        setTabFilter(item)
                    }}
                    tabFilter={tabFilter}
                    //  search ----------------------------------------------------------------
                    useSearch={true}
                    placeHolderSearch="Search PO No (minimum 3 char)"
                    onSearchSubmit={(values) => handleSearch(values)}
                    //  button for overlay or something ----------------------------------------
                    iconButton1={{
                        onClick: () =>
                            filterOverlayService.toggleOverlayHandling(),
                        icon: 'ri-filter-2-line',
                        filterOverlayComponent: componentPoFilterOverlay,
                    }}
                />

                {/* Table */}
                <Table<IPurchaseOrder>
                    headers={POHeader}
                    data={poData}
                    loading={loading}
                    nextHandling={(page) => {
                        setPageData(page)
                    }}
                    previousHandling={(page) => {
                        setPageData(page)
                    }}
                    meta={poDataMeta}
                    moduleTitle={'Purchase Order'}
                    onRowClick={function (data): void {
                        const id = data.id
                        navigate('/purchase-order-detail/' + id)
                    }}
                    checkboxVisible={
                        organization === 'pan' &&
                        tabFilter?.value === 'Canceled'
                            ? true
                            : false
                    }
                    checkboxDataHandling={(data: IPurchaseOrder[]) => {
                        setSelectedPo(data)
                    }}
                    tabFilterItem={tabFilter}
                    enableExport={true}
                    additionalButtonBottom={
                        organization === 'pan' &&
                        tabFilter?.value === 'Canceled' ? (
                            <>
                                <Button
                                    isDisabled={
                                        selectedPo?.length < 1 ? true : false
                                    }
                                    className={`w-btnSmallWidth ml-2 mr-2 !pl-2 !pr-2`}
                                    variant="logistical-darkblue"
                                    label="RE-OPEN PO"
                                    type="button"
                                    onClick={() => {
                                        poBulkStatusModalService.openModalHandling()
                                    }}
                                />
                            </>
                        ) : undefined
                    }
                    containerClassname={'overflow-auto'}
                    modalService={poGenerateReportModalService}
                    components={componentFilter}
                    resetFilter={resetFilterGenerateReport}
                    getDataGenerate={getDataGenerate}
                    removeFilter={removeTemporyFilter2}
                    generateReportData={generateReportData}
                    GenerateReportHeaders={POGenerateReportHeader}
                />
            </div>

            {/* modal bulk update*/}
            <PoBulkUpdateModal
                modalService={poBulkStatusModalService}
                onSubmit={() => {
                    Toast({
                        header: 'PO REOPENED',
                        message: `Purchase Orders successfully updated to Open status.
                        Total PO Canceled: ${selectedPo?.length} PO.`,
                        type: 'success',
                    })
                    bulkUpdateToOpen()
                }}
                data={selectedPo}
            />
        </div>
    )
}

export default PurchaseOrderPage
