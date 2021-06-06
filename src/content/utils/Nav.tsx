import React from 'react'
import { NavContentProps } from 'my-nav-type'

const Nav = ({ cur, items, setCur, storage }: NavContentProps): React.ReactElement => {
  const click = (index: number) => {
    localStorage.setItem(storage, index.toString())
    setCur(index)
  }
  return (
    <nav className="nav-content nav-content--content">
      <ul className="nav-content__list">
        {items.map((item: string, i: number) => {
          return (
            <li className="nav-content__item" key={i} onClick={() => click(i)}>
              <button className={'nav-content__button' + (cur === i ? ' nav-content__button--active' : '')}>
                {item}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
