import React from 'react'

const Title: React.FunctionComponent<{className: string}> = ({className, children}) => <h1 className={className}>{children}</h1>
export default Title
