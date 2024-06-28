import express, { Express, Request, Response } from 'express'

import alyaConnect from 'alya-connect'
import { createExpressAdapter } from 'alya-connect-adapter-express'

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

  const alyaExpress = createExpressAdapter(alyaConnect)

  app.use('/api/v1/main', alyaExpress)

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello Alya!')
  })

  app.listen(3000, () => {
    console.log('Server started on port 3000')
  })
}

main()














































