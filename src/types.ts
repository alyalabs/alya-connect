import { STATUS } from './constants.js'

export type Payload = {
  id?: string
  service: string
  method: string
  status?: string
  params?: Record<string, any>
  data?: Record<string, any>
  dependsOn?: { id: string; foreignKey: string; references: string }[]
}

export type ServiceMethod = (args: { params: any; data: any }) => Promise<any>

export type Service = {
  name: string
  [method: string]: ServiceMethod | string
}

export type Mutator = (data: Record<string, any>, key: string) => void

export type Config = {
  services: Service[]
  mutators?: Mutator[]
}

export type Status = 'success' | 'error'

export type Core = {
  setup: (config: Config) => void
  addService: (serviceName: string, service: Service) => void
  addMutator: (mutator: Mutator) => void
  handlePayloads: (payloads: Payload[]) => Promise<Record<string, any>>
}

export type SuccessResponse = {
  status: 'success'
  result: any
}

export type ErrorResponse = {
  status: 'error'
  error: {
    name: string
    message: string
  }
}

export type Response = {
  [payloadId: string]: SuccessResponse | ErrorResponse
}
