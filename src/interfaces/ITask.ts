export interface ITaskCreateRequest {
  title: string
}

export interface ITaskUpdateRequest {
  title: string
}

export interface ITaskUpdateStatusRequest {
  done: boolean
}

export interface ITaskDeleteResponse {
  message: string
}

export interface ITask {
  _id: string
  title: string
  done: boolean
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
}