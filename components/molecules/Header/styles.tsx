import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background: linear-gradient(#171a19, #171a19);
`

export const CenterMenu = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
	width: 100%;
	justify-content: center;
    order: 3;
  }
`

export const MenuItem = styled.span`
  background: linear-gradient(
    to right,
    rgb(236, 72, 153),
    rgb(239, 68, 68),
    rgb(234, 179, 8)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`
