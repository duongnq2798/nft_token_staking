import { FC } from 'react'

import { Wrapper, Text } from './styles'

const Footer: FC = () => {
  return (
    <Wrapper>
      <a href={`https://twitter.com/duongnq27`} target={'_blank'} rel="noreferrer">
        <Text>Created by 🤖 Eric Johnson 🤞</Text>
      </a>
    </Wrapper>
  )
}

export default Footer
