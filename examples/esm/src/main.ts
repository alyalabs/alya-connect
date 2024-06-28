import alyaConnect, { type AlyaConnect } from 'alya-connect'

import ProfessionalService from '#service/professional-service.js'
import ProfessionalUniversityService from '#service/professional-university-service.js'

import { ProfessionalDTO } from '#dto/professional-dto.js'
import { ProfessionalUniversityDTO } from '#dto/professional-university-dto.js'

import { getStore } from '#store.js'

import { getRandomId } from '#util.js'

async function main() {
  alyaConnect.setup({
    services: [
      ProfessionalService,
      ProfessionalUniversityService
    ],
  })

  const carlos: ProfessionalDTO = {
    name: 'Carlos Eduardo',
  }

  const carlosUniversity: ProfessionalUniversityDTO = {
    universityId: 1,
    startYear: 2010,
    endYear: 2020
  }

  const carlosPayloadId = getRandomId().toString()

  const carlosPayload: AlyaConnect.Payload = {
    id: carlosPayloadId,
    service: 'ProfessionalService',
    method: 'create',
    data: carlos
  }

  const carlosUniversityPayload: AlyaConnect.Payload = {
    id: getRandomId().toString(),
    service: 'ProfessionalUniversityService',
    method: 'create',
    data: carlosUniversity,
    dependsOn: [
      {
        id: carlosPayloadId,
        foreignKey: 'professionalId',
        references: 'id',
      }
    ]
  }

  try {
    let firstCallResponse: AlyaConnect.Response = await alyaConnect.handlePayloads([carlosPayload, carlosUniversityPayload])

    if (firstCallResponse) {
      console.log('firstCallResponse', firstCallResponse)

      const store = getStore()
      console.log('store:', store)
    }

    let secondCallResponse = await alyaConnect.handlePayloads([carlosPayload, carlosUniversityPayload])

    if (secondCallResponse) {
      console.log('secondCallResponse', secondCallResponse)

      const store = getStore()
      console.log('store:', store)
    }

    let thirdCallResponse = await alyaConnect.handlePayloads([carlosPayload])

    if (thirdCallResponse) {
      console.log('thirdCallResponse', thirdCallResponse)

      const store = getStore()
      console.log('store:', store)
    }
    
  } catch (err) {
    console.error(err)
  }
}

main()














































