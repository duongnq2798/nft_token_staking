export type CardinalStats = {
  version: "1.0.3";
  name: "cardinal_stats";
  instructions: [
    {
      name: "initStatsEntry";
      accounts: [
        {
          name: "statsEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
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
            defined: "InitStatsEntryIx";
          };
        }
      ];
    },
    {
      name: "updateStatsEntry";
      accounts: [
        {
          name: "statsEntry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "value";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "statsEntry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "value";
            type: "string";
          },
          {
            name: "authority";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "InitStatsEntryIx";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidAuthority";
      msg: "Invalid authority";
    }
  ];
};

export const IDL: CardinalStats = {
  version: "1.0.3",
  name: "cardinal_stats",
  instructions: [
    {
      name: "initStatsEntry",
      accounts: [
        {
          name: "statsEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
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
            defined: "InitStatsEntryIx",
          },
        },
      ],
    },
    {
      name: "updateStatsEntry",
      accounts: [
        {
          name: "statsEntry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "value",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "statsEntry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "value",
            type: "string",
          },
          {
            name: "authority",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "InitStatsEntryIx",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAuthority",
      msg: "Invalid authority",
    },
  ],
};
