import { useRouter } from 'next/router'
import { FC } from 'react'
import { Wrapper } from './styles'

interface Props {
  title: string
}

const Logo: FC<Props> = ({ title }) => {
  const router = useRouter()
  return <Wrapper onClick={() => router.push('/')}>{title}</Wrapper>
}

export default Logo
