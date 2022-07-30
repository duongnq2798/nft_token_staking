export type Namespaces = {
  "version": "0.0.0",
  "name": "namespaces",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitializeGlobalNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "setRentPercentage",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rentPercentage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferGlobalUpdateAuthority",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "updateAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferGlobalRentAuthority",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rentAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createNamespace",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "CreateNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "updateNamespace",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "collectNamespaceFunds",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalNamespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "namespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentAuthorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "collectGlobalFunds",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalNamespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitEntryIx"
          }
        }
      ]
    },
    {
      "name": "claimEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificatePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "ClaimEntryIx"
          }
        }
      ]
    },
    {
      "name": "setEntryData",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "reverseEntryBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "revokeEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespacePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificatePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "revokeReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateManagedEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateManagedReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateUnmanagedEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateUnmanagedReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "createClaimRequest",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "entryName",
          "type": "string"
        },
        {
          "name": "claimRequestBump",
          "type": "u8"
        },
        {
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateClaimRequest",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approveAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentRequest",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isApproved",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateEntryMintMetadata",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificateMintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalContext",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentPercentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "namespace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "schema",
            "type": "u8"
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "claimRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "requestor",
            "type": "publicKey"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "namespace",
            "type": "publicKey"
          },
          {
            "name": "entryName",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "namespace",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "data",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reverseEntry",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "reverseEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "entryName",
            "type": "string"
          },
          {
            "name": "namespaceName",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ClaimEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "duration",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "certificateBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "CreateNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "schema",
            "type": "u8"
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "InitEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "entryBump",
            "type": "u8"
          },
          {
            "name": "mintManagerBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeGlobalNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rentPercentage",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "UpdateNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "InvalidOwnerMint",
      "msg": "Owner mint is invalid"
    },
    {
      "code": 301,
      "name": "EntryNotExpired",
      "msg": "Entry has not expired"
    },
    {
      "code": 302,
      "name": "RentalDurationTooSmall",
      "msg": "Rental duration too small try adding more funds"
    },
    {
      "code": 303,
      "name": "RentalDurationTooLarge",
      "msg": "Rental duration too large try adding less funds"
    },
    {
      "code": 304,
      "name": "NamespaceRequiresDuration",
      "msg": "Namespace requires duration"
    },
    {
      "code": 305,
      "name": "InvalidAuthority",
      "msg": "Authority is invalid"
    },
    {
      "code": 306,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authorty token account"
    },
    {
      "code": 307,
      "name": "InvalidNamespacePaymentAccount",
      "msg": "Invalid namespace payment account"
    },
    {
      "code": 308,
      "name": "InvalidGlobalNamespacePaymentAccount",
      "msg": "Invalid global namespace payment account"
    },
    {
      "code": 309,
      "name": "InvalidNamespace",
      "msg": "Invalid namespace"
    },
    {
      "code": 310,
      "name": "InvalidEntry",
      "msg": "Invalid entry"
    },
    {
      "code": 311,
      "name": "InvalidCertificate",
      "msg": "Invalid certificate"
    },
    {
      "code": 312,
      "name": "InvalidPaymentMint",
      "msg": "Invalid payment mint"
    },
    {
      "code": 313,
      "name": "InvalidReverseEntry",
      "msg": "Invalid reverse entry"
    },
    {
      "code": 314,
      "name": "ClaimNotAllowed",
      "msg": "Claim not allowed"
    },
    {
      "code": 315,
      "name": "InvalidApproveAuthority",
      "msg": "Invalid approve authority"
    },
    {
      "code": 316,
      "name": "NamespaceRequiresToken",
      "msg": "Namespace requires token"
    }
  ]
};

