import { nanoid } from 'nanoid'

import {
  DEV_MODE,
  GENERATE_IDS
} from '#flags.ts'

export type Payload = {
  id?: string;
  service: string;
  method: string;
  status?: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  dependsOn?: { id: string; foreignKey: string; primaryKey: string }[];
}

export type Service = {
  [method: string]: (args: { params: any; data: any }) => Promise<any>;
}

type Services = {
  [serviceName: string]: Service;
}

export type Mutator = (data: Record<string, any>, key: string) => void;

let services: Services = {}

let mutators: Mutator[] = []

let cache: [string, any][] = []

let response: Record<string, any> = []

function log(...args: any[]) {
  if (DEV_MODE) console.log('alya-connect >', ...args)
}

function addToCache(value: [string, any]) {
  cache.push(value)
}

function clearCache() {
  cache = []
}

function addToResponse(obj: Record<string, any>) {
  response = { ...response, ...obj }
}

function clearResponse() {
  response = {}
}

function wasProcessedSuccessfully(payloadId: string): number | false {
  for (let i = 0; i < cache.length; i++) {
    const entry = cache[i]
    const id = entry[0]

    if (payloadId === id) return i
  }

  return false
}

function getKeyFromPayload(index: number, key: string) {
  log('getKeyFromPayload called!')
  log('getKeyFromPayload > result:', cache[index][1])

  return cache[index][1][key]
}

async function callMethod(payload: Payload, data: Record<string, any>) {
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
        addToCache([payload.id!, result])
  
        addToResponse({
          [payload.id!]: {
            status: 'success',
            result: result
          }
        })
      }
    } catch (err: any) {
      addToResponse({
        [payload.id!]: {
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

function associate(payload: Payload, data: Record<string, any>) {
  log('associate called!')

  if (payload.dependsOn) {
    if (!Array.isArray(payload.dependsOn)) {
      payload.dependsOn = [payload.dependsOn]
    }

    for (let relationship of payload.dependsOn) {
      const cacheEntryIndex = wasProcessedSuccessfully(relationship.id)

      if (cacheEntryIndex !== false) {
        data[relationship.foreignKey] = getKeyFromPayload(cacheEntryIndex, relationship.primaryKey)
      }
    }
  }
}

async function handlePayload(payload: Payload, hasRelationship = false) {
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

function registerService(serviceName: string, service: Service) {
  log('registerService called!')
  log('registerService > serviceName:', serviceName)

  services = { ...services, [serviceName]: service }
}

function addMutator(mutator: Mutator) {
  log('addMutator called!')

  mutators = [...mutators, mutator]
}

async function handler(req: { body?: Payload | Payload[] }, res: { send: (body: any) => void; sendStatus: (status: number) => void }) {
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
  
        if (!payload.dependsOn) {
          await handlePayload(payload)
        }
      }
  
      for (let payload of payloads) {
        if (payload.status !== 'success') {
          if (payload.dependsOn) {
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

async function handle(payloads = [] as Payload[]) {
  clearCache()
  clearResponse()

  for (let payload of payloads) {
    log('handler > payload:', payload)
    log('handler > payload dependsOn:', payload.id, payload.dependsOn)

    if (!payload.dependsOn) {
      await handlePayload(payload)
    }
  }

  for (let payload of payloads) {
    if (payload.status !== 'success') {
      if (payload.dependsOn) {
        await handlePayload(payload, true)
      }
    }
  }

  return response
}

export default {
  registerService,
  addMutator,
  handler
}
