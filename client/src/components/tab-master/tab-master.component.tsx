import Tab from 'components/tab/tab.component'
import { ITab } from 'components/tab/tab.interface'
import { FormikProvider } from 'formik'
import useTabMaster from './tab-master.service'
import Tooltip from 'components/tooltip/tooltip.component'
import FormInput from 'components/form-input/form-input.component'
import Button from 'components/button/button.component'
import React from 'react'

export interface ITabMasterIconButton {
    icon: string
    className?: string
    filterOverlayComponent?: React.ReactNode
    onClick: () => void
}
export interface ITabMaster extends ITab {
    useSearch: boolean
    placeHolderSearch?: string
    containerSearchClassName?: string
    // eslint-disable-next-line no-unused-vars
    onSearchSubmit?: (value: string) => void

    //buttons
    iconButton1?: ITabMasterIconButton
    iconButton2?: ITabMasterIconButton
    iconButton3?: ITabMasterIconButton
}

const TabMaster = ({
    useSearch,
    placeHolderSearch,
    items,
    tabFilter,
    onChange,
    onSearchSubmit,
    iconButton1,
    iconButton2,
    iconButton3,
    containerSearchClassName,
}: ITabMaster) => {
    const { formik } = useTabMaster({
        handleSearch: onSearchSubmit,
    })

    const isButtonExists = !!(iconButton1 || iconButton2 || iconButton3)
    const isRightSectionVisible = isButtonExists || useSearch
    const flexWrap = useSearch ? 'flex-wrap-reverse' : ''
    const widthSideFlex = useSearch ? 'sm:w-full' : ' '

    const filterChildHeader = items?.filter(
        (value) => tabFilter?.value === value?.value,
    )[0]

    return (
        <>
            <div
                className={`px-3 pt-3 gap-1 flex ${flexWrap} justify-between border-b border-solid border-logistical-gray-ver3`}
            >
                <Tab
                    containerClassName="flex-grow w-auto sm:w-full"
                    items={items ?? []}
                    tabFilter={tabFilter}
                    onChange={(item) => {
                        onChange(item)
                    }}
                />

                <>
                    {isRightSectionVisible && (
                        <div
                            className={`${widthSideFlex} ${containerSearchClassName || ''} flex flex-grow -mt-1 justify-end `}
                        >
                            {useSearch && (
                                <FormikProvider value={formik}>
                                    <form
                                        className="w-full flex justify-end"
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            formik.handleSubmit()
                                        }}
                                    >
                                        <Tooltip
                                            text={
                                                'Search term must be at least 3 characters'
                                            }
                                            isShow={
                                                formik.errors.searchTerm
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <FormInput
                                                autoComplete="auto-off"
                                                hideError={true}
                                                placeholder={placeHolderSearch}
                                                parentDivClassName="w-full min-w-[250px] !mb-0"
                                                icon="ri-search-line"
                                                name="searchTerm"
                                                onKeyDown={(
                                                    event: React.KeyboardEvent<HTMLInputElement>,
                                                ) => {
                                                    if (
                                                        event.key ===
                                                            'Backspace' &&
                                                        formik.values.searchTerm
                                                            .length === 1
                                                    ) {
                                                        formik.values.searchTerm =
                                                            ''
                                                        formik.handleSubmit()
                                                    }
                                                }}
                                            />
                                        </Tooltip>
                                    </form>
                                </FormikProvider>
                            )}

                            {iconButton1 && (
                                <div>
                                    <Button
                                        onClick={() => {
                                            iconButton1.onClick()
                                        }}
                                        icon={iconButton1.icon}
                                        className={`${iconButton1.className} pb-1 ml-2 w-btnIconWidth !border-transparent`}
                                        variant="logistical-white"
                                    />

                                    {iconButton1?.filterOverlayComponent
                                        ? iconButton1.filterOverlayComponent
                                        : ''}
                                </div>
                            )}

                            {iconButton2 && (
                                <div>
                                    <Button
                                        onClick={() => {
                                            iconButton2.onClick()
                                        }}
                                        icon={iconButton2.icon}
                                        className={`${iconButton2.className} ml-2 w-btnIconWidth !border-transparent`}
                                        variant="logistical-white"
                                    />

                                    {iconButton2?.filterOverlayComponent
                                        ? iconButton2.filterOverlayComponent
                                        : ''}
                                </div>
                            )}

                            {iconButton3 && (
                                <div>
                                    <Button
                                        onClick={() => {
                                            iconButton3.onClick()
                                        }}
                                        icon={iconButton3.icon}
                                        className={`${iconButton3.className} ml-2 w-btnIconWidth !border-transparent`}
                                        variant="logistical-white"
                                    />
                                    {iconButton3?.filterOverlayComponent
                                        ? iconButton3.filterOverlayComponent
                                        : ''}
                                </div>
                            )}
                        </div>
                    )}
                </>
            </div>

            {/* child tabs */}
            {filterChildHeader?.childStatus?.length ? (
                <div
                    className={`px-3 pt-3 gap-1 flex ${flexWrap} justify-between border-b border-solid border-logistical-gray-ver3`}
                >
                    <Tab
                        items={filterChildHeader?.childStatus || []}
                        onChange={(item) => {
                            onChange({
                                ...filterChildHeader,
                                childStatus: [item],
                            })
                        }}
                        tabFilter={tabFilter?.childStatus[0]}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TabMaster
