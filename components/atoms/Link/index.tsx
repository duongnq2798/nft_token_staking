import styled from 'styled-components'
import {
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
	lineHeight,
	LineHeightProps,
} from 'styled-system'

export interface LinkProps
	extends ColorProps,
		DisplayProps,
		FontFamilyProps,
		FontWeightProps,
		FontSizeProps,
		LineHeightProps {
	href?: string
}

export const Link = styled.a<LinkProps>`
	${color};
	${fontFamily};
	${fontSize};
	${fontWeight};
	${lineHeight};
	${display};
	text-decoration: underline;
	letter-spacing: 0em;
	text-align: right;
`

Link.defaultProps = {
	color: 'dark-900',
	fontFamily: 'body',
}

interface NavLinkProps extends FontFamilyProps {}

export const NavLink = styled.a<NavLinkProps>`
	color: white;
	font-weight: bold;
	background-color: #1e1e24;
	height: 25px;
	padding: 0 20px;
	display: flex;
	align-items: center;
	margin: 0 2px;
	font-size: 0.8rem;
	text-decoration: none;

	${fontFamily};

	& > i {
		margin-right: 7px;
	}

	@media (min-width: 576px) {
		height: 45px;
		font-size: 0.9rem;
	}
`

NavLink.defaultProps = {
	fontFamily: 'body',
}