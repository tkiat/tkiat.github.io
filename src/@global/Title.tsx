import React from 'react'

type Props = {
  index: number | null,
  items: string[],
  navMainIndex: number,
}

const Title = ({index, items, navMainIndex}: Props): React.ReactElement => {
  if(index === null || items[index] === undefined) return <></>
  else return <h1 className={'title title--' + navMainIndex}>{items[index].slice(1)}</h1>
}

export default Title
