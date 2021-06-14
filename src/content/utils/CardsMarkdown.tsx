import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import Cards from 'src/content/utils/Cards'

type Props = {
  mdArray: string[]
}
export default ({ mdArray }: Props): React.ReactElement => (
  <Cards
    items={mdArray.map((x) => (
      <Markdown content={x} />
    ))}
  />
)
