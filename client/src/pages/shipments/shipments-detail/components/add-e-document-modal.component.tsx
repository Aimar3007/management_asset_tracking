/* eslint-disable no-unused-vars */
import Button from 'components/button/button.component'
import Dropdown from 'components/dropdown/dropdown.component'
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { eDocsTypeOptions } from '../shipments-details.static'
import { IDropdownItem } from 'components/dropdown/dropdown.interface'

export interface IAddEDocumentModal {
    modalService: IUseModal
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChooseFile: () => void
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void
    selectedFile: File | null
    inputRef: React.RefObject<HTMLInputElement>
    eDocsType: IDropdownItem<undefined> | undefined
    setEDocsType: React.Dispatch<
        React.SetStateAction<IDropdownItem<undefined> | undefined>
    >
    onSubmit: () => void
}

const AddEDocumentModal = ({
    modalService,
    handleFileChange,
    onChooseFile,
    handleDragOver,
    handleDrop,
    selectedFile,
    inputRef,
    eDocsType,
    setEDocsType,
    onSubmit,
}: IAddEDocumentModal) => {
    return (
        <Modal isModalOpen={modalService.isModalOpen} className="!w-1/3  px-0">
            <form
                className="flex flex-col gap-4 justify-content"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                    modalService.closeModalHandling()
                }}
            >
                <div className="font-bold text-size-L px-4 flex justify-between">
                    <div>Add eDocument</div>
                    <i
                        className="ri-close-fill cursor-pointer"
                        onClick={() => modalService.closeModalHandling()}
                    ></i>
                </div>
                <div className="border-b border-gray-40"></div>
                <div className="text-logistical-gray-ver4 px-4 flex flex-col gap-y-4 w-full overflow-auto ">
                    <input
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                        ref={inputRef}
                        accept=".jpg, .jpeg, .png, .pdf, .xls, .xlsx"
                    />

                    <div>
                        <div>Upload a File</div>
                        <div
                            className="flex w-full cursor-pointer text-size-XS"
                            onClick={onChooseFile}
                        >
                            <div className="bg-[#00B0F2] p-2 text-white rounded-tl rounded-bl">
                                BROWSE FILE
                            </div>
                            <div
                                className={`border border-l-0 p-2 rounded-tr rounded-br ${selectedFile?.name ? '' : 'text-[#C9CCD2]'}  flex-grow`}
                            >
                                {selectedFile?.name || 'No file choosen'}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            border: '2px dashed #BEEDFF',
                        }}
                        className="rounded flex justify-center py-10 bg-[#F6FDFF] cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={onChooseFile}
                    >
                        <div className="flex flex-col  text-[#707785]">
                            <div className="flex justify-center">
                                <i className="ri-upload-line"></i>
                            </div>
                            <div>Click to upload or drag and drop</div>
                            <div className="text-size-XS flex justify-center ">
                                PNG, JPG, PDF, XLS or XLSX (MAX, 3mb)
                            </div>
                        </div>
                    </div>
                    <Dropdown
                        label="DOCUMENT TYPE"
                        placeholder="Select Document Type"
                        options={eDocsTypeOptions}
                        value={eDocsType}
                        isSearchable
                        isClearable
                        onClick={(value) =>
                            setEDocsType(value as IDropdownItem)
                        }
                    />
                </div>
                <div className="border-b border-gray-40"></div>
                <Button
                    onClick={() => {}}
                    type="submit"
                    label="ADD EDOCS"
                    variant="logistical-lightblue"
                    className="mx-2"
                    isDisabled={
                        selectedFile?.name && eDocsType?.value ? false : true
                    }
                />
            </form>
        </Modal>
    )
}

export default AddEDocumentModal
