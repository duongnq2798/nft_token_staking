import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem;
    padding: 32px 0;
    border-radius: 12px;
    border: 4px double transparent;
    background-image: linear-gradient(#171a19,#171a19),radial-gradient(98.54% 76.07% at 93.79% 17.7%,#f196d1 0,#cf97ec 23.75%,#99bded 47.71%,#9cecca 66.98%,#ffddb4 82.6%,#f896c5 100%);
    background-origin: border-box;
    background-clip: padding-box,border-box;
    margin-bottom: 40px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: row;
    justify-between: space-between;
    align-items: center;
    padding: 8px 20px;

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
    &:nth-child(1) {
        border-right: 1px solid #FFFFFF;
    }

    &:nth-child(2) {
        border-right: 1px solid #FFFFFF;
    }

    &:nth-child(3) {
        border-right: 1px solid #FFFFFF;
    }
`;
export const Label = styled.h3`
    display: block;
    width: 100%;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: .08em;
    text-transform: uppercase;
    background: linear-gradient(to right,rgb(236,72,153),rgb(239,68,68),rgb(234,179,8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Poppins;

    @media screen and (min-width: 1200px) {
        font-size: 14px;
      }
      @media screen and (max-width: 1200px) {
        font-size: 12px;
      }
      @media screen and (max-width: 600px) {
        font-size: 10px;
      }
      @media screen and (max-width: 450px) {
        font-size: 10px;
      }
`;

export const Content = styled.h3`
    color: rgb(234,179,8);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0px;
    white-space: nowrap;
    font-family: Poppins;

    @media screen and (min-width: 1200px) {
        font-size: 14px;
      }
      @media screen and (max-width: 1200px) {
        font-size: 12px;
      }
      @media screen and (max-width: 600px) {
        font-size: 10px;
      }
      @media screen and (max-width: 450px) {
        font-size: 10px;
      }
`;