import React from 'react'
import { NavContentProps } from 'my-nav-type'

const Nav = ({ cur, items, setCur, storage }: NavContentProps): React.ReactElement => {
  const click = (index: number) => {
    localStorage.setItem(storage, index.toString())
    setCur(index)
  }
  return (
    <nav className="nav nav--content">
      <ul className="nav__list">
        {items.map((item: string, i: number) => {
          return (
            <li className="nav__item" key={i} onClick={() => click(i)}>
              <button className={'nav__button' + (cur === i ? ' nav__button--active' : '')}>{item}</button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
