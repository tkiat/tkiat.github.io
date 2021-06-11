import React from 'react'
import Tabs from 'src/content/utils/Tabs'

type item = {
  title: string
  content: React.ReactElement
}
type LocalProps = {
  items: item[]
  storage: string
}

const getInitTabIndex = (storage: string) => parseInt(localStorage.getItem(storage) ?? '0')

export default ({ items, storage }: LocalProps): React.ReactElement => {
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
