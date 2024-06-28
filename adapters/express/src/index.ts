
import type { Request, Response } from 'express'
import type { AlyaConnect } from '../../../dist/esm/index.js'

export function createExpressAdapter(alyaConnect: AlyaConnect.Core) {
  return async function (req: Request, res: Response) {
    const body = req.body
      
    if (body) {
      let payloads: Array<AlyaConnect.Payload> = []
  
      if (typeof body === 'object' && Object.keys(body).length > 0) {
        payloads.push(body)
      }
  
      if (Array.isArray(body)) {
        payloads = body
      }
  
      if (payloads.length > 0) {
        try {
          const response = await alyaConnect.handlePayloads(payloads)
    
          if (response) {
            res.json(response)
            return
          }
        } catch (err) {
          res.sendStatus(500)
          return
        }
      }
    }
  
    res.sendStatus(400)
  }
}