export const IDL: Namespaces = {
  "version": "0.0.0",
  "name": "namespaces",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitializeGlobalNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "setRentPercentage",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rentPercentage",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferGlobalUpdateAuthority",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "updateAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferGlobalRentAuthority",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rentAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createNamespace",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "CreateNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "updateNamespace",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateNamespaceIx"
          }
        }
      ]
    },
    {
      "name": "collectNamespaceFunds",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalNamespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "namespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentAuthorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "collectGlobalFunds",
      "accounts": [
        {
          "name": "globalContext",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalNamespacePaymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitEntryIx"
          }
        }
      ]
    },
    {
      "name": "claimEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificatePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "ClaimEntryIx"
          }
        }
      ]
    },
    {
      "name": "setEntryData",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "reverseEntryBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "revokeEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespacePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mintManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificatePaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPaymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificateProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "revokeReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateManagedEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateManagedReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "namespaceCertificateTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateUnmanagedEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "invalidateUnmanagedReverseEntry",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "certificate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "invalidator",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "createClaimRequest",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "claimRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "entryName",
          "type": "string"
        },
        {
          "name": "claimRequestBump",
          "type": "u8"
        },
        {
          "name": "user",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateClaimRequest",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approveAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentRequest",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isApproved",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateEntryMintMetadata",
      "accounts": [
        {
          "name": "namespace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "certificateMintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalContext",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentPercentage",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "namespace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "schema",
            "type": "u8"
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "claimRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "requestor",
            "type": "publicKey"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "namespace",
            "type": "publicKey"
          },
          {
            "name": "entryName",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "namespace",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "data",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reverseEntry",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "reverseEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "entryName",
            "type": "string"
          },
          {
            "name": "namespaceName",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ClaimEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "duration",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "certificateBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "CreateNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "schema",
            "type": "u8"
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "InitEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "entryBump",
            "type": "u8"
          },
          {
            "name": "mintManagerBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeGlobalNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rentPercentage",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "UpdateNamespaceIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "rentAuthority",
            "type": "publicKey"
          },
          {
            "name": "approveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "paymentAmountDaily",
            "type": "u64"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          },
          {
            "name": "minRentalSeconds",
            "type": "i64"
          },
          {
            "name": "maxRentalSeconds",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "transferableEntries",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "InvalidOwnerMint",
      "msg": "Owner mint is invalid"
    },
    {
      "code": 301,
      "name": "EntryNotExpired",
      "msg": "Entry has not expired"
    },
    {
      "code": 302,
      "name": "RentalDurationTooSmall",
      "msg": "Rental duration too small try adding more funds"
    },
    {
      "code": 303,
      "name": "RentalDurationTooLarge",
      "msg": "Rental duration too large try adding less funds"
    },
    {
      "code": 304,
      "name": "NamespaceRequiresDuration",
      "msg": "Namespace requires duration"
    },
    {
      "code": 305,
      "name": "InvalidAuthority",
      "msg": "Authority is invalid"
    },
    {
      "code": 306,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authorty token account"
    },
    {
      "code": 307,
      "name": "InvalidNamespacePaymentAccount",
      "msg": "Invalid namespace payment account"
    },
    {
      "code": 308,
      "name": "InvalidGlobalNamespacePaymentAccount",
      "msg": "Invalid global namespace payment account"
    },
    {
      "code": 309,
      "name": "InvalidNamespace",
      "msg": "Invalid namespace"
    },
    {
      "code": 310,
      "name": "InvalidEntry",
      "msg": "Invalid entry"
    },
    {
      "code": 311,
      "name": "InvalidCertificate",
      "msg": "Invalid certificate"
    },
    {
      "code": 312,
      "name": "InvalidPaymentMint",
      "msg": "Invalid payment mint"
    },
    {
      "code": 313,
      "name": "InvalidReverseEntry",
      "msg": "Invalid reverse entry"
    },
    {
      "code": 314,
      "name": "ClaimNotAllowed",
      "msg": "Claim not allowed"
    },
    {
      "code": 315,
      "name": "InvalidApproveAuthority",
      "msg": "Invalid approve authority"
    },
    {
      "code": 316,
      "name": "NamespaceRequiresToken",
      "msg": "Namespace requires token"
    }
  ]
};
