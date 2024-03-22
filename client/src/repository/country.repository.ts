import { IDropdownItem } from 'components/dropdown/dropdown.interface'
import { ICountry } from './data/country.interface'
import json from './data/country.json'

export const getCountryDropdown = (): IDropdownItem<ICountry>[] => {
    const countryJson = json as unknown[] as ICountry[]
    const countryDropdown: IDropdownItem<ICountry>[] = countryJson.map(
        (data: ICountry) => {
            const dropdown: IDropdownItem<ICountry> = {
                label: data.alpha2 + ' - ' + data.name,
                value: data.alpha2,
            }
            return dropdown
        },
    )
    return countryDropdown
}
