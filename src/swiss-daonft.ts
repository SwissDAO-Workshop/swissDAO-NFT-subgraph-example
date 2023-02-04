import { Transfer as TransferEvent } from "../generated/SwissDAONFT/SwissDAONFT";
import { Token, Transfer } from "../generated/schema";
import { Address, Bytes } from "@graphprotocol/graph-ts";

let ADRESS_ZERO = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000"
);

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  if (entity.from == ADRESS_ZERO) {
    let token = new Token(changetype<Bytes>(Bytes.fromBigInt(entity.tokenId)));
    token.owner = entity.to;
    token.save();
  }

  entity.save();
}
