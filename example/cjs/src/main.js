const { AlyaConnect } = require('../../../dist/cjs/index.js')

const ProfessionalService = require('#service/professional-service.js')
const ProfessionalUniversityService = require('#service/professional-university-service.js')

const { getStore } = require('#store.js')

const { getRandomId } = require('#util.js')

async function main() {
  
  console.log(AlyaConnect)

  AlyaConnect.registerService('ProfessionalService', ProfessionalService)
  AlyaConnect.registerService('ProfessionalUniversityService', ProfessionalUniversityService)

  const carlos = {
    name: 'Carlos Eduardo',
  }

  const carlosUniversity = {
    universityId: 1,
    startYear: 2010,
    endYear: 2020
  }

  const carlosPayloadId = getRandomId().toString()

  const carlosPayload = {
    id: carlosPayloadId,
    service: 'ProfessionalService',
    method: 'create',
    data: carlos
  }

  const carlosUniversityPayload = {
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














































