import React from 'react'

type TitleProps = {
  className: string,
}

const Title: React.FunctionComponent<TitleProps> = ({className, children}) => <h1 className={className}>{children}</h1>
export default Title
