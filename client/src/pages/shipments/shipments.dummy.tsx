/* eslint-disable no-unused-vars */
import { IMeta } from 'common/common.interface'

export const metaDummy: IMeta = {
    current_page: 1,
    last_page: 2,
    from: 1,
    to: 50,
    total_Items: 100,
    per_page: 0,
    total_page: 0,
    index_end: 0,
    index_start: 0,
}

// for testing
export interface IHeader<T> {
    label: string
    accessor: keyof T
    customBuild?: (data: T[keyof T] | string) => JSX.Element
}

export interface IDummyTest {
    company: string
    location: string
    city: string[]
    user: IUserTest[]
}

export interface IUserTest {
    name: string
    age: number
}

export const headerTest: IHeader<IDummyTest>[] = [
    {
        label: 'Company',
        accessor: 'company',
    },
    {
        label: 'Location',
        accessor: 'location',
        customBuild: (data) => {
            if (typeof !data === 'string') <></>
            const dataLocation = data as string
            return <div style={{ color: 'red' }}>{dataLocation}</div>
        },
    },
    {
        label: 'User name',
        accessor: 'user',
        customBuild: (data) => {
            if (typeof data === 'string') <></>
            const userData = data as IUserTest[] // Tipe data adalah IUserTest[]
            return (
                <div>
                    {userData.map((user) => (
                        <div key={user.name}>{user.name}</div>
                    ))}
                </div>
            )
        },
    },
    {
        label: 'City',
        accessor: 'city',
        customBuild: (data) => {
            if (typeof !data === 'string') <></>
            const dataCity = data as string[]
            return <div style={{ color: 'red' }}>{dataCity.map((x) => x)}</div>
        },
    },
]

export const dummyTest: IDummyTest[] = [
    {
        company: 'company 1',
        location: 'indonesia',
        city: ['banjarmasin', 'jakarta'],
        user: [
            {
                name: 'edo',
                age: 25,
            },
            {
                name: 'ali',
                age: 25,
            },
        ],
    },
]
