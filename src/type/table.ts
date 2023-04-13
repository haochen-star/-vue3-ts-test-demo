export interface TableDataItem {
  name: string
  age: number
  address: string
}

export interface TableData {
  [index: number]: TableDataItem
}
