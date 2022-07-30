import styled from 'styled-components'
import { color, ColorProps, fontSize, FontSizeProps } from 'styled-system'

export interface IconProps extends ColorProps, FontSizeProps {
	className: string
}

export const Icon = styled.i<IconProps>`
	${color};
	${fontSize};
`

Icon.defaultProps = {
	color: 'primary',
	fontSize: 14,
}