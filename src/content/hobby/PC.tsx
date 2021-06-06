import React from 'react'
import { useImmer } from 'use-immer'

import CardsProject from 'src/content/utils/CardsProject'
import MarkdownContent from 'src/content/utils/MarkdownContent'
import Nav from 'src/content/utils/Nav'

const work = [
  {
    title: 'Terminal Game Client',
    description: 'A simple TUI game client that supports any supplemental commands such as wine64.',
    keyword: ['Python3', 'ncurses'],

    src: 'https://github.com/tkiat/terminal-game-client',
    live: '',
    'image-src': 'https://via.placeholder.com/320x180',
    type: 'Project',
  },
  {
    title: 'Lazyman Pomodoro',
    description: 'A simple CLI pomodoro clock that supports pause, simple statistic, and configurable session lengths.',
    keyword: ['Python3', 'ncurses'],

    src: 'https://github.com/tkiat/lazyman-pomodoro',
    'image-src': 'https://via.placeholder.com/320x180',
    type: 'Task',
  },
]

const utility = [
  {
    title: 'My Dotfiles and Configs',
    description: '',
    keyword: [],

    src: 'https://github.com/tkiat/dotfiles-and-configs',
    live: '',
    type: 'Config',
  },
  {
    title: 'tkiat Guix Channel',
    description: 'I fork suckless repositories and create a Guix channel for them',
    keyword: ['Guile'],

    src: 'https://gitlab.com/tkiat/guix-channel',
    live: '',
    type: 'Repository',
  },
  {
    title: 'TODO',
    description: 'TODO',
    keyword: ['Python3'],

    src: '',
    live: '',
    'image-src': 'https://via.placeholder.com/320x180',
    type: 'Script',
  },
]

const pullRequest = `
Will add more.
- [2021-03-06](https://notabug.org/libreboot/obsolete-repository-preserved-for-historical-purposes/commit/0f7c47997de052a9beae8c906b2f32c28bb5f7f8) - **Libreboot** - **Document** - **Improve** - btrfs swapfile must be NOCOW and no compression
- [2020-10-15](https://github.com/void-linux/void-packages/pull/25365) - **void-packages** - **Package** - **Update** - python3-pem to 20.1.0
- [2020-10-07](https://github.com/tldr-pages/tldr/pull/4525) - **tldr** - **Document** - **Add** - lvremove entry
`

// https://notabug.org/libreboot/libreboot/pulls/759

const storage = 'tab-index-hobby-pc'

const PC = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['Work', 'Utility', 'Pull Request']} storage={storage} cur={cur} setCur={setCur} />
      <CardsProject isActive={cur === 0} items={work} />
      <CardsProject isActive={cur === 1} items={utility} />
      <MarkdownContent isActive={cur === 2} content={pullRequest} />
    </>
  )
}

export default PC
