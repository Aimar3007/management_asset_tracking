import axios, { AxiosResponse } from 'axios'
import { IBlob, IFetch, IFetchOptions, IPost, IRoute } from './common.interface'
import moment from 'moment'
import { routes } from './common.static'
import { useEffect } from 'react'
import { removeSession } from 'pages/login/login.slice'

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

export const fetchOptions = async <D>(props: IFetchOptions) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            BASE_URL + props.endpoint,
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
            params: props?.params,
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

export const fecthBlob = async <D, T>(props: IBlob<T>) => {
    try {
        const response: AxiosResponse<D> = await axios.get(
            BASE_URL + props.endpoint,
            {
                params: props?.params,
                responseType: 'blob',
            },
        )
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            removeSession()
            throw new Error('Unauthorized Access: Please log in')
        } else {
            throw new Error('No Data Available')
        }
    }
}

export const isAccessible = (clientAccessList?: string[]) => {
    if (clientAccessList === undefined) return false
    if (client === undefined) return false
    if (!clientAccessList.includes(client)) {
        return false
    }
    return true
}

export const getClient = () => {
    return client
}

export const formatDateTime = (dateString: string) => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY, HH:mm')
    return formattedDate
}

export const formatDate = (dateString: string) => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY')
    return formattedDate
}

export const formatDateDash = (dateString: string) => {
    const formattedDate = moment(dateString).format('DD-MM-YYYY')
    return formattedDate
}

export const getRoutesByClient = (): IRoute[] => {
    const newRoutes = routes.map((data) => {
        if (!data.client?.includes(client)) {
            return undefined
        }

        let sub = data.sub
        if (sub) {
            sub = sub?.filter((dataSub) => {
                if (!dataSub.client?.includes(client)) {
                    return false
                }
                return true
            })
        } else {
            sub = []
        }
        return { ...data, sub }
    })

    const tmp: IRoute[] = []
    newRoutes.forEach((data) => {
        if (!data || data === undefined) return
        tmp.push(data)
        return true
    })

    return tmp
}

export const getModuleParentId = () => {
    const data = getRoutesByClient()
    let parentIds: string[] = []

    data.forEach((dt) => {
        if (!dt.parentId) {
            return
        }

        parentIds.push(dt.parentId)

        let sub: IRoute[] | undefined = dt.sub
        if (sub) {
            sub?.forEach((dtSub) => {
                if (!dtSub.parentId) {
                    return
                }
                parentIds.push(dtSub.parentId)
            })
        }
    })
    return parentIds
}

export const toCamelCase = (str: string) => {
    // Split kata-kata berdasarkan spasi atau underscore
    const words = str.split(/\s|_/)

    // Ubah setiap kata menjadi camelCase
    const camelCaseWords = words.map((word, index) => {
        // Pada kata pertama, gunakan huruf kecil
        if (index === 0) {
            return word.toLowerCase()
        }

        // Pada kata lainnya, gunakan huruf besar di awal
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })

    // Gabungkan kata-kata menjadi satu string
    return camelCaseWords.join('')
}

export const revertToTitleCase = (str: string) => {
    // Breaks a string into an array of words
    let words = str.match(/[A-Za-z][a-z]*/g) || []

    // Combine words with spaces and change the first letter of each word to uppercase
    return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const numberWithCommas = (x: string) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const capitalizeFirstLetter = (str: string) => {
    const words = str.split(/\s|_/)

    const CapitalizedFirstLetter = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })

    return CapitalizedFirstLetter.join(' ')
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

// format curreny usd
export const formatCurrencyUsd = (param: number | string) => {
    return (Number(param) || 0)
        .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        .replaceAll('$', '')
}

// copy text to clipboard
export const copyTextToClipboard = (id: string) => {
    // Mengambil elemen div berdasarkan ID
    const divElement = document.getElementById(id)

    // Mengambil nilai teks dari elemen div
    const textValue: any = divElement?.textContent

    // Menyalin teks ke clipboard
    navigator.clipboard
        .writeText(textValue)
        .then(() => {
            // Mengubah ikon menjadi tanda centang setelah berhasil disalin ke clipboard
            const iconElement = divElement?.querySelector('.ri-file-copy-line')
            if (iconElement) {
                iconElement.className = 'ri-check-line'

                // Setelah 1.5 detik, kembalikan ikon ke ikon semula
                setTimeout(() => {
                    iconElement.className = 'ri-file-copy-line cursor-pointer'
                }, 1500)
            }
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err)
        })
}

export function changeInputValueToZero(id: string, value: string): void {
    // Mendapatkan referensi ke elemen input berdasarkan ID
    const myInput: HTMLInputElement | null = document.getElementById(
        id,
    ) as HTMLInputElement

    // Memastikan elemen ditemukan sebelum mengubah nilai
    if (myInput && value === '') {
        // Mengubah nilai elemen input
        myInput.value = '0'
    }
}
