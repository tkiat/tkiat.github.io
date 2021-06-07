import React from 'react'
import { TabsProps } from 'my-tab-type'

const Tabs = ({ titles, contents, cur, setCur }: TabsProps): React.ReactElement => {
  const click = (index: number) => {
    localStorage.setItem(storage, index.toString())
    // TODO move localstorage above
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
                onClick={() => click(i)}
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
          <div id={'panel' + i} key={i}>
            {content}
          </div>
        )
      })}
    </>
  )
}

export default Tabs
