import React from 'react'

type Props = {
  navMainIndex: number,
  index: number,
  items: string[],
}

const Title = ({navMainIndex, index, items}: Props): React.ReactElement => {
  if(index === undefined || items === undefined) return <></>
  else return <h1 className={'title title--' + navMainIndex}>{items[index].slice(1)}</h1>
}

export default Title
