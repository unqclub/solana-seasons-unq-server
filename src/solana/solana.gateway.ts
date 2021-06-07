import { Logger } from '@nestjs/common';
import { Program, Provider, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

import { ClubsRepository } from '../clubs/domain/port/clubs.repository';
import { TradeStatus } from '../trades/domain/entity/trade.entity';
import { TradesRepository } from '../trades/domain/port/trades.repository';
import { IDL } from './idl';

export class SolanaGateway {
  private readonly logger = new Logger(SolanaGateway.name);

  private readonly program: Program;

  constructor(
    readonly secretKey: number[],
    private readonly clubsRepository: ClubsRepository,
    private readonly tradesRepository: TradesRepository,
  ) {
    const programId = new PublicKey('3DP4wTEWe8b3jFExfUUs2UpPzaZcxToK9zXpXZyeaarp');
    const payer = Keypair.fromSecretKey(Buffer.from(secretKey));
    const connection = new Connection('https://api.devnet.solana.com');
    const provider = new Provider(connection, new Wallet(payer), {});
    this.program = new Program(IDL, programId, provider);
  }

  async confirmTrade(transactionId: string, nftAddress: string) {
    const trade = await this.tradesRepository.getByNftAddress(nftAddress);

    if (!trade) {
      throw new Error('Trade not found');
    }

    if (trade.status === TradeStatus.DONE) {
      throw new Error('Trade is already done');
    }

    const club = await this.clubsRepository.getClubByAccountAddress(trade.clubAccountAddress);

    if (!club) {
      throw new Error('Club not found');
    }

    const clubAccount: any = await this.program.account.clubAccount.fetch(
      new PublicKey(club.accountAddress),
    );

    const clubVaultPublicKey: PublicKey = clubAccount.clubVault;
    const tradePublicKey = new PublicKey(trade.accountAddress);

    const result = await this.program.rpc.confirmTrade(transactionId, {
      accounts: {
        trade: tradePublicKey,
        clubVault: clubVaultPublicKey,
      },
    });

    trade.status = TradeStatus.DONE;
    await this.tradesRepository.save(trade);

    this.logger.log({ confirmTradeResult: result, clubAddress: club.accountAddress });
  }
}
