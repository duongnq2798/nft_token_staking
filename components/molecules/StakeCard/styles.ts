import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;

  @media screen and (min-width: 1200px) {
    width: 25%;
  }
  @media screen and (max-width: 1200px) {
    width: 33.3%;
  }
  @media screen and (max-width: 600px) {
    width: 50%;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 4px double transparent;
  background-image: linear-gradient(#171a19, #171a19),
    radial-gradient(
      98.54% 76.07% at 93.79% 17.7%,
      #f196d1 0,
      #cf97ec 23.75%,
      #99bded 47.71%,
      #9cecca 66.98%,
      #ffddb4 82.6%,
      #f896c5 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;

  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const NFTImage = styled.img`
  height: auto;
  max-width: 100%;
  vertical-align: middle;
`

const CardContent = styled.div`
  padding: 1rem;
  background: linear-gradient(#171a19, #171a19);
`

const CardTitle = styled.h2`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0px;
`

const CardText = styled.p`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  font-weight: 400;
`

const Button = styled.button`
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 400;
  display: block;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;

  :hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`

const GroupButton = styled.div`
  display: flex;
`

const RowCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

export {
    Wrapper,
    Card,
    NFTImage,
    CardContent,
    CardTitle,
    CardText,
    Button,
    GroupButton,
    RowCenter
}