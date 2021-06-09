import React from 'react'
import Tabs from 'src/content/utils/Tabs'
import { getInitTabIndex, updateRef } from 'src/@global/utils'

type item = {
  title: string
  content: React.ReactElement
}
type LocalProps = {
  items: item[]
  storage: string
}

export default ({ items, storage }: LocalProps): React.ReactElement => {
  const curTabRef = React.useRef<number>(getInitTabIndex(storage))
  return (
    <Tabs
      initIndex={getInitTabIndex(storage)}
      items={items}
      cleanup={() => localStorage.setItem(storage, curTabRef.current.toString())}
      update={(index: number) => updateRef(curTabRef, index)}
    />
  )
}
