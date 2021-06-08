import React from 'react'
import { useImmer } from 'use-immer'

type TabItem = {
  content: React.ReactElement
  title: string
}
type TabsProps = {
  initIndex: number

  cleanup: () => void
  update: (i: number) => void

  items: TabItem[]
}

const Tabs = ({ initIndex, cleanup, update, items }: TabsProps): React.ReactElement => {
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
        <div className="tabs__list" role="tablist">
          {items.map(({ title }, i) => {
            return (
              <button
                className={'tabs__button' + (cur === i ? ' tabs__button--active' : '')}
                key={i}
                onClick={() => {
                  setCur(i)
                  update(i)
                }}
                aria-controls={'panel' + i}
                aria-selected={cur === i ? 'true' : 'false'}
                role="tab">
                {title}
              </button>
            )
          })}
        </div>
      </div>
      {items.map(({ content }, i) => {
        return (
          <div id={'panel' + i} key={i} style={{ display: cur === i ? 'block' : 'none' }}>
            {content}
          </div>
        )
      })}
    </>
  )
}

export default Tabs
