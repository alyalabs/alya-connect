import { nanoid } from 'nanoid'

import {
  DEV_MODE,
  GENERATE_IDS
} from '#flags.js'

let services = {}

let mutators = []

let cache = []

let response = []

function log() {
  if (DEV_MODE) console.log('alya-connect >', ...arguments)
}

function addToCache(value) {
  cache.push(value)
}

function clearCache() {
  cache = []
}
''
function addToResponse(obj) {
  response = { ...response, ...obj }
}

function clearResponse() {
  response = {}
}

function wasProcessedSuccessfully(payloadId) {
  for (let i = 0; i < cache.length; i++) {
    const entry = cache[i]
    const id = entry[0]

    if (payloadId === id) return i
  }

  return false
}

function getKeyFromPayload(index, key) {
  log('getKeyFromPayload called!')
  log('getKeyFromPayload > result:', cache[index][1])

  return cache[index][1][key]
}

async function callMethod(payload, data) {
  log('callMethod called!')
  log('callMethod > payload:', payload)
  log('callMethod > data:', data)

  let serviceName = payload.service
  let method = payload.method
  let params = payload.params || {}

  let service = services[serviceName]

  if (service && service[method] && typeof service[method] === 'function') {
    try {
      let result = await service[method]({ params, data })

      if (result) {
        addToCache([payload.id, result])
  
        addToResponse({
          [payload.id]: {
            status: 'success',
            result: result
          }
        })
      }
    } catch (err) {
      addToResponse({
        [payload.id]: {
          status: 'error',
          error: {
            name: err.name,
            message: err.message,
          }
        }
      })
    }
  } 
}

function associate(payload, data) {
  log('associate called!')

  if (payload.dependsOn) {
    if (!Array.isArray(payload.dependsOn)) {
      payload.dependsOn = [payload.dependsOn]
    }

    for (let relationship of payload.dependsOn) {
      const cacheEntryIndex = wasProcessedSuccessfully(relationship.id) //payloadId

      if (cacheEntryIndex !== false) {
        data[relationship.foreignKey] = getKeyFromPayload(cacheEntryIndex, relationship.primaryKey)
      }
    }
  }
}

async function handlePayload(payload, hasRelationship = false) {
  log('handlePayload called!')

  if (GENERATE_IDS && !payload.id) {
    payload.id = nanoid()
  }

  let data = payload.data || {}

  for (let key of Object.keys(data)) {
    for (let mutator of mutators) {
      log('mutator:', mutator)
      
      mutator(data, key)
    }
  }

  if (hasRelationship) associate(payload, data)

  log('handlePayload > data:', data)

  await callMethod(payload, data)
}

export function registerService(serviceName, service) {
  log('registerService called!')
  log('registerService > serviceName:', serviceName)

  services = { ...services, [serviceName]: service }
}

export function addMutator(mutator) {
  log('addMutator called!')

  mutators = [...mutators, mutator]
}

export async function handler(req, res) {
  log('handler called!')

  let payloads = req.body || []

  if (!Array.isArray(payloads)) {
    payloads = [payloads]
  }

  if (payloads) {
    try {
      for (let payload of payloads) {
        log('handler > payload:', payload)
        log('handler > payload dependsOn:', payload.id, payload.dependsOn)
  
        /* TODO
        if (payload.type === 'array') {
          log('array payload')
        }
        */
  
        if (!payload.dependsOn) {
          await handlePayload(payload)
        }
      }
  
      for (let payload of payloads) {
        if (payload.status !== 'success') {
          if (payload.dependsOn) {
            /* TODO
            if (payload.type === 'array') {
              log('array payload')
            }
            */
           
            await handlePayload(payload, true)
          }
        }
      }

      res.send(response)

      clearCache()
      clearResponse()

    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  } else {
    res.sendStatus(400)
  }
}
