import { ProfessionalUniversity } from '#model/professional-university.js'

export type ProfessionalUniversityDTO = Pick<ProfessionalUniversity, 'universityId' | 'startYear' | 'endYear'>

