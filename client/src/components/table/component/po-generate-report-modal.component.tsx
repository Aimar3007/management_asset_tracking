import ButtonExport from 'components/button-export/button-export.component'
import Button from 'components/button/button.component'
import Modal from 'components/modal/modal.component'
import { IPoGenerateReportModal } from '../table.interface'

function PoGenerateReportModal<T>({
    modalService,
    resetFilter,
    components,
    moduleTitle,
    data,
    exportType,
    getDataGenerate,
    generateReportData,
    GenerateReportHeaders,
    removeFilter,
}: IPoGenerateReportModal<T>) {
    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-1/3 rounded-[10px] !p-0"
        >
            <div className="flex flex-col gap-3 justify-content">
                <div className="flex font-bold text-size-L justify-between px-4 pt-4">
                    {' '}
                    Generate Report {moduleTitle}
                    <Button
                        className="!w-4 !h-4 !border-0"
                        icon="ri-close-fill"
                        onClick={() => {
                            modalService?.closeModalHandling()
                            // remove temporary filter when close modal
                            removeFilter()
                        }}
                    />
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="overflow-auto ">
                    <div className="px-4 pt-2">{components}</div>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="w-full flex  gap-3 px-4 pb-3">
                    <Button
                        onClick={async () => {
                            resetFilter && resetFilter()
                        }}
                        label="RESET"
                        className="w-1/4"
                        variant="danger"
                    />
                    <ButtonExport
                        data={data}
                        module={moduleTitle}
                        headers={GenerateReportHeaders}
                        onExport={modalService?.closeModalHandling}
                        exportType={exportType}
                        getDataGenerate={getDataGenerate}
                        generateReportData={generateReportData}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default PoGenerateReportModal
