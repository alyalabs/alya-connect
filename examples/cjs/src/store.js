
const store = {
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

function getStore() {
  return store
}

module.exports = {
  getStore
}
