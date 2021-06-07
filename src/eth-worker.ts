import { Logger } from '@nestjs/common';
import axios from 'axios';
import { promises as fs } from 'fs';
import { join } from 'path';

import { JsonClubsRepository } from './clubs/adapter/data/json-clubs.repository';
import { SolanaGateway } from './solana/solana.gateway';
import { JsonTradesRepository } from './trades/adapter/data/json-trades.repository';

const wait = (millis: number) => new Promise<void>((r) => setTimeout(() => r(), millis));

interface Transaction {
  hash: string;
  from: string;
  to: string;
  contractAddress: string;
}

interface Response {
  status: string;
  message: string;
  result: Transaction[];
}

const URL = 'https://api-ropsten.etherscan.io/api';
const UNQ_ETH_ACCOUNT = '0xc434Ee80262d13474fd4d88e58f15D971dCFCF11';
const INTERVAL_IN_MILLIS = 1000;
const logger = new Logger('ETHListenerWorker');

async function startListening() {
  const secretKey = JSON.parse((await fs.readFile(join(process.cwd(), 'wallet.json'))).toString());
  const solanaGateway = new SolanaGateway(
    secretKey,
    new JsonClubsRepository(),
    new JsonTradesRepository(),
  );

  let prevTransaction: Transaction | undefined;

  logger.log(`Starting ETH listener (INTERVAL: ${INTERVAL_IN_MILLIS / 1000}s)...`);

  while (true) {
    await wait(INTERVAL_IN_MILLIS);

    const { data } = await axios.get<Response>(URL, {
      params: {
        module: 'account',
        action: 'tokennfttx',
        address: '0x97190e5fe3B582eDdb92b85d6F314745B4B369B9',
        startblock: '10358239',
        page: 1,
        offset: 1,
        sort: 'desc',
        apikey: '[ETHERSCAN_API_KEY]',
      },
    });

    const transaction = data.result[0];

    if (!transaction || transaction.hash === prevTransaction?.hash) {
      continue;
    }

    if (transaction.to.toLowerCase() === UNQ_ETH_ACCOUNT.toLowerCase()) {
      logger.log(`ETH TRANSACTION EVENT: ${JSON.stringify(transaction)}`);
      try {
        await solanaGateway.confirmTrade(transaction.hash, transaction.contractAddress);
      } catch (error) {
        logger.error(error);
      }
    }

    prevTransaction = transaction;
  }
}

startListening().catch((err) => logger.error(err));
