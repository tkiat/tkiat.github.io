import React from 'react'
import { useImmer } from 'use-immer'

const getInitTabIndex = (storage: string) => parseInt(localStorage.getItem(storage) ?? '0')

type TabItem = {
  title: string
  content?: React.ReactElement
  index?: number
}
type Props = {
  items: TabItem[]
  storage: string
}

export default ({ items, storage }: Props): React.ReactElement => {
  const [cur, setCur] = useImmer(getInitTabIndex(storage))
  const curRef = React.useRef<number>(cur)
  React.useEffect(() => {
    const cleanup = () => {
      localStorage.setItem(storage, curRef.current.toString())
    }
    window.addEventListener('beforeunload', cleanup)
    return () => {
      cleanup()
      window.removeEventListener('beforeunload', cleanup)
    }
  }, [])
  return (
    <>
      <div className="tabs tabs--content">
        <div className="tabs__list" role="tablist" aria-label="content tabs">
          {items.map(({ index, title }, i) => {
            if (index === undefined)
              return (
                <div className="tabs__item tabs__decorate" key={i}>
                  {title}
                </div>
              )
            return (
              <button
                className={'tabs__item tabs__button' + (cur === index ? ' tabs__button--active' : '')}
                role="tab"
                id={'tab' + index}
                key={i}
                onClick={() => {
                  setCur(index)
                  curRef.current = index
                }}
                aria-controls={'panel' + index}
                aria-selected={cur === index ? 'true' : 'false'}>
                {title}
              </button>
            )
          })}
        </div>
      </div>
      {items.map(({ content, index }, i) => (
        <div
          role="tabpanel"
          aria-labelledby={'tab' + index}
          id={'panel' + index}
          key={i}
          style={{ display: cur === index ? 'block' : 'none' }}>
          {content}
        </div>
      ))}
    </>
  )
}
