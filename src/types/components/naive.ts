import type { UploadFileInfo } from 'naive-ui'

export type NUploadFinish = (data: { file: UploadFileInfo; event?: ProgressEvent }) => void

export type NUploadBefore = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => Promise<boolean | void> | boolean | void

export type NUploadRemove = NUploadBefore

export type NUploadError = NUploadFinish
