export type FolderDataProps = {
  id: number // unique, automatic
  name: string
  children?: FileDataProps[]
  root: number
}

export type FileDataProps = {
  id: number
  name: string
  ext: string
}