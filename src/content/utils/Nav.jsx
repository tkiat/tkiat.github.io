import React from 'react'

const Nav = props => {
  return (
  <nav className='nav nav--content'>
    <ul className='nav__list'>
    {
      props.items.map((item, i) => {
        return (
          <li className='nav__item' key={i} onClick={() => props.onclick(i)}>
            <button className={'nav__button' + (props.cur === i ? ' nav__button--active' : '')}>{item}</button>
          </li>
        )
      })
    }
    </ul>
  </nav>
  )
}

export default Nav
