import styled from 'styled-components'
import {
	borderRadius,
	BorderRadiusProps,
	color,
	ColorProps,
	height,
	HeightProps,
	maxWidth,
	MaxWidthProps,
	width,
	WidthProps,
} from 'styled-system'

export interface ImageProps extends WidthProps, MaxWidthProps, HeightProps, BorderRadiusProps, ColorProps {
	src: string
	objectFit?: string
	transform?: string
}

export const Img = styled.img<ImageProps>`
	${borderRadius};
	${color};
	${width};
	${maxWidth};
	${height};
	transform: ${({ transform }) => transform};
	object-fit: ${({ objectFit }) => objectFit};
`