import styled from "@emotion/styled";

interface Props {
  title?: string;
  description: string | React.ReactNode;
}

export const Message: React.FC<Props> = ({ title, description }: Props) => {
  return (
    <Wrapper>
      <Info>
        {title && <Title>{title}</Title>}
        <Description>{description}</Description>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;
