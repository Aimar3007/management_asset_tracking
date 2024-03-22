/* eslint-disable no-unused-vars */
import Modal from 'components/modal/modal.component'
import { IUseModal } from 'components/modal/modal.service'
import { IActionList, IRoleModule } from 'repository/data/role-module.interface'
import '../user-access-form.style.css'
import ModuleItems from './module-item'
import RoundedToggle from 'components/rounded-toggle'
import { useEffect } from 'react'
import Button from 'components/button/button.component'

const SelectModuleModal = ({
    modalService,
    moduleList,
    modalSelectedPhase1 = 0,
    modalSelectedPhase2,
    setModalSelectedPhase1,
    setModalSelectedPhase2,
    setAccessHandling,
    setAllAccess,
}: {
    setAccessHandling: (indexAction: number) => void
    modalSelectedPhase1: number | null
    modalSelectedPhase2: number | null
    setModalSelectedPhase1: (selected: number | null) => void
    setModalSelectedPhase2: (selected: number | null) => void
    modalService: IUseModal
    moduleList: IRoleModule[]
    setAllAccess: () => void
}) => {
    const modulePhase1 = modalSelectedPhase1
        ? moduleList[modalSelectedPhase1]
        : moduleList[0]
    const phase2List =
        modulePhase1 && modulePhase1.sub ? modulePhase1.sub : null

    useEffect(() => {
        if (modalSelectedPhase1 === null) {
            setModalSelectedPhase1(0)
        }
    }, [])

    // ignore if module list empty
    if (moduleList.length < 1) {
        return <></>
    }

    // phase 3 -> actions list checkbox or not
    const getActionList = (): IActionList[] | null => {
        if (modalSelectedPhase1 === null) {
            return null
        }

        if (phase2List === null) {
            return modulePhase1.actionList
        }

        if (modalSelectedPhase2 === null) {
            return null
        }

        return phase2List[modalSelectedPhase2].actionList
    }
    const getAllAccessToggle = () => {
        let allAccessStatus =
            moduleList[modalSelectedPhase1 ?? 0].selectAllAction
        if (modalSelectedPhase2 !== null && phase2List) {
            allAccessStatus = phase2List[modalSelectedPhase2].selectAllAction
        }
        return (
            <RoundedToggle
                handleToggle={() => {
                    setAllAccess()
                }}
                isActive={allAccessStatus}
            />
        )
    }
    const phase3 = getActionList()
    const phase3AllAccessComponent = getAllAccessToggle()

    return (
        <Modal
            isModalOpen={modalService.isModalOpen}
            className="!w-[60%] px-0 !z-1000"
        >
            <div className="flex flex-col h-full">
                <div className="px-4 pb-4 flex  w-full ">
                    {/* Header */}
                    <div className="flex-1 flex-col flex leading-tight">
                        <span className="text-size-M font-bold ">
                            ADJUST MODULE CONTENT
                        </span>
                        <span className="text-size-S">
                            Disable or enable content to limit user
                            accessibility to the portal.
                        </span>
                    </div>
                    <div className="flex-end ">
                        <i
                            className="ri-close-line cursor-pointer"
                            onClick={() => {
                                modalService.closeModalHandling()
                            }}
                        />
                    </div>
                </div>

                <div className="flex bg-white  border-t">
                    {/* Body */}
                    <div className="flex-initial w-[25%] flex flex-col overflow-auto h-[250px] modalItem border-r">
                        {moduleList.map((data, index) => {
                            const isFocus =
                                modulePhase1 && data.id === modulePhase1.id
                                    ? true
                                    : false
                            return (
                                <ModuleItems
                                    key={'phase1' + index}
                                    isFocus={isFocus}
                                    module={data}
                                    onclick={() => {
                                        setModalSelectedPhase1(index)
                                        setModalSelectedPhase2(null)
                                    }}
                                />
                            )
                        })}
                    </div>

                    {!phase2List ? null : (
                        <div className="flex-initial w-[25%] flex flex-col overflow-auto h-[250px]  border-r modalItem">
                            {phase2List &&
                                phase2List.map((data, index) => {
                                    const isFocus =
                                        modalSelectedPhase2 !== null &&
                                        data.id ===
                                            phase2List[modalSelectedPhase2].id
                                            ? true
                                            : false
                                    return (
                                        <ModuleItems
                                            key={'phase2' + index}
                                            isFocus={isFocus}
                                            module={data}
                                            onclick={() => {
                                                setModalSelectedPhase2(index)
                                            }}
                                        />
                                    )
                                })}
                        </div>
                    )}

                    {!phase3 ? null : (
                        <div className="flex-auto overflow-auto h-[250px] modalItem">
                            <div className="w-100 border-b flex items-center min-h-[50px]  px-3 py-2">
                                {phase3AllAccessComponent}
                                <div className="pl-4 font-thin">All Access</div>
                            </div>
                            <div className="">
                                {phase3 &&
                                    phase3.map((data, index) => {
                                        return (
                                            <div
                                                className="w-100 border-b flex items-center px-3 py-2"
                                                key={'phase3' + index}
                                            >
                                                <RoundedToggle
                                                    handleToggle={() => {
                                                        setAccessHandling(index)
                                                    }}
                                                    isActive={data.status}
                                                />
                                                <div className="pl-4 font-thin">
                                                    {data.action}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-2/3 bg-white pt-4  px-4 border-t w-full">
                    {/* Footer */}
                    <Button
                        className="ml-auto"
                        label="Close"
                        onClick={() => {
                            modalService.closeModalHandling()
                        }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default SelectModuleModal
