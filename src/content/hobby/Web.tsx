import React     from 'react'
import {useImmer} from 'use-immer'

import CardsProject  from 'src/content/utils/CardsProject'
import Nav           from 'src/content/utils/Nav'

const project = [
  {
    'title': 'This Website',
    'description': 'A very customizable personal website.',
    'keyword': 'HTML/SCSS/JS, React.js, Inkscape, GitHub Pages',

    'src': 'https://github.com/tkiat/tkiat.github.io',
    'image-src': 'https://via.placeholder.com/320x180',
  },
  {
    'title': 'Interactive Vim Theme Generator',
    'description': 'A simplified and interactive Vim custom theme customizer',
    'keyword': 'HTML/SCSS/JS, React.js, GitHub Pages',

    'src': 'https://github.com/tkiat/vim-custom-theme',
    'live': 'https://tkiat.github.io/vim-custom-theme',
    'image-src': 'https://via.placeholder.com/320x180',
  },
  {
    'title': 'Freedom Oriented Blog',
    'description': 'My experimental blog using Pelican.',
    'keyword': 'HTML/SCSS/JS, Pelican, Jinja, GitHub Pages',

    'src': 'https://github.com/tkiat/freedom-oriented-blog',
    'live': 'https://tkiat.github.io/freedom-oriented-blog',
    'image-src': 'https://via.placeholder.com/320x180',
  },
  {
    'title': 'Previous Personal Website',
    'description': 'I did everything from scratch including blog contents served from a backend service. I abandoned it for something simpler, i.e. this website.',
    'keyword': 'Vanilla HTML/CSS/JS, AWS (CodeCommit, S3, DynamoDB, Lambda), Terraform, GitHub Pages',

    'src': 'https://github.com/tkiat/archive/tree/main/tkiatd.github.io',
    'inactive': true,
  },
]

const tasks = [
  {
    'title': 'Christmas Card',
    'description': 'I studied how snow effects are used in one tutorial and applied it to my own card. I gave it to my Mother\'s new husband in Norway at Christmas 2019.',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/details/MWYoboG',
    'live': 'https://christmas-mardon.herokuapp.com',
    'image-src': 'https://via.placeholder.com/320x180',
  }
]

const experimental = [
  {
    'title': 'Simple RegEx Program Emulator',
    'description': 'The trick is to calculate the RegEx match, and use this match to define the "highlight" layer on top of the input textbox.',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/pen/bGBWvza',
    'image-src': 'https://via.placeholder.com/320x180',
  },
  {
    'title': 'Typing Practice Emulator',
    'description': '',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/pen/oNYWdLz',
    'image-src': 'https://via.placeholder.com/320x180',
  },
]

const storage = 'tab-index-hobby-web'

const Web = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['Projects', 'Tasks', 'Experimental']} storage={storage} cur={cur} setCur={setCur} />

      <CardsProject isActive={cur === 0} items={project} />
      <CardsProject isActive={cur === 1} items={tasks} />
      <CardsProject isActive={cur === 2} items={experimental} />
    </>
  )
}

export default Web
