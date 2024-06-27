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

export type Services = {
  [serviceName: string]: Service
}

export type Mutator = (data: Record<string, any>, key: string) => void

export type Status = typeof STATUS[keyof typeof STATUS]

export type Config = {
  services: Service[]
  mutators?: Mutator[]
}
