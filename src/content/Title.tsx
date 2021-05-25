import React from 'react'
const getTitle = () => {
  const lastUrlSect = window.location.href.slice(window.location.href.lastIndexOf('/') + 1)
  return lastUrlSect[0].toUpperCase() + lastUrlSect.slice(1)
}

const Title = props => <h1 className={'title title--' + props.index}>{getTitle()}</h1>
export default Title
