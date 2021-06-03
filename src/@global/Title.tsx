import React from 'react'

type Props = {
  index: number,
  items: string[],
  navMainIndex: number,
}

const Title = ({index, items, navMainIndex}: Props): React.ReactElement => {
  if(index === undefined || items === undefined) return <></>
  else return <h1 className={'title title--' + navMainIndex}>{items[index].slice(1)}</h1>
}

export default Title
