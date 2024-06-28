import express, { Express, Request, Response } from 'express'

import alyaConnect, { type AlyaConnect } from 'alya-connect'

import ProfessionalService from '#service/professional-service.js'
import ProfessionalUniversityService from '#service/professional-university-service.js'

async function main() {
  const app: Express = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  alyaConnect.setup({
    services: [
      ProfessionalService,
      ProfessionalUniversityService
    ]
  })

  const adapter = async function (req: Request, res: Response) {
    const body = req.body
    
    console.log('body', body)

    if (body) {
      let payloads = []

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
  
  app.post('/api/v1/main', adapter)

  app.listen(3000, () => {
    console.log('Server started on port 3000')
  })
}

main()














































