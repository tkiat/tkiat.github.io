import React     from 'react'
import {useImmer} from 'use-immer'

import MarkdownContent from '@/content/utils/MarkdownContent'
import Nav             from '@/content/utils/Nav'

const todo = `
I am planning to upload some of my gardening photos and simple vegan cooking recipes. I am no expert in these but they seem to give me the purpose of my existence.
`
// const zeroWaste = `
// `
// const vegan = `
// `
// const gardening = `
// `

const FAQs = () => {
  const [cur, setCur] = useImmer(parseInt(localStorage.getItem('tab-index-hobby-environment') ?? 0))
  const click = index => {
    localStorage.setItem('tab-index-hobby-environment', index)
    setCur(index)
  }
  return (
    <>
      <Nav items={['TODO']} storage='tab-index-hobby-environment' cur={cur} onclick={click} />
      <MarkdownContent isActive={cur === 0} content={todo} />
    {/*<MarkdownContent isActive={cur === 0} content={zeroWaste} />*/}
    {/*<MarkdownContent isActive={cur === 1} content={vegan} />*/}
    {/*<MarkdownContent isActive={cur === 2} content={gardening} />*/}
    </>
  )
}

export default FAQs
