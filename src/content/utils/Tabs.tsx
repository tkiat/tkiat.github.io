import React from 'react'
import { useImmer } from 'use-immer'

import { TabsProps } from 'my-tab-type'

const Tabs = ({ titles, contents, storage }: TabsProps): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  const onclick = (index: number) => {
    localStorage.setItem(storage, index.toString())
    setCur(index)
  }
  return (
    <>
      <div className="tabs tabs--content">
        <div className="tabs__list" role="tablist">
          {titles.map((title, i) => {
            return (
              <button
                className={'tabs__button' + (cur === i ? ' tabs__button--active' : '')}
                key={i}
                onClick={() => onclick(i)}
                aria-controls={'panel' + i}
                aria-selected={cur === i ? 'true' : 'false'}
                role="tab">
                {title}
              </button>
            )
          })}
        </div>
      </div>
      {contents.map((content, i) => {
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