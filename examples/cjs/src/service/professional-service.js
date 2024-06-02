const { getStore } = require('#store.js')

const { getRandomId } = require('#util.js')

const store = getStore()

const ProfessionalService = {
  async create({ data }) {
    if (data) {
      const professional = {
        ...data,
        id: getRandomId()
      }

      store.professionals.push(professional)

      return professional
    }
    
    return null
  }
}

module.exports = ProfessionalService

