
import styled from "@emotion/styled";

import { apiBase } from "../utils/api";

interface Props {
  handle: string;
  cluster?: string;
  dev?: boolean;
}

export const TwitterHandleNFT: React.FC<Props> = ({
  handle,
  dev,
  cluster,
}: Props) => {
  return (
    <Outer>
      {/* <StyledImg
        alt={formatName("twitter", handle)}
        src={`${apiBase(dev)}/img/?text=${formatMintNaturalAmountAsDecimal("twitter", handle)}${
          cluster && `&cluster=${cluster}`
        }`}
      /> */}
    </Outer>
  );
};

const StyledImg = styled.img`
  border-radius: 10px;
  height: 120px;
  width: 120px;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 10%);
`;

const Outer = styled.div``;

const CardInner = styled.div`
  margin: 0px 20px;
  width: 100%;
`;

const CardHeader = styled.div`
  height: 40px;
`;

const CardFooter = styled.div`
  height: 40px;
`;
