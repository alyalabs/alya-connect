import AlyaConnect, {
  Payload
} from '../../dist/index.js'

import ProfessionalService from '#service/professional-service.ts'
import ProfessionalUniversityService from '#service/professional-university-service.ts'

import { ProfessionalDTO } from '#dto/professional-dto.ts'
import { ProfessionalUniversityDTO } from '#dto/professional-university-dto.ts'

import { getStore } from '#store.ts'

import { getRandomId } from '#util.ts'

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
    await AlyaConnect.handle([carlosPayload, carlosUniversityPayload])
    
    const store = getStore()

    console.log(store)
  } catch (err) {
    console.error(err)
  }
}

main()














































