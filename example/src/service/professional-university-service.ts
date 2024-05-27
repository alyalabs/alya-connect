import { readFile } from 'node:fs/promises'

import { Service } from '../../../dist/index.js'

import { ProfessionalUniversityDTO } from '#dto/professional-university-dto.ts'
import { ProfessionalUniversity } from '#model/professional-university.ts'

import { getStore } from '#store.ts'

import { getRandomId } from '#util.ts'

const store = getStore()

const ProfessionalUniversityService: Service = {
  async create({ data }: { data: Omit<ProfessionalUniversity, 'id'> }): Promise<ProfessionalUniversity | null> {
    if (data) {
      const professionalUniversity: ProfessionalUniversity = {
        ...data,
        id: getRandomId(),
      }

      store.professionalUniversities.push(professionalUniversity)

      await readFile('./test.txt', 'utf-8')

      return professionalUniversity
    }
    
    return null
  }
}

export default ProfessionalUniversityService

