import React from 'react'

type TitleProps = {
  className: string
  title: string
}

export default ({ className, title }: TitleProps): React.ReactElement => {
  return <h1 className={className}>{title}</h1>
}
