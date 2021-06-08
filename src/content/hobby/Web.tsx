import React from 'react'

import CardsProject from 'src/content/utils/CardsProject'
import MarkdownContent from 'src/content/utils/MarkdownContent'
import Tabs from 'src/content/utils/Tabs'

const personal = [
  {
    title: 'This Website',
    description: 'A very customizable personal website',
    keyword: ['HTML/SCSS/JS', 'React.js', 'Inkscape', 'Vite'],

    src: 'https://github.com/tkiat/tkiat.github.io',
    type: 'Project',
  },
  {
    title: 'Interactive Vim Theme Generator',
    description: 'Oversimplified and interactive',
    keyword: ['HTML/SCSS/JS', 'React.js'],

    src: 'https://github.com/tkiat/vim-custom-theme',
    live: 'https://tkiat.github.io/vim-custom-theme',
    type: 'Project',
  },
  {
    title: 'Freedom Oriented Blog',
    description: 'My experimental blog using Pelican',
    keyword: ['HTML/SCSS/JS', 'Pelican', 'Jinja'],

    src: 'https://github.com/tkiat/freedom-oriented-blog',
    live: 'https://tkiat.github.io/freedom-oriented-blog',
    type: 'Project',
  },
  {
    title: 'Previous Personal Website',
    description: 'I did everything from scratch including backend',
    keyword: ['Vanilla HTML/CSS/JS', 'AWS', 'Terraform'],

    inactive: true,
    src: 'https://github.com/tkiat/archive/tree/main/tkiatd.github.io',
    type: 'Project',
  },
  {
    title: 'Christmas Card',
    description: "I gave it to my Mother's new husband in Norway at Christmas 2019",
    keyword: ['HTML/SCSS/JS'],
    src: 'https://codepen.io/tkiatd/details/MWYoboG',
    live: 'https://christmas-mardon.herokuapp.com',
    type: 'Task',
  },
]

const experiment = [
  {
    title: 'Simple RegEx Program Emulator',
    description: 'Just overlay the highlight layer on top of textbox',
    keyword: ['HTML/SCSS/JS'],
    src: 'https://codepen.io/tkiatd/pen/bGBWvza',
    type: 'Experiment',
  },
  {
    title: 'Typing Practice Emulator',
    description: '',
    keyword: ['HTML/SCSS/JS'],
    src: 'https://codepen.io/tkiatd/pen/oNYWdLz',
    type: 'Experiment',
  },
]

const pullRequest = `
Will add more.
- [2021-05-05](https://github.com/prettier/prettier/pull/11009) - **Prettier** - **Document** - **Fix Bug** - Change 'Markdown' to 'markdown' otherwise it won't work.
`

const Web = (): React.ReactElement => (
  <Tabs
    storage={'tab-index-hobby-web'}
    titles={['Work', 'Experiment', 'Pull Request']}
    contents={[
      <CardsProject items={personal} />,
      <CardsProject items={experiment} />,
      <MarkdownContent content={pullRequest} />,
    ]}
  />
)

export default Web
