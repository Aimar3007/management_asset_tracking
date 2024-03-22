import Dropdown from 'components/dropdown/dropdown.component'
import Input from 'components/input/input.component'
import {
    dropdownContentGoodsValue,
    inputContentGoodsValue,
} from '../create-booking.static'

const GoodsValue = () => {
    return (
        <div className="goods-value detail-content pt-2">
            <div className="grid grid-cols-2 ">
                <div className="grid grid-rows-3 grid-flow-col gap-x-2 gap-y-4">
                    {inputContentGoodsValue.map((item) => (
                        <Input
                            label={item.label}
                            placeholder={item.placeholer}
                            className="w-[100%]"
                        />
                    ))}
                    {dropdownContentGoodsValue.map((item) => (
                        <Dropdown
                            label={item.label}
                            options={item.option}
                            isSearchable={false}
                            readonly={true}
                            dropDownIndicator={true}
                            placeholder={item.placeholer}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GoodsValue
