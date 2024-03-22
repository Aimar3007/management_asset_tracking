import { Buffer } from 'buffer'
export function encrypt(text: string) {
    return Buffer.from(text, 'utf-8').toString('base64')
}

export function decrypt(text: string) {
    return Buffer.from(text, 'base64').toString('utf-8')
}
