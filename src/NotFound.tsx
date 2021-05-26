import React from 'react'

const NotFound: React.FunctionComponent<{className: string}> = ({className}) => {
  return (
    <div className={className}>
      <div>Content not found but no worry we have <a href='/'>HOME</a></div>
    </div>
  )
}
export default NotFound
