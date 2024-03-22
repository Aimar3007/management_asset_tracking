/* eslint-disable no-unused-vars */
import { IMeta } from 'common/common.interface'

export interface IPagination {
    meta: IMeta
    nextHandling: (nextIndex: number) => void
    previousHandling: (prevIndex: number) => void
}
