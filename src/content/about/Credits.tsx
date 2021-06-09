import React from 'react'

import CardsMarkdown from 'src/content/utils/CardsMarkdown'

import * as data from './creditsData'

export default (): React.ReactElement => <CardsMarkdown mdArray={data.credits} />
