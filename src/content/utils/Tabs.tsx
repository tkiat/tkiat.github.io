import React from 'react'
import { useImmer } from 'use-immer'

type TabItem = {
  content: React.ReactElement
  title: string
}
type TabsProps = {
  initIndex: number

  cleanup: () => void
  updateRef: (i: number) => void

  items: TabItem[]
}

const Tabs = ({ initIndex, cleanup, updateRef, items }: TabsProps): React.ReactElement => {
  const [cur, setCur] = useImmer(initIndex)
  React.useEffect(() => {
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
          {items.map(({ title }, i) => {
            return (
              <button
                className={'tabs__button' + (cur === i ? ' tabs__button--active' : '')}
                role="tab"
                id={'tab' + i}
                key={i}
                onClick={() => {
                  setCur(i)
                  updateRef(i)
                }}
                aria-controls={'panel' + i}
                aria-selected={cur === i ? 'true' : 'false'}>
                {title}
              </button>
            )
          })}
        </div>
      </div>
      {items.map(({ content }, i) => {
        return (
          <div
            role="tabpanel"
            aria-labelledby={'tab' + i}
            id={'panel' + i}
            key={i}
            style={{ display: cur === i ? 'block' : 'none' }}>
            {content}
          </div>
        )
      })}
    </>
  )
}

export default Tabs
