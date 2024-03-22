import { ITableColumn } from 'components/table/table.interface'

interface IUserSample {
    name: string
    age: number
    email: string
    address: IAddressSample[]
    col1: string
    col2: string
    col3: string
    col4: string
    col5: string
    col6: string
    col7: string
}

interface IAddressSample {
    street: string
    city: string
    postalCode: string
    country: string
    col1: string
    col2: string
    col3: string
    col4: string
    col5: string
    col6: string
}

// header
export const userHeaderSample: ITableColumn[] = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'email', label: 'Email' },
    { accessor: 'address', label: 'Address' },
    { accessor: 'col1', label: 'Col1' },
    { accessor: 'col2', label: 'Col2' },
    { accessor: 'col3', label: 'Col3' },
    { accessor: 'col4', label: 'Col4' },
    { accessor: 'col5', label: 'Col5' },
    { accessor: 'col6', label: 'Col6' },
    { accessor: 'col7', label: 'Col7' },
]
export const addressHeaderSample: ITableColumn[] = [
    { accessor: 'street', label: 'Street' },
    { accessor: 'city', label: 'City' },
    { accessor: 'postalCode', label: 'PostalCode' },
    { accessor: 'country', label: 'Country' },
    { accessor: 'col1', label: 'Col1' },
    { accessor: 'col2', label: 'Col2' },
    { accessor: 'col3', label: 'Col3' },
    { accessor: 'col4', label: 'Col4' },
    { accessor: 'col5', label: 'Col5' },
    { accessor: 'col6', label: 'Col6' },
]

// Example data:
const addressSample: IAddressSample[] = [
    {
        street: '123 Main St',
        city: 'Cityville',
        postalCode: '12345',
        country: 'Countryland',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
    },
    {
        street: '456 Oak Ave',
        city: 'Townsville',
        postalCode: '54321',
        country: 'Countryland',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
    },
    {
        street: '789 Pine Rd',
        city: 'Villagetown',
        postalCode: '67890',
        country: 'Countryland',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
    },
    {
        street: '101 Elm Blvd',
        city: 'Hamletville',
        postalCode: '98765',
        country: 'Countryland',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
    },
    {
        street: '202 Maple Ln',
        city: 'Ruraltown',
        postalCode: '56789',
        country: 'Countryland',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
    },
]

export const userSample: IUserSample[] = [
    {
        name: 'Alice',
        age: 25,
        email: 'alice@example.com',
        address: addressSample,
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
        col7: 'col7',
    },
    {
        name: 'Bob',
        age: 30,
        email: 'bob@example.com',
        address: addressSample,
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
        col5: 'col5',
        col6: 'col6',
        col7: 'col7',
    },
]
