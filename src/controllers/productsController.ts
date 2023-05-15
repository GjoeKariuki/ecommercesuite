import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'

interface DecodedData {
    id: string
    userName: string
    fullName: string
    email: string
    phoneNumber: number
    roles: string
  }
interface iProducts {
    PID:string
    PNAME:string
    PDESCRIPTION:string
    PIMAGE:string
    PRICE:number
    ISDELETED: number
}

interface ExtendedRequest extends Request {
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
  



// add product
export const addProduct = async(req:ExtendedRequest, res:Response) => {
    try {
        console.log(req.info?.roles);
        if ( req.info && req.info?.roles === 'admin') {
   
      
        let id = uid()
        console.log(id);
        
        const pool = await mssql.connect(sqlConfig)
        const {pname,pdescription, pimage, price} = req.body
        await pool.request()

        .input('pid',id)
        .input('pname',pname)
        .input('pdescription',pdescription)
        .input('pimage',pimage)
        .input('price',price)
        .execute('addProduct')


        return res.status(201).json({message:"product added successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

// get each product
export const getProduct:RequestHandler<{id:string}> = async(req,res) => {
    try {
        const {id} = req.params
        const pool = await mssql.connect(sqlConfig)
        // console.log(productId)
        let product:iProducts = (await (pool.request())
        .input('pid',id)
        .execute('getproductByid')).recordset[0]

        if(!product){
            return res.status(404).json({message:"product not exists"})
        }
        return res.status(200).json(product)
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// get all products
export const getallProducts = async(req:Request, res:Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        let products:iProducts[] = (await pool.request()
        .execute('getAllproducts')).recordset
        return res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const UpdateProduct = async(req:Request<{id:string}>, res:Response) => {
    try {
        const {id} = req.params
        const pool = await mssql.connect(sqlConfig)
        let product:iProducts[] = (await pool.request()
        .input('pid',id)
        .execute('getproductByid')).recordset
        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }
        const {pname, pdescription, pimage, price} = req.body

        await pool.request()
        .input('pid',id)
        .input('pname', pname)
        .input('pdescription', pdescription)
        .input('pimage', pimage)
        .input('price', price)
        .execute('updateProduct')

        return res.status(200).json({message:"product update successfully"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const deleteProduct = async(req:ExtendedRequest, res:Response) => {

    try {
       
        const pool = await mssql.connect(sqlConfig)
        const {id} = req.params
        let product:iProducts[] = (await pool.request()

        .input('pid',id)
        .execute('getproductByid')).recordset


        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }

        if (req.info?.roles == 'admin') {
        await pool.request().input('pid',id).execute('deleteproduct')

        await pool.request()
        .input('pid',id)
        .execute('deleteProduct')

        return res.status(200).json({message:"product deleted successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}