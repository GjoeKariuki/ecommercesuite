import {Request} from 'express'

export interface DecodedData {
    id: string
    userName: string
    fullName: string
    email: string
    phoneNumber: number
    roles: string
}

export interface User{
    id:string
    userName:string
    fullName:string
    email:string
    phoneNumber:number
    password:string
    roles:string
    isDeleted:number
}

export interface UserExtendedRequest extends Request{
    body:{
        userName:string
        fullName:string
        email:string
        phoneNumber:number
        password:string    
    }
}

export interface iProducts {
    PID:string
    PNAME:string
    PDESCRIPTION:string
    PIMAGE:string
    PRICE:number
    ISDELETED: number
}
export interface ProductExtendedRequest extends Request {
    body: {
        pname:string
        pdescription:string
        pimage:string
        price:number
    }
    info?: DecodedData
    params: {
        id: string;
        pid: string;
    }
}

export interface iorders {
    ORDERID:string
    PID:string
    PNAME:string
    PCOUNT:string
    PRICE:number
    ISDELETED: number
}
export interface OrderExtendedRequest extends Request {
    body: {
        pid:string
        pname:string
        price:number
        pcount:number

    }
    info?: DecodedData
    params: {
        id: string;
        pid:string;
        orderid:string
    }
}


export interface iCart {
    PID:string
    PNAME:string
    PDESCRIPTION:string
    PRICE:number
    PCOUNT:number
}

export interface CartExtendedRequest extends Request {
    body: {
        pname:string
        pdescription:string
        price:number
    }
}





  

    
   
  


