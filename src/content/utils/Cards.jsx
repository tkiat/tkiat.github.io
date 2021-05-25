import React from 'react'
import ReactMarkdown from 'react-markdown'
// import ReactMarkdownWithHtml from 'react-markdown/with-html'
// const ReactMarkdownWithHtml = require('react-markdown/with-html')

const Cards = props => {
  return (
    <div className={'cards' + (props.isActive ? ' cards--active' : '')}>
      {
        props.items.map((item, i) => {
          return (
            <div className='cards__item' key={i}>
              <ReactMarkdown children={item} allowDangerousHtml />
            </div>
          )
        })
      }
    </div>
  )
}

export default Cards
