import React     from 'react'
import {useImmer} from 'use-immer'

import MarkdownContent from 'src/content/utils/MarkdownContent'
import Nav             from 'src/content/utils/Nav'

const todo = `
I am planning to upload some of my gardening photos and simple vegan cooking recipes. I am no expert in these but they seem to give me the purpose of my existence.
`
// const zeroWaste = `
// `
// const vegan = `
// `
// const gardening = `
// `

const storage = 'tab-index-hobby-environment'

const Environment = (): React.ReactElement => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem(storage) ?? '0'))
  return (
    <>
      <Nav items={['TODO']} storage={storage} cur={cur} setCur={setCur} />

      <MarkdownContent isActive={cur === 0} content={todo} />
    {/*<MarkdownContent isActive={cur === 0} content={zeroWaste} />*/}
    {/*<MarkdownContent isActive={cur === 1} content={vegan} />*/}
    {/*<MarkdownContent isActive={cur === 2} content={gardening} />*/}
    </>
  )
}

export default Environment
