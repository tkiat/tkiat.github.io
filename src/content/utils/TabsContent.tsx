import React from 'react'
import Tabs from 'src/content/utils/Tabs'

const getInitTabIndex = (storage: string) => parseInt(localStorage.getItem(storage) ?? '0')

type item = {
  title: string
  clickable?: boolean
  content?: React.ReactElement
}
type Props = {
  items: item[]
  storage: string
}
export default ({ items, storage }: Props): React.ReactElement => {
  const curTabRef = React.useRef<number>(getInitTabIndex(storage))
  return (
    <Tabs
      initIndex={getInitTabIndex(storage)}
      items={items}
      cleanup={() => localStorage.setItem(storage, curTabRef.current.toString())}
      update={(index: number) => {
        curTabRef.current = index
      }}
    />
  )
}
