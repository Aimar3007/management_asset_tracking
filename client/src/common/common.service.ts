import axios, { AxiosResponse } from 'axios'
import { IFetch, IPost } from './common.interface'
import { removeSession } from 'pages/login/login.slice'
import { useEffect } from 'react'
import moment from 'moment'

const BASE_URL = process.env.REACT_APP_API_URL
const client = process.env.REACT_APP_CLIENT ?? ''

export const fetch = async <D, T>(props: IFetch<T>) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            BASE_URL + props.endpoint,
            {
                params: props.params,
            },
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeSession()
            throw new Error('Unauthorized Access: Please log in')
        } else {
            throw new Error('No Data Available')
        }
    }
}

export const post = async <D, T>(props: IPost<T>) => {
    const response: AxiosResponse<D> = await axios.post(
        BASE_URL + props.endpoint,
        props?.payload,
        {
            headers: {
                'Content-Type': props?.isFormData
                    ? 'multipart/form-data'
                    : 'application/json',
            },
        },
    )

    if (response.status === 401) {
        removeSession()
    }
    return response.data
}

export const put = async <D, T>(props: IPost<T>) => {
    const response: AxiosResponse<D> = await axios.put(
        BASE_URL + props.endpoint,
        props?.payload,
    )

    if (response.status === 401) {
        removeSession()
    }
    return response.data
}

export const isAccessible = (clientAccessList?: string[]) => {
    if (clientAccessList === undefined) return false
    if (client === undefined) return false
    if (!clientAccessList.includes(client)) {
        return false
    }
    return true
}
/**
 * Hook that alerts clicks outside of the passed refCombine words with spaces and change the first letter of each word to uppercase
 */
export function useOutsideClickHandling(ref: any, func: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                func()
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

export const formatDate = (dateString: string) => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY')
    return formattedDate
}
