import { ChangeEvent } from 'react'

import styled from 'styled-components'
import {
	border,
	borderColor,
	BorderColorProps,
	BorderProps,
	color,
	ColorProps,
	fontFamily,
	FontFamilyProps,
	fontSize,
	FontSizeProps,
	FontWeightProps,
	height,
	HeightProps,
	padding,
	PaddingProps,
	textAlign,
	TextAlignProps,
	width,
	WidthProps,
} from 'styled-system'

export interface TextInputProps
	extends FontFamilyProps,
		FontWeightProps,
		FontSizeProps,
		ColorProps,
		BorderProps,
		BorderColorProps,
		TextAlignProps,
		WidthProps,
		PaddingProps,
		HeightProps {
	placeholder?: string
	placeholderColor?: string
	// TODO change this to a function
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/* TODO: Later have a custom border focus */
export const TextInput = styled.input<TextInputProps>`
	${fontFamily};
	${fontSize};
	${color};
	${width};
	${padding};
	${height};
	${textAlign};
	&[type='number'] {
		appearance: none;
		-moz-appearance: textfield;
	}
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	${border};
	${borderColor};
`

TextInput.defaultProps = {
	fontFamily: 'body',
	fontSize: 14,
	width: '100%',
}