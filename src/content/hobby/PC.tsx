import React      from 'react'
import {useImmer} from 'use-immer'

import CardsProject    from 'src/content/utils/CardsProject'
import MarkdownContent from 'src/content/utils/MarkdownContent'
import Nav             from 'src/content/utils/Nav'

const projects = [
  {
    'title': 'Terminal Game Client',
    'description': 'A simple TUI game client with hh:mm:ss playtie record that supports any supplemental commands such as wine64.',
    'keyword': 'Python3, ncurses',

    'src': 'https://github.com/tkiat/terminal-game-client',
    'live': '',
    'image-src': 'https://via.placeholder.com/320x180',
  },
]

const tasks = [
  {
    'title': 'Lazyman Pomodoro',
    'description': 'I built this because I couldn\'t find a simple CLI pomodoro clock that supports pause, simple statistic, and configurable session lengths.',
    'keyword': 'Python3, ncurses',

    'src': 'https://github.com/tkiat/lazyman-pomodoro',
    'image-src': 'https://via.placeholder.com/320x180',
  },
]

const myConfig = `
- [tkiat Guix Channel](https://gitlab.com/tkiat/guix-channel). I fork suckless repositories and create a Guix channel for them.
- [My personal Dotfiles and Configs](https://github.com/tkiat/dotfiles-and-configs).
`

const contributions = `
### Accepted Pull Requests
Will add more.
- [2021-03-06](https://notabug.org/libreboot/libreboot/pulls/759) - **Libreboot** - **Add Document**: btrfs swapfile must be NOCOW and no compression
- [2020-10-15](https://github.com/void-linux/void-packages/pull/25365) - **void-packages** - **Update Package**: python3-pem to 20.1.0
- [2020-10-07](https://github.com/tldr-pages/tldr/pull/4525) - **tldr** - **Add Document**: lvremove entry
`

const storage = 'tab-index-hobby-pc'

const PC = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['Projects', 'Tasks', 'Contributions', 'My Config']} storage={storage} cur={cur} setCur={setCur} />

      <CardsProject isActive={cur === 0} items={projects} />
      <CardsProject isActive={cur === 1} items={tasks} />
      <MarkdownContent isActive={cur === 2} content={contributions} />
      <MarkdownContent isActive={cur === 3} content={myConfig} />
    </>
  )
}

export default PC
