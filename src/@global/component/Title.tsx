import React from 'react'

type Props = {
  className: string
  title: string
}
export default ({ className, title }: Props): React.ReactElement => {
  return <h1 className={className}>{title}</h1>
}
