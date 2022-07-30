import styled, { css } from 'styled-components'
import {
	alignItems,
	AlignItemsProps,
	alignSelf,
	AlignSelfProps,
	color,
	ColorProps,
	display,
	DisplayProps,
	fontFamily,
	FontFamilyProps,
	fontSize,
	FontSizeProps,
	fontWeight,
	FontWeightProps,
	justifySelf,
	JustifySelfProps,
	lineHeight,
	LineHeightProps,
	margin,
	MarginProps,
	maxWidth,
	MaxWidthProps,
	overflow,
	OverflowProps,
	textAlign,
	TextAlignProps,
	WidthProps,
} from 'styled-system'

export interface HeadingProps
	extends FontFamilyProps,
		FontWeightProps,
		FontSizeProps,
		LineHeightProps,
		AlignSelfProps,
		JustifySelfProps,
		TextAlignProps,
		MaxWidthProps {}

export interface ParagraphProps
	extends AlignItemsProps,
		FontFamilyProps,
		FontSizeProps,
		FontWeightProps,
		LineHeightProps,
		DisplayProps,
		TextAlignProps,
		MaxWidthProps,
		MarginProps,
		OverflowProps {
	textOverflow?: string
	textTransform?: string
	whitespace?: string
}

export interface PillTextProps
	extends ColorProps,
		FontFamilyProps,
		FontSizeProps,
		FontWeightProps,
		LineHeightProps,
		WidthProps {
	visibility?: string
}

export interface LabelProps extends FontFamilyProps, FontSizeProps, FontWeightProps, LineHeightProps {}

const headingStyles = css`
	${color};
	${fontFamily};
	${fontSize};
	${fontWeight};
	${lineHeight};
	${alignSelf}
	${justifySelf};
	${textAlign};
	${maxWidth};

	margin: 0;
`

// Heading
const H6 = styled.h6<HeadingProps>`
	${headingStyles};
`

H6.defaultProps = {
	fontFamily: 'body',
}

const H5 = styled.h5<HeadingProps>`
	${headingStyles};
`

H5.defaultProps = {
	fontFamily: 'body',
}

const H4 = styled.h4<HeadingProps>`
	${headingStyles};
`

H4.defaultProps = {
	fontFamily: 'body',
}

const H3 = styled.h3<HeadingProps>`
	${headingStyles};
`

H3.defaultProps = {
	fontFamily: 'body',
}

const H2 = styled.h2<HeadingProps>`
	${headingStyles};
`

H2.defaultProps = {
	fontFamily: 'body',
}

const H1 = styled.h1<HeadingProps>`
	${headingStyles};
`

H1.defaultProps = {
	fontFamily: 'body',
}

export const Heading = {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
}

// Paragraph
export const P = styled.p<ParagraphProps>`
	${color};
	${fontFamily};
	${fontSize};
	${fontWeight};
	${lineHeight};
	${textAlign};
	${alignItems};
	${maxWidth};
	margin: 0;
	${margin};
	${overflow};
	${display};
	text-transform: ${({ textTransform }) => textTransform};
	text-overflow: ${({ textOverflow }) => textOverflow};
	white-space: ${({ whitespace }) => whitespace};
`

P.defaultProps = {
	fontFamily: 'body',
	color: 'white',
}