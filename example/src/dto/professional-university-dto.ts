import { ProfessionalUniversity } from '#model/professional-university.ts'

export type ProfessionalUniversityDTO = Pick<ProfessionalUniversity, 'universityId' | 'startYear' | 'endYear'>

