import { utils, web3 } from "@project-serum/anchor";

import { STATS_ADDRESS, STATS_ENTRY_SEED } from "./constants";

/**
 * Finds the stats entry id.
 * @returns
 */
export const findStatsEntryId = async (
  name: string
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(STATS_ENTRY_SEED), utils.bytes.utf8.encode(name)],
    STATS_ADDRESS
  );
};
