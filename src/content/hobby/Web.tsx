import React     from 'react'
import {useImmer} from 'use-immer'

import CardsProject  from 'src/content/utils/CardsProject'
import Nav           from 'src/content/utils/Nav'

const personal = [
  {
    'title': 'This Website',
    'description': 'A very customizable personal website',
    'keyword': 'HTML/SCSS/JS, React.js, Inkscape, Vite',

    'src': 'https://github.com/tkiat/tkiat.github.io',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Project',
  },
  {
    'title': 'Interactive Vim Theme Generator',
    'description': 'Oversimplified and interactive',
    'keyword': 'HTML/SCSS/JS, React.js',

    'src': 'https://github.com/tkiat/vim-custom-theme',
    'live': 'https://tkiat.github.io/vim-custom-theme',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Project',
  },
  {
    'title': 'Freedom Oriented Blog',
    'description': 'My experimental blog using Pelican',
    'keyword': 'HTML/SCSS/JS, Pelican, Jinja',

    'src': 'https://github.com/tkiat/freedom-oriented-blog',
    'live': 'https://tkiat.github.io/freedom-oriented-blog',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Project',
  },
  {
    'title': 'Previous Personal Website',
    'description': 'I did everything from scratch including backend',
    'keyword': 'Vanilla HTML/CSS/JS, AWS (CodeCommit, S3, DynamoDB, Lambda), Terraform',

    'src': 'https://github.com/tkiat/archive/tree/main/tkiatd.github.io',
    'inactive': true,
    'type': 'Project',
  },
  {
    'title': 'Christmas Card',
    'description': 'I gave it to my Mother\'s new husband in Norway at Christmas 2019',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/details/MWYoboG',
    'live': 'https://christmas-mardon.herokuapp.com',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Task',
  },
]

const experiment = [
  {
    'title': 'Simple RegEx Program Emulator',
    'description': 'The trick is to calculate the RegEx match, and use this match to define the "highlight" layer on top of the input textbox',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/pen/bGBWvza',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Experiment',
  },
  {
    'title': 'Typing Practice Emulator',
    'description': 'Just for fun',
    'keyword': 'HTML/SCSS/JS',
    'src': 'https://codepen.io/tkiatd/pen/oNYWdLz',
    'image-src': 'https://via.placeholder.com/320x180',
    'type': 'Experiment',
  },
]

const storage = 'tab-index-hobby-web'

const Web = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['Work', 'Experiment']} storage={storage} cur={cur} setCur={setCur} />

      <CardsProject isActive={cur === 0} items={personal} />
      <CardsProject isActive={cur === 1} items={experiment} />
    </>
  )
}

export default Web
