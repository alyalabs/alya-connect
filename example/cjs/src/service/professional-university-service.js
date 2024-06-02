const { readFile } = require('node:fs/promises')

const { getStore } = require('#store.js')

const { getRandomId } = require('#util.js')

const store = getStore()

const ProfessionalUniversityService = {
  async create({ data }) {
    if (data) {
      const professionalUniversity = {
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

module.exports = ProfessionalUniversityService

