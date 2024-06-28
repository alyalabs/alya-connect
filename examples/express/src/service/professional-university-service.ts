import { readFile } from 'node:fs/promises'

import type { AlyaConnect } from 'alya-connect'

import { ProfessionalUniversityDTO } from '#dto/professional-university-dto.js'
import { ProfessionalUniversity } from '#model/professional-university.js'

import { getStore } from '#store.js'

import { getRandomId } from '#util.js'

const store = getStore()

const ProfessionalUniversityService: AlyaConnect.Service = {
  name: 'ProfessionalUniversityService',

  async create({ data }: { data: Omit<ProfessionalUniversity, 'id'> }): Promise<ProfessionalUniversity | null> {
    if (data) {
      const professionalUniversity: ProfessionalUniversity = {
        ...data,
        id: getRandomId(),
      }

      store.professionalUniversities.push(professionalUniversity)

      //await readFile('./test.txt', 'utf-8')

      return professionalUniversity
    }
    
    return null
  }
}

export default ProfessionalUniversityService

