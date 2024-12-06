export interface User{
    id: string,
    publicKey: CryptoKey
}

export interface ChatInfo{
    sender:string,
    recipient:string,
    message:string,
    time: number,
}

export interface UserMessageDTO{
    reciever: string,
    message: string,
    time: number
}

export interface Message{
    device: string,
    message: string
}

export interface UserPublicKey{
    device: string,
    key: string
}