import { nanoid } from 'nanoid'

import { STATUS } from './constants.js'

import {
  DEV_MODE,
  GENERATE_IDS
} from './flags.js'

import type { AlyaConnect } from './index.js'

const services = new Map<string, AlyaConnect.Service>()

let mutators: AlyaConnect.Mutator[] = []

const cache = new Map<string, any>()

let response: Record<string, any> = []

function log(...args: any[]) {
  if (DEV_MODE) console.log('alya-connect >', ...args)
}

function addToCache(key: string, value: any) {
  cache.set(key, value)
}

function clearCache() {
  cache.clear()
}

function addToResponse(obj: Record<string, any>) {
  response = { ...response, ...obj }
}

function clearResponse() {
  response = {}
}

async function callMethod(payload: AlyaConnect.Payload, data: Record<string, any>) {
  log('callMethod called!')
  log('callMethod > payload:', payload)
  log('callMethod > data:', data)

  const serviceName = payload.service
  const methodName = payload.method
  const params = payload.params || {}

  if (services.has(serviceName)) {
    const service = services.get(serviceName)
    
    if (service && service[methodName] && typeof service[methodName] === 'function') {
      const serviceMethod = service[methodName] as AlyaConnect.ServiceMethod
  
      try {
        const result = await serviceMethod({ params, data })
  
        if (result) {
          addToCache(payload.id!, result)
    
          addToResponse({
            [payload.id!]: {
              status: STATUS.SUCCESS,
              result: result
            }
          })
        }
      } catch (err: any) {
        addToResponse({
          [payload.id!]: {
            status: STATUS.ERROR,
            error: {
              name: err.name,
              message: err.message,
            }
          }
        })
      }
    }
  }
}

function hasValidCacheEntryValue(payloadId: string) {
  if (cache.has(payloadId)) {
    const entryValue = cache.get(payloadId)

    if (entryValue && typeof entryValue === 'object') {
      return entryValue
    }
  }

  return null
}

function associate(payload: AlyaConnect.Payload, data: Record<string, any>) {
  log('associate called!')

  if (payload.dependsOn) {
    if (!Array.isArray(payload.dependsOn)) {
      payload.dependsOn = [payload.dependsOn]
    }

    for (let relationship of payload.dependsOn) {
      const cacheEntryValue = hasValidCacheEntryValue(relationship.id)

      if (cacheEntryValue) {
        data[relationship.foreignKey] = cacheEntryValue[relationship.references]
      }
    }
  }
}

async function handlePayload(payload: AlyaConnect.Payload, hasRelationship = false) {
  log('handlePayload called!')

  if (GENERATE_IDS && !payload.id) {
    payload.id = nanoid()
  }

  const data = { ...payload.data } || {}

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

function addService(serviceName: string, service: AlyaConnect.Service) {
  log('addService called!')
  log('addService > serviceName:', serviceName)

  services.set(serviceName, service)
}

function addMutator(mutator: AlyaConnect.Mutator) {
  log('addMutator called!')

  mutators.push(mutator)
}

async function handlePayloads(payloads = [] as AlyaConnect.Payload[]) {
  clearCache()
  clearResponse()

  for (let payload of payloads) {
    log('handlePayloads > payload:', payload)
    log('handlePayloads > payload id:', payload.id)
    log('handlePayloads > payload dependsOn:', payload.dependsOn)

    if (!payload.dependsOn) {
      await handlePayload(payload)
    }
  }

  for (let payload of payloads) {
    if (payload.status !== STATUS.SUCCESS) {
      if (payload.dependsOn) {
        await handlePayload(payload, true)
      }
    }
  }

  return response
}

function setup(config: AlyaConnect.Config) {
  log('setup called!')

  services.clear()
  mutators = []

  for (let service of config.services) {
    if (service.name) {
      addService(service.name, service)
    }
  }

  if (config.mutators) {
    for (let mutator of config.mutators) {
      addMutator(mutator)
    }
  }
}

export {
  setup,
  addService,
  addMutator,
  handlePayloads
}
