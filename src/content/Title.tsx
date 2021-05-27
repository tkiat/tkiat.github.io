import React from 'react'

const Title = ({className, children}: {className: string, children: React.ReactNode}): React.ReactElement => <h1 className={className}>{children}</h1>

export default Title
