import { University } from '#model/university.ts'
import { Professional } from '#model/professional.ts'
import { ProfessionalUniversity } from '#model/professional-university.ts'

type Store = {
  universities: University[],
  professionals: Professional[],
  professionalUniversities: ProfessionalUniversity[]
}

const store: Store = {
  universities: [
    {
      id: 1,
      name: 'University of Cambridge'
    },
    {
      id: 2,
      name: 'University of Manchester'
    }
  ],
  professionals: [],
  professionalUniversities: []
}

export function getStore(): Store {
  return store
}
