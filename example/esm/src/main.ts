import {
  AlyaConnect,
  Payload
} from '../../../dist/esm/index.js'

import ProfessionalService from '#service/professional-service.js'
import ProfessionalUniversityService from '#service/professional-university-service.js'

import { ProfessionalDTO } from '#dto/professional-dto.js'
import { ProfessionalUniversityDTO } from '#dto/professional-university-dto.js'

import { getStore } from '#store.js'

import { getRandomId } from '#util.js'

async function main() {
  AlyaConnect.registerService('ProfessionalService', ProfessionalService)
  AlyaConnect.registerService('ProfessionalUniversityService', ProfessionalUniversityService)

  const carlos: ProfessionalDTO = {
    name: 'Carlos Eduardo',
  }

  const carlosUniversity: ProfessionalUniversityDTO = {
    universityId: 1,
    startYear: 2010,
    endYear: 2020
  }

  const carlosPayloadId = getRandomId().toString()

  const carlosPayload: Payload = {
    id: carlosPayloadId,
    service: 'ProfessionalService',
    method: 'create',
    data: carlos
  }

  const carlosUniversityPayload: Payload = {
    id: getRandomId().toString(),
    service: 'ProfessionalUniversityService',
    method: 'create',
    data: carlosUniversity,
    dependsOn: [
      {
        id: carlosPayloadId,
        primaryKey: 'id',
        foreignKey: 'professionalId'
      }
    ]
  }

  try {
    let firstCallResponse = await AlyaConnect.handle([carlosPayload, carlosUniversityPayload])

    if (firstCallResponse) {
      console.log(firstCallResponse)

      const store = getStore()
      console.log(store)
    }

    let secondCallResponse = await AlyaConnect.handle([carlosPayload, carlosUniversityPayload])

    if (secondCallResponse) {
      console.log(secondCallResponse)

      const store = getStore()
      console.log(store)
    }

    let thirdCallResponse = await AlyaConnect.handle([carlosPayload])

    if (thirdCallResponse) {
      console.log(thirdCallResponse[0])

      const store = getStore()
      console.log(store)
    }
    
  } catch (err) {
    console.error(err)
  }
}

main()














































