import React     from 'react'
import {useImmer} from 'use-immer'

import CardsProject  from '@/content/utils/CardsProject'
import Nav           from '@/content/utils/Nav'

const project = [
  {
    'title': 'This Website',
    'src': 'https://github.com/tkiat/tkiat.github.io',
    'image-src': 'https://via.placeholder.com/320x180',
    'description': 'A very customizable personal website.',
    'keyword': 'HTML/SCSS/JS, React.js, Inkscape, GitHub Pages',
  },
  {
    'title': 'Interactive Vim Theme Generator',
    'src': 'https://github.com/tkiat/vim-custom-theme',
    'live': 'https://tkiat.github.io/vim-custom-theme',
    'image-src': 'https://via.placeholder.com/320x180',
    'description': 'A simplified and interactive Vim custom theme customizer',
    'keyword': 'HTML/SCSS/JS, React.js, GitHub Pages',
  },
  {
    'title': 'Freedom Oriented Blog',
    'src': 'https://github.com/tkiat/freedom-oriented-blog',
    'live': 'https://tkiat.github.io/freedom-oriented-blog',
    'image-src': 'https://via.placeholder.com/320x180',
    'description': 'My experimental blog using Pelican.',
    'keyword': 'HTML/SCSS/JS, Pelican, Jinja, GitHub Pages',
  },
  {
    'title': 'Previous Personal Website',
    'src': 'https://github.com/tkiat/archive/tree/main/tkiatd.github.io',
    'description': 'I did everything from scratch including blog contents served from a backend service. I abandoned it for something simpler, i.e. this website.',
    'keyword': 'Vanilla HTML/CSS/JS, AWS (CodeCommit, S3, DynamoDB, Lambda), Terraform, GitHub Pages',
    'inactive': true,
  },
]

const tasks = [
  {
    'title': 'Christmas Card',
    'src': 'https://codepen.io/tkiatd/details/MWYoboG',
    'live': 'https://christmas-mardon.herokuapp.com',
    'image-src': 'https://via.placeholder.com/320x180',
    'description': 'I studied how snow effects are used in one tutorial and applied it to my own card. I gave it to my Mother\'s new husband in Norway at Christmas 2019.',
    'keyword': 'HTML/SCSS/JS',
  }
]

const experimental = [
  {
    'title': 'Simple RegEx Program Emulator',
    'src': 'https://codepen.io/tkiatd/pen/bGBWvza',
    'image-src': 'https://via.placeholder.com/320x180',
    'description': 'The trick is to calculate the RegEx match, and use this match to define the "highlight" layer on top of the input textbox.',
    'keyword': 'HTML/SCSS/JS',
  },
  {
    'title': 'Typing Practice Emulator',
    'src': 'https://codepen.io/tkiatd/pen/oNYWdLz',
    'image-src': 'https://via.placeholder.com/320x180',
    'keyword': 'HTML/SCSS/JS',
  },
]

const Web = () => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem('tab-index-hobby-web') ?? 0))
  const click = index => {
    localStorage.setItem('tab-index-hobby-web', index)
    setCur(index)
  }
  return (
    <>
      <Nav items={['Projects', 'Tasks', 'Experimental']} storage='tab-index-hobby-web' cur={cur} onclick={click} />
      <CardsProject isActive={cur === 0} items={project} />
      <CardsProject isActive={cur === 1} items={tasks} />
      <CardsProject isActive={cur === 2} items={experimental} />
    </>
  )
}

export default Web
