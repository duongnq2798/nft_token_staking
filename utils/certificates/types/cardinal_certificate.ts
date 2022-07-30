export type CardinalCertificate = {
  version: "0.0.0";
  name: "cardinal_certificate";
  instructions: [
    {
      name: "createMintManager";
      accounts: [
        {
          name: "mintManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "freezeAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
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
          name: "bump";
          type: "u8";
        }
      ];
    },
    {
      name: "deleteMintManager";
      accounts: [
        {
          name: "mintManager";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "freezeAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "payer";
          isMut: false;
          isSigner: true;
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
      name: "issueCertificate";
      accounts: [
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
          name: "certificateMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "issuerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
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
            defined: "IssueCertificateIx";
          };
        }
      ];
    },
    {
      name: "unissueCertificate";
      accounts: [
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
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "issuerTokenAccount";
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
      name: "setOriginalMint";
      accounts: [
        {
          name: "certificate";
          isMut: true;
          isSigner: false;
        },
        {
          name: "originalMintHolder";
          isMut: false;
          isSigner: true;
        },
        {
          name: "originalMintTokenAccount";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "claimCertificate";
      accounts: [
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
          name: "certificateMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificatePaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: true;
          isSigner: true;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientPaymentTokenAccount";
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
      name: "useCertificate";
      accounts: [
        {
          name: "certificate";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: false;
          isSigner: true;
        },
        {
          name: "recipientTokenAccount";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "extendCertificate";
      accounts: [
        {
          name: "certificate";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificatePaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "paymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "invalidateCertificate";
      accounts: [
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
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificatePaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerPaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "invalidator";
          isMut: true;
          isSigner: true;
        },
        {
          name: "invalidatorTokenAccount";
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
      name: "revokeCertificate";
      accounts: [
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
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificatePaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientPaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerPaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revokeAuthority";
          isMut: true;
          isSigner: true;
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
      name: "revokeCertificateV2";
      accounts: [
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
          name: "certificateMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificateTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "certificatePaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipientPaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "issuerPaymentTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revokeAuthority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "revokeRecipient";
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
    }
  ];
  accounts: [
    {
      name: "certificate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "issuer";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "kind";
            type: "u8";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "recipient";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "recipientTokenAccount";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "paymentAmount";
            type: {
              option: "u64";
            };
          },
          {
            name: "paymentMint";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "originalMint";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "expiration";
            type: {
              option: "i64";
            };
          },
          {
            name: "duration";
            type: {
              option: "i64";
            };
          },
          {
            name: "startAtIssuance";
            type: {
              option: "bool";
            };
          },
          {
            name: "maxUsages";
            type: {
              option: "u64";
            };
          },
          {
            name: "totalUsages";
            type: {
              option: "u64";
            };
          },
          {
            name: "usages";
            type: "u64";
          },
          {
            name: "revokeAuthority";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "isReturnable";
            type: "bool";
          },
          {
            name: "isExtendable";
            type: "bool";
          },
          {
            name: "issuedAt";
            type: "i64";
          },
          {
            name: "claimedAt";
            type: "i64";
          },
          {
            name: "invalidatedAt";
            type: "i64";
          },
          {
            name: "state";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "mintManager";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "initializer";
            type: "publicKey";
          },
          {
            name: "outstandingCertificates";
            type: "i64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "IssueCertificateIx";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "kind";
            type: "u8";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "recipient";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "paymentAmount";
            type: {
              option: "u64";
            };
          },
          {
            name: "paymentMint";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "duration";
            type: {
              option: "i64";
            };
          },
          {
            name: "startAtIssuance";
            type: {
              option: "bool";
            };
          },
          {
            name: "totalUsages";
            type: {
              option: "u64";
            };
          },
          {
            name: "revokeAuthority";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "isReturnable";
            type: "bool";
          },
          {
            name: "isExtendable";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "CertificateState";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Issued";
          },
          {
            name: "Claimed";
          },
          {
            name: "Invalidated";
          }
        ];
      };
    },
    {
      name: "CertificateKind";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Managed";
          },
          {
            name: "Unmanaged";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 300;
      name: "IssuerMustOwnTokenAccount";
      msg: "Issuer does not own token account";
    },
    {
      code: 301;
      name: "InvalidOwnership";
      msg: "User is not the current owner of this certificate so cannot use it";
    },
    {
      code: 302;
      name: "CannotUse";
      msg: "Cannot use this certificate";
    },
    {
      code: 303;
      name: "CannotRevoke";
      msg: "User cannot clawback this certificate";
    },
    {
      code: 304;
      name: "CannotInvalidate";
      msg: "Certificate is not invalid";
    },
    {
      code: 305;
      name: "CertificateMustOwnTokenAccount";
      msg: "Certificate needs to own its expiry account";
    },
    {
      code: 306;
      name: "InvalidIssuer";
      msg: "Invalid issuer specified";
    },
    {
      code: 307;
      name: "UnauthorizedRecipient";
      msg: "Recipient is not authorized to claim this certificate";
    },
    {
      code: 308;
      name: "InvalidCertificateTokenAccount";
      msg: "Certificate token account is incorrect";
    },
    {
      code: 309;
      name: "InvalidCertificatePaymentTokenAccount";
      msg: "Certificate payment token account is incorrect";
    },
    {
      code: 310;
      name: "InvalidCertificateMint";
      msg: "Certificate mint is incorrect";
    },
    {
      code: 311;
      name: "InvalidFreezeAuthority";
      msg: "Freeze authority must have freeze authority of the mint";
    },
    {
      code: 312;
      name: "OutstandingCertificates";
      msg: "Mint manager still has outstanding certificates";
    },
    {
      code: 313;
      name: "InvalidRecipientTokenAccount";
      msg: "Invalid recipient token account";
    },
    {
      code: 314;
      name: "InvalidRecipientPaymentTokenAccount";
      msg: "Invalid recipient payment token account";
    },
    {
      code: 315;
      name: "InvalidIssuerPaymentTokenAccount";
      msg: "Invalid issuer payment token account";
    },
    {
      code: 316;
      name: "InvalidOriginalMintAccount";
      msg: "Invalid original mint account";
    },
    {
      code: 317;
      name: "CannotExtend";
      msg: "Certificate cannot be extended";
    },
    {
      code: 318;
      name: "InvalidCertificateKind";
      msg: "Certificate kind is invalid";
    },
    {
      code: 319;
      name: "CertificateNotIssued";
      msg: "Certificate has not been issued";
    }
  ];
};

export const IDL: CardinalCertificate = {
  version: "0.0.0",
  name: "cardinal_certificate",
  instructions: [
    {
      name: "createMintManager",
      accounts: [
        {
          name: "mintManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "freezeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
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
          name: "bump",
          type: "u8",
        },
      ],
    },
    {
      name: "deleteMintManager",
      accounts: [
        {
          name: "mintManager",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "freezeAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
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
      name: "issueCertificate",
      accounts: [
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
          name: "certificateMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "issuerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
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
            defined: "IssueCertificateIx",
          },
        },
      ],
    },
    {
      name: "unissueCertificate",
      accounts: [
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
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "issuerTokenAccount",
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
      name: "setOriginalMint",
      accounts: [
        {
          name: "certificate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "originalMintHolder",
          isMut: false,
          isSigner: true,
        },
        {
          name: "originalMintTokenAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claimCertificate",
      accounts: [
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
          name: "certificateMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificatePaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: true,
          isSigner: true,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientPaymentTokenAccount",
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
      name: "useCertificate",
      accounts: [
        {
          name: "certificate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: false,
          isSigner: true,
        },
        {
          name: "recipientTokenAccount",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "extendCertificate",
      accounts: [
        {
          name: "certificate",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificatePaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "paymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "invalidateCertificate",
      accounts: [
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
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificatePaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerPaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "invalidator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "invalidatorTokenAccount",
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
      name: "revokeCertificate",
      accounts: [
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
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificatePaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientPaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerPaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revokeAuthority",
          isMut: true,
          isSigner: true,
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
      name: "revokeCertificateV2",
      accounts: [
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
          name: "certificateMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificateTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "certificatePaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipientPaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "issuerPaymentTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revokeAuthority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "revokeRecipient",
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
  ],
  accounts: [
    {
      name: "certificate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "issuer",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "kind",
            type: "u8",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "recipient",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "recipientTokenAccount",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "paymentAmount",
            type: {
              option: "u64",
            },
          },
          {
            name: "paymentMint",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "originalMint",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "expiration",
            type: {
              option: "i64",
            },
          },
          {
            name: "duration",
            type: {
              option: "i64",
            },
          },
          {
            name: "startAtIssuance",
            type: {
              option: "bool",
            },
          },
          {
            name: "maxUsages",
            type: {
              option: "u64",
            },
          },
          {
            name: "totalUsages",
            type: {
              option: "u64",
            },
          },
          {
            name: "usages",
            type: "u64",
          },
          {
            name: "revokeAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "isReturnable",
            type: "bool",
          },
          {
            name: "isExtendable",
            type: "bool",
          },
          {
            name: "issuedAt",
            type: "i64",
          },
          {
            name: "claimedAt",
            type: "i64",
          },
          {
            name: "invalidatedAt",
            type: "i64",
          },
          {
            name: "state",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "mintManager",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "initializer",
            type: "publicKey",
          },
          {
            name: "outstandingCertificates",
            type: "i64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "IssueCertificateIx",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "kind",
            type: "u8",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "recipient",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "paymentAmount",
            type: {
              option: "u64",
            },
          },
          {
            name: "paymentMint",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "duration",
            type: {
              option: "i64",
            },
          },
          {
            name: "startAtIssuance",
            type: {
              option: "bool",
            },
          },
          {
            name: "totalUsages",
            type: {
              option: "u64",
            },
          },
          {
            name: "revokeAuthority",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "isReturnable",
            type: "bool",
          },
          {
            name: "isExtendable",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "CertificateState",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Issued",
          },
          {
            name: "Claimed",
          },
          {
            name: "Invalidated",
          },
        ],
      },
    },
    {
      name: "CertificateKind",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Managed",
          },
          {
            name: "Unmanaged",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 300,
      name: "IssuerMustOwnTokenAccount",
      msg: "Issuer does not own token account",
    },
    {
      code: 301,
      name: "InvalidOwnership",
      msg: "User is not the current owner of this certificate so cannot use it",
    },
    {
      code: 302,
      name: "CannotUse",
      msg: "Cannot use this certificate",
    },
    {
      code: 303,
      name: "CannotRevoke",
      msg: "User cannot clawback this certificate",
    },
    {
      code: 304,
      name: "CannotInvalidate",
      msg: "Certificate is not invalid",
    },
    {
      code: 305,
      name: "CertificateMustOwnTokenAccount",
      msg: "Certificate needs to own its expiry account",
    },
    {
      code: 306,
      name: "InvalidIssuer",
      msg: "Invalid issuer specified",
    },
    {
      code: 307,
      name: "UnauthorizedRecipient",
      msg: "Recipient is not authorized to claim this certificate",
    },
    {
      code: 308,
      name: "InvalidCertificateTokenAccount",
      msg: "Certificate token account is incorrect",
    },
    {
      code: 309,
      name: "InvalidCertificatePaymentTokenAccount",
      msg: "Certificate payment token account is incorrect",
    },
    {
      code: 310,
      name: "InvalidCertificateMint",
      msg: "Certificate mint is incorrect",
    },
    {
      code: 311,
      name: "InvalidFreezeAuthority",
      msg: "Freeze authority must have freeze authority of the mint",
    },
    {
      code: 312,
      name: "OutstandingCertificates",
      msg: "Mint manager still has outstanding certificates",
    },
    {
      code: 313,
      name: "InvalidRecipientTokenAccount",
      msg: "Invalid recipient token account",
    },
    {
      code: 314,
      name: "InvalidRecipientPaymentTokenAccount",
      msg: "Invalid recipient payment token account",
    },
    {
      code: 315,
      name: "InvalidIssuerPaymentTokenAccount",
      msg: "Invalid issuer payment token account",
    },
    {
      code: 316,
      name: "InvalidOriginalMintAccount",
      msg: "Invalid original mint account",
    },
    {
      code: 317,
      name: "CannotExtend",
      msg: "Certificate cannot be extended",
    },
    {
      code: 318,
      name: "InvalidCertificateKind",
      msg: "Certificate kind is invalid",
    },
    {
      code: 319,
      name: "CertificateNotIssued",
      msg: "Certificate has not been issued",
    },
  ],
};
