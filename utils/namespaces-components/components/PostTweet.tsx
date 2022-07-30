import styled from "@emotion/styled";
import type { Wallet } from "@saberhq/solana-contrib";

import { Button } from "../common/Button";
import { TwitterIcon } from "../common/TwitterIcon";

export const PostTweet = ({
  wallet,
  appName,
  appTwitter,
  disabled,
  callback,
  cluster,
}: {
  wallet: Wallet | null;
  appTwitter?: string | undefined;
  appName?: string | undefined;
  disabled: boolean;
  callback?: () => void;
  cluster?: string | undefined;
}) => {
  const link = useGenerateLink(
    wallet?.publicKey?.toString(),
    appName,
    appTwitter,
    cluster
  );
  return (
    <TwitterButtonWrapper
      href={link}
      onClick={() => callback && callback()}
      target="_blank"
      rel="noreferrer noopener"
    >
      <TwitterButton variant="primary" disabled={disabled}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TwitterIcon />
          <span
            style={{
              position: "relative",
              bottom: "1px",
              marginLeft: "6px",
              marginRight: "12px",
            }}
          >
            Verify
          </span>
        </div>
        {/* <i className="fas fa-chevron-right" /> */}
      </TwitterButton>
    </TwitterButtonWrapper>
  );
};

const TwitterButtonWrapper = styled.a`
  margin-top: 5px;
  display: inline-block;
`;

const TwitterButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 12px;
`;

const useGenerateLink = (
  pubkey: string | undefined,
  appName: string | undefined,
  appTwitter: string | undefined,
  cluster?: string | undefined
): string => {
  if (!pubkey) return "";
  const link = [
    `https://twitter.com/intent/tweet?text=`,
    encodeURIComponent(
      [
        `Claiming my Twitter handle as a @Solana NFT${
          appTwitter || appName ? ` on ${appTwitter || appName}` : ""
        } using @cardinal_labs protocol and linking it to my address ${pubkey}\n\n`,
        `Verify and claim yours at https://twitter.cardinal.so${
          cluster === "devnet" ? "?cluster=devnet" : ""
        }!`,
      ].join("")
    ),
  ].join("");
  return link;
};
