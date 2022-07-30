import styled from 'styled-components'
import {
	alignSelf,
	AlignSelfProps,
	borderRadius,
	BorderRadiusProps,
	color,
	ColorProps,
	fontFamily,
	FontFamilyProps,
	fontSize,
	FontSizeProps,
	fontWeight,
	FontWeightProps,
	height,
	HeightProps,
	justifySelf,
	JustifySelfProps,
	lineHeight,
	margin,
	MarginProps,
	padding,
	PaddingProps,
	width,
	WidthProps,
} from 'styled-system'

export interface ButtonProps
	extends ColorProps,
		FontFamilyProps,
		FontSizeProps,
		FontWeightProps,
		PaddingProps,
		BorderRadiusProps,
		WidthProps,
		HeightProps,
		MarginProps,
		AlignSelfProps,
		JustifySelfProps {
	darkenOnHover?: boolean
	textDecoration?: string
}

export const Button = styled.button<ButtonProps>`
	${color};
	${fontFamily};
	${fontSize};
	${fontWeight};
	${lineHeight};
	${padding};
	${margin};
	${alignSelf};
	${justifySelf};

	text-decoration: ${({ textDecoration }) => textDecoration};

	height: max-content;
	${width};
	${height};

	border-radius: 4px;
	${borderRadius};

	display: flex;
	justify-content: center;
	align-items: center;

	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		box-shadow 0.15s ease-in-out;

	&:hover {
		box-shadow: ${({ darkenOnHover }) => darkenOnHover && 'inset 0px 0px 400px 110px rgba(0, 0, 0, 0.1)'};
	}
`

Button.defaultProps = {
	color: 'white',
	backgroundColor: 'green-500',
	fontFamily: 'body',
	fontSize: 14,
	padding: '8px 12px',
	darkenOnHover: true,
}