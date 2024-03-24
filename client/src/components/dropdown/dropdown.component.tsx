/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { IDropdown, IDropdownItem } from './dropdown.interface'
import './dropdown.style.css'
import AsyncSelect from 'react-select/async'

function Dropdown<T>({
    isLoading = false,
    isClearable = false,
    isSearchable = false,
    isMultiSelect = false,
    required = false,
    dropDownIndicator = false,
    disabled = false,
    useBorder = true,
    isAsync = false,
    options = [],
    ...props
}: IDropdown<T>) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [focus, setFocus] = useState(false)
    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const requiredDropdown = dropDownIndicator ? '' : 'none'
    const isRequired = required
        ? 'before:content-["*"] before:text-logistical-red-ver1 before:pr-[3px]'
        : ''
    const labelFocus = focus ? 'text-logistical-blue-ver3' : ''
    const borderFocus = focus ? '!border-logistical-blue-ver3' : ''

    // isloading
    if (isLoading) {
        options = [{ value: 'loading', label: 'Loading Data' }]
    }

    return (
        <div className={`dropdownParent-style`}>
            <label className={`${showLabelClass}`}>
                <div className="dropdownLabelDiv-style">
                    <p className={`${isRequired} ${labelFocus}  `}>
                        {props.label}
                    </p>
                </div>
            </label>

            <div
                className={` ${focus ? '' : props.parentDivClassname} ${borderFocus} ${useBorder ? '' : 'border-none'} dropDown`}
            >
                {!isAsync ? (
                    <Select
                        className={`${props.className}`}
                        classNamePrefix={'select'}
                        // closeMenuOnSelect={
                        //     isMultiSelect === true ? false : true
                        // }
                        placeholder={props.placeholder}
                        value={props.value}
                        isDisabled={disabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        options={options}
                        menuPosition="fixed"
                        maxMenuHeight={115}
                        onChange={(e: IDropdownItem<T> | null | any) => {
                            if (props.onClick) props.onClick(e)
                        }}
                        // unstyled={false}
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    border: 'none',
                                },
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#E4E5E8',
                                paddingLeft: '8px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }),
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: '99',
                            }),
                            menuList: (base) => ({
                                ...base,
                                '::-webkit-scrollbar': {
                                    width: '12px',
                                    height: '15px',
                                    marginBottom: '50px',
                                },
                                '::-webkit-scrollbar-track': {
                                    backgroundColor: 'transparent',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#74D9FF',
                                    border: '3px',
                                    borderStyle: 'solid',
                                    borderColor: 'transparent',
                                    borderRadius: '9px',
                                    backgroundClip: 'content-box',
                                },
                                '::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#74A8FF',
                                    borderRadius: '15px',
                                },
                                marginTop: useBorder ? '' : '-16px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                lineHeight: '20px',
                                borderRadius: '5px',
                                border: '1px',
                                borderColor: '#74D9FF',
                                borderStyle: 'solid',
                                position: 'relative',
                            }),
                            // dropdownIndicator: (base, state) => ({
                            //     ...base,
                            //     display: requiredDropdown,
                            //     transform: state.selectProps.menuIsOpen
                            //         ? 'rotate(180deg)'
                            //         : '',
                            //     transitionProperty: 'all',
                            //     transitionDuration: '0.5s',
                            //     paddingLeft: '2px !important',
                            // }),
                            indicatorSeparator: (base) => ({
                                ...base,
                                display: 'none',
                            }),
                            clearIndicator: (base) => ({
                                ...base,
                                paddingRight: '2px !important',
                                cursor: 'pointer',
                            }),
                            option: (base, { isSelected, isDisabled }) => ({
                                ...base,
                                textAlign: isLoading ? 'center' : 'left',
                                backgroundColor: isSelected
                                    ? '#d2f1fc'
                                    : 'inherit',
                                '&:hover': {
                                    backgroundColor: '#d2f1fc',
                                },
                                color: isDisabled ? '#b7b7b7' : '#424A58',
                                position: 'relative',
                                cursor: 'pointer',
                                paddingLeft: '8px',
                                paddingTop: '4px',
                                paddingBottom: '4px',
                            }),
                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#BEEDFF',
                                marginLeft: '4px',
                                marginTop: '4px',
                                marginBottom: '4px',
                                color: '#0075A1',
                                fontSize: '14px',
                                borderRadius: '5px',
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: 'unset',
                                    color: 'unset',
                                },
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 4,
                        })}
                    />
                ) : (
                    <AsyncSelect
                        loadOptions={props?.loadOptions && props?.loadOptions}
                        className={`${props.className}`}
                        classNamePrefix={'select'}
                        // comment because there are still bugs
                        // components={animatedComponents}
                        closeMenuOnSelect={
                            isMultiSelect === true ? false : true
                        }
                        placeholder={props.placeholder}
                        value={props?.value}
                        isMulti={isMultiSelect}
                        isDisabled={disabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        options={options}
                        isOptionDisabled={(options) =>
                            options?.value === 'loading'
                        }
                        menuPosition="fixed"
                        menuIsOpen={isOpen}
                        onMenuOpen={() => setIsOpen(true)}
                        onMenuClose={() => setIsOpen(false)}
                        maxMenuHeight={115}
                        onFocus={() => {
                            setFocus(true)
                        }}
                        onBlur={() => {
                            setFocus(false)
                        }}
                        onChange={props?.onChange && props.onChange}
                        defaultOptions={props?.defaultOptions}
                        unstyled={false}
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    border: 'none',
                                },
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#E4E5E8',
                                paddingLeft: '8px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }),
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: '99',
                            }),
                            menuList: (base) => ({
                                ...base,
                                '::-webkit-scrollbar': {
                                    width: '12px',
                                    height: '15px',
                                    marginBottom: '50px',
                                },
                                '::-webkit-scrollbar-track': {
                                    backgroundColor: 'transparent',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#74D9FF',
                                    border: '3px',
                                    borderStyle: 'solid',
                                    borderColor: 'transparent',
                                    borderRadius: '9px',
                                    backgroundClip: 'content-box',
                                },
                                '::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#74A8FF',
                                    borderRadius: '15px',
                                },
                                marginTop: useBorder ? '' : '-16px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                lineHeight: '20px',
                                borderRadius: '5px',
                                border: '1px',
                                borderColor: '#74D9FF',
                                borderStyle: 'solid',
                                position: 'relative',
                            }),
                            dropdownIndicator: (base, state) => ({
                                ...base,
                                display: requiredDropdown,
                                transform: state.selectProps.menuIsOpen
                                    ? 'rotate(180deg)'
                                    : '',
                                transitionProperty: 'all',
                                transitionDuration: '0.5s',
                                paddingLeft: '2px !important',
                            }),
                            indicatorSeparator: (base) => ({
                                ...base,
                                display: 'none',
                            }),
                            clearIndicator: (base) => ({
                                ...base,
                                paddingRight: '2px !important',
                                cursor: 'pointer',
                            }),
                            option: (base, { isSelected, isDisabled }) => ({
                                ...base,
                                textAlign: isLoading ? 'center' : 'left',
                                backgroundColor: isSelected
                                    ? '#d2f1fc'
                                    : 'inherit',
                                '&:hover': {
                                    backgroundColor: '#d2f1fc',
                                },
                                color: isDisabled ? '#b7b7b7' : '#424A58',
                                position: 'relative',
                                cursor: 'pointer',
                                paddingLeft: '8px',
                                paddingTop: '4px',
                                paddingBottom: '4px',
                            }),
                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#BEEDFF',
                                marginLeft: '4px',
                                marginTop: '4px',
                                marginBottom: '4px',
                                color: '#0075A1',
                                fontSize: '14px',
                                borderRadius: '5px',
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: 'unset',
                                    color: 'unset',
                                },
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 4,
                        })}
                    />
                )}
            </div>
        </div>
    )
}
export default Dropdown
