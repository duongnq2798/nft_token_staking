export type StakePool = {
  version: "0.0.0";
  name: "stake_pool";
  instructions: [
    {
      name: "initEntry";
      accounts: [
        {
          name: "stakeEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "originalMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certifiacteMintMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenMetadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "ix";
          type: {
            defined: "InitializeEntryIx";
          };
        }
      ];
    },
    {
      name: "stake";
      accounts: [
        {
          name: "stakeEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "originalMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryOriginalMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryCertificateMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userOriginalMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userCertificateMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintManager";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificate";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificateProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "ix";
          type: {
            defined: "StakeIx";
          };
        }
      ];
    },
    {
      name: "unstake";
      accounts: [
        {
          name: "stakeEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "originalMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificateMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "stakeEntryOriginalMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryCertificateMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userOriginalMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userCertificateMintTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "group";
      accounts: [
        {
          name: "groupEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryOne";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryTwo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryThree";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryFour";
          isMut: true;
          isSigner: false;
        },
        {
          name: "staker";
          isMut: false;
          isSigner: true;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "ix";
          type: {
            defined: "GroupStakeIx";
          };
        }
      ];
    },
    {
      name: "ungroup";
      accounts: [
        {
          name: "groupEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryOne";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryTwo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryThree";
          isMut: true;
          isSigner: false;
        },
        {
          name: "stakeEntryFour";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "stakeEntry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "originalMint";
            type: "publicKey";
          },
          {
            name: "certificateMint";
            type: "publicKey";
          },
          {
            name: "totalStakeSeconds";
            type: "i64";
          },
          {
            name: "lastStakedAt";
            type: "i64";
          },
          {
            name: "stakeBoost";
            type: "u64";
          },
          {
            name: "lastStaker";
            type: "publicKey";
          },
          {
            name: "tribe";
            type: "string";
          },
          {
            name: "hungry";
            type: "bool";
          },
          {
            name: "stakeGroup";
            type: {
              option: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "groupStakeEntry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "stakeEntryOne";
            type: "publicKey";
          },
          {
            name: "stakeEntryTwo";
            type: "publicKey";
          },
          {
            name: "stakeEntryThree";
            type: "publicKey";
          },
          {
            name: "stakeEntryFour";
            type: "publicKey";
          },
          {
            name: "staker";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "GroupStakeIx";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "InitializeEntryIx";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "mintManagerBump";
            type: "u8";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "tribe";
            type: "string";
          },
          {
            name: "hungry";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "StakeIx";
      type: {
        kind: "struct";
        fields: [
          {
            name: "certificateBump";
            type: "u8";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 300;
      name: "InvalidOriginalMint";
      msg: "Original mint is invalid";
    },
    {
      code: 301;
      name: "InvalidCertificateMint";
      msg: "Certificate mint is invalid";
    },
    {
      code: 302;
      name: "InvalidUserTokenAccountOwner";
      msg: "User must own token account";
    },
    {
      code: 303;
      name: "InvalidUserOriginalMintTokenAccount";
      msg: "Invalid user original mint token account";
    },
    {
      code: 304;
      name: "InvalidUserCertificateMintTokenAccount";
      msg: "Invalid user certificate mint account";
    },
    {
      code: 305;
      name: "InvalidStakeEntryOriginalMintTokenAccount";
      msg: "Invalid stake entry original mint token account";
    },
    {
      code: 306;
      name: "InvalidStakeEntryCertificateMintTokenAccount";
      msg: "Invalid stake entry certificate mint token account";
    },
    {
      code: 307;
      name: "InvalidUnstakeUser";
      msg: "Invalid unstake user only last staker can unstake";
    },
    {
      code: 308;
      name: "CannotGroupStake";
      msg: "Group stake requires four currently staked tokens of different tribes";
    },
    {
      code: 309;
      name: "GroupUnstakeEntryDoesntMatch";
      msg: "Stake entry doesn't belong to stake group";
    },
    {
      code: 310;
      name: "StakeEntryAlreadyGrouped";
      msg: "Stake entry is already grouped";
    },
    {
      code: 311;
      name: "StakeEntryIsPartOfStakeGroup";
      msg: "Cannot unstake because stake entry is part of a stake group";
    }
  ];
};

export const IDL: StakePool = {
  version: "0.0.0",
  name: "stake_pool",
  instructions: [
    {
      name: "initEntry",
      accounts: [
        {
          name: "stakeEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "originalMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certifiacteMintMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "ix",
          type: {
            defined: "InitializeEntryIx",
          },
        },
      ],
    },
    {
      name: "stake",
      accounts: [
        {
          name: "stakeEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "originalMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryOriginalMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryCertificateMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userOriginalMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userCertificateMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintManager",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificateProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "ix",
          type: {
            defined: "StakeIx",
          },
        },
      ],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "stakeEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "originalMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificateMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "stakeEntryOriginalMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryCertificateMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userOriginalMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userCertificateMintTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "group",
      accounts: [
        {
          name: "groupEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryOne",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryTwo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryThree",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryFour",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: true,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "ix",
          type: {
            defined: "GroupStakeIx",
          },
        },
      ],
    },
    {
      name: "ungroup",
      accounts: [
        {
          name: "groupEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryOne",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryTwo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryThree",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeEntryFour",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "stakeEntry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "originalMint",
            type: "publicKey",
          },
          {
            name: "certificateMint",
            type: "publicKey",
          },
          {
            name: "totalStakeSeconds",
            type: "i64",
          },
          {
            name: "lastStakedAt",
            type: "i64",
          },
          {
            name: "stakeBoost",
            type: "u64",
          },
          {
            name: "lastStaker",
            type: "publicKey",
          },
          {
            name: "tribe",
            type: "string",
          },
          {
            name: "hungry",
            type: "bool",
          },
          {
            name: "stakeGroup",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "groupStakeEntry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "stakeEntryOne",
            type: "publicKey",
          },
          {
            name: "stakeEntryTwo",
            type: "publicKey",
          },
          {
            name: "stakeEntryThree",
            type: "publicKey",
          },
          {
            name: "stakeEntryFour",
            type: "publicKey",
          },
          {
            name: "staker",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "GroupStakeIx",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "InitializeEntryIx",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "mintManagerBump",
            type: "u8",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "tribe",
            type: "string",
          },
          {
            name: "hungry",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "StakeIx",
      type: {
        kind: "struct",
        fields: [
          {
            name: "certificateBump",
            type: "u8",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 300,
      name: "InvalidOriginalMint",
      msg: "Original mint is invalid",
    },
    {
      code: 301,
      name: "InvalidCertificateMint",
      msg: "Certificate mint is invalid",
    },
    {
      code: 302,
      name: "InvalidUserTokenAccountOwner",
      msg: "User must own token account",
    },
    {
      code: 303,
      name: "InvalidUserOriginalMintTokenAccount",
      msg: "Invalid user original mint token account",
    },
    {
      code: 304,
      name: "InvalidUserCertificateMintTokenAccount",
      msg: "Invalid user certificate mint account",
    },
    {
      code: 305,
      name: "InvalidStakeEntryOriginalMintTokenAccount",
      msg: "Invalid stake entry original mint token account",
    },
    {
      code: 306,
      name: "InvalidStakeEntryCertificateMintTokenAccount",
      msg: "Invalid stake entry certificate mint token account",
    },
    {
      code: 307,
      name: "InvalidUnstakeUser",
      msg: "Invalid unstake user only last staker can unstake",
    },
    {
      code: 308,
      name: "CannotGroupStake",
      msg: "Group stake requires four currently staked tokens of different tribes",
    },
    {
      code: 309,
      name: "GroupUnstakeEntryDoesntMatch",
      msg: "Stake entry doesn't belong to stake group",
    },
    {
      code: 310,
      name: "StakeEntryAlreadyGrouped",
      msg: "Stake entry is already grouped",
    },
    {
      code: 311,
      name: "StakeEntryIsPartOfStakeGroup",
      msg: "Cannot unstake because stake entry is part of a stake group",
    },
  ],
};
