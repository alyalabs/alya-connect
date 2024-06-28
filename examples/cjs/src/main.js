const alyaConnect = require('alya-connect')

const ProfessionalService = require('#service/professional-service.js')
const ProfessionalUniversityService = require('#service/professional-university-service.js')

const { getStore } = require('#store.js')

const { getRandomId } = require('#util.js')

async function main() {
  console.log(alyaConnect)
  
  alyaConnect.setup({
    services: [
      ProfessionalService,
      ProfessionalUniversityService
    ]
  })

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
        foreignKey: 'professionalId',
        references: 'id',
      }
    ]
  }

  try {
    let firstCallResponse = await alyaConnect.handlePayloads([carlosPayload, carlosUniversityPayload])

    if (firstCallResponse) {
      console.log('firstCallResponse', firstCallResponse)

      const store = getStore()
      console.log(store)
    }

    let secondCallResponse = await alyaConnect.handlePayloads([carlosPayload, carlosUniversityPayload])

    if (secondCallResponse) {
      console.log('secondCallResponse', secondCallResponse)

      const store = getStore()
      console.log(store)
    }

    let thirdCallResponse = await alyaConnect.handlePayloads([carlosPayload])

    if (thirdCallResponse) {
      console.log('thirdCallResponse', thirdCallResponse)

      const store = getStore()
      console.log(store)
    }
    
  } catch (err) {
    console.error(err)
  }
}

main()














































