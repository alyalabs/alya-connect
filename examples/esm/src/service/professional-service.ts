import { AlyaConnect } from 'alya-connect'

import { ProfessionalDTO } from '#dto/professional-dto.js'
import { Professional } from '#model/professional.js'

import { getStore } from '#store.js'

import { getRandomId } from '#util.js'

const store = getStore()

const ProfessionalService: AlyaConnect.Service = {
  name: 'ProfessionalService',
  
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

