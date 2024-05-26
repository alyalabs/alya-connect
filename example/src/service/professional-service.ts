import { Service } from '../../../dist/index.js'

import { ProfessionalDTO } from '#dto/professional-dto.ts'
import { Professional } from '#model/professional.ts'

import { getStore } from '#store.ts'

import { getRandomId } from '#util.ts'

const store = getStore()

const ProfessionalService: Service = {
  async create({ data }: { data: Omit<Professional, 'id'> }): Promise<Professional | null> {
    if (data) {
      const professional: Professional = {
        ...data,
        id: getRandomId()
      }

      store.professionals.push(professional)

      return professional
    }
    
    return null
  }
}

export default ProfessionalService

