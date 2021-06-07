import { Idl } from '@project-serum/anchor';

export const IDL: Idl = {
  version: '0.0.0',
  name: 'club_program',
  instructions: [
    {
      name: 'createClub',
      accounts: [
        {
          name: 'club',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clubSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clubTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clubTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clubVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clubTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curator',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'curatorClubTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'nonce',
          type: 'u8',
        },
        {
          name: 'seeds',
          type: 'string',
        },
      ],
    },
    {
      name: 'initializeTrade',
      accounts: [
        {
          name: 'trade',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'club',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tradeSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tradeTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'nftAddress',
          type: 'string',
        },
        {
          name: 'tradeAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'confirmTrade',
      accounts: [
        {
          name: 'trade',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clubVault',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'txId',
          type: 'string',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'ClubVault',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'head',
            type: 'u64',
          },
          {
            name: 'tail',
            type: 'u64',
          },
          {
            name: 'clubAccount',
            type: 'publicKey',
          },
          {
            name: 'nfts',
            type: {
              array: [
                {
                  defined: 'NFTOwnership',
                },
                150,
              ],
            },
          },
        ],
      },
    },
    {
      name: 'ClubAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'curator',
            type: 'publicKey',
          },
          {
            name: 'clubTokenMint',
            type: 'publicKey',
          },
          {
            name: 'clubTokenAccount',
            type: 'publicKey',
          },
          {
            name: 'clubTreasury',
            type: 'publicKey',
          },
          {
            name: 'clubVault',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'ClubTreasury',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'clubAccount',
            type: 'publicKey',
          },
          {
            name: 'treasuryMint',
            type: 'publicKey',
          },
          {
            name: 'treasuryAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Trade',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nftAddress',
            type: {
              array: ['u8', 64],
            },
          },
          {
            name: 'nftTokenId',
            type: 'u8',
          },
          {
            name: 'tradeAmount',
            type: 'u64',
          },
          {
            name: 'club',
            type: 'publicKey',
          },
          {
            name: 'chainTxId',
            type: {
              array: ['u8', 128],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'NFTOwnership',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nftAddress',
            type: {
              array: ['u8', 64],
            } as any,
          },
          {
            name: 'txId',
            type: {
              array: ['u8', 128],
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 100,
      name: 'InvalidTradeSigner',
      msg: 'The given trade signer does not create a valid program derived address.',
    },
    {
      code: 101,
      name: 'InvalidNonce',
      msg: 'The given nonce is not valid',
    },
  ],
} as Idl;
