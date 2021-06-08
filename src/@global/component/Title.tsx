import React from 'react'

type TitleProps = {
  items: string[]
  navMainIndex: number
  navSubIndex: number | null
}

const Title = ({ items, navMainIndex, navSubIndex }: TitleProps): React.ReactElement => {
  if (navSubIndex === null || items[navSubIndex] === undefined) {
    return <></>
  } else {
    return <h1 className={'title title--' + navMainIndex}>{items[navSubIndex].slice(1)}</h1>
  }
}

export default Title
