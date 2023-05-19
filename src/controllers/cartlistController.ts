import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import { iCart, cartExtendedRequest } from '../Interfaces'
import { ControllerHelpers } from '../DatabaseHelpers'

// interface iCart {
//     PID:string
//     PNAME:string
//     PDESCRIPTION:string
//     PRICE:number
//     PCOUNT:number
// }

// interface cartExtendedRequest extends Request {
//     body: {
//         pname:string
//         pdescription:string
//         price:number
//     }
// }


export const addItemtoCart = async (req: cartExtendedRequest, res: Response) => {
    try {
        const generatedId = uid();
        const { id } = req.params;
        // const pool = await mssql.connect(sqlConfig)
        const { cartid, pname, pdescription, price } = req.body;
        await ControllerHelpers.exec('addtoCart', { pid: id, cartid: pname, pname: generatedId, pdescription, price });
        // await pool.request()
        // .input('pid',id)
        // .input('pname',pname)
        // .input('pdescription',pdescription)
        // .input('price',price)
        // .execute('addtoCart')

        return res.status(201).json({message:"item added successfully"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const viewCartItems = async(req:Request, res:Response) => {

    try {
     //   const pool = await mssql.connect(sqlConfig)
        
        let item:iCart[] = await (await ControllerHelpers
        .exec('viewCart')).recordset
        return res.status(200).json(item)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}



export const updateCartItems = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      // const pool = await mssql.connect(sqlConfig)
      const { cartid, pname, pdescription, price } = req.body;
  
      // Check if the item exists before updating
      let items: iCart[] = await (await ControllerHelpers.exec('viewCart')).recordset;
      let item = items.find(item => item.PID === id);
      if (!item) {
        return res.status(404).json({ message: "Item does not exist" });
      }
  
      await ControllerHelpers.exec('updateItemCart', { pid: id, cartid, pname, pdescription, price });
      // await pool.request()
      //   .input('pid', id)
      //   .input('cartid', cartid)
      //   .input('pname', pname)
      //   .input('pdescription', pdescription)
      //   .input('price', price)
      //   .execute('updateItemCart');
  
      return res.status(200).json({ message: "Item updated successfully" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  
  

// EXEC removeItemfromCart '23423'
export const removeCartItem = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      await ControllerHelpers.exec('removeItemfromCart', { pid: id });
      return res.status(200).json({ message: "Item removed from list" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  };
  