import {
  AddCollateral as AddCollateralEvent,
  BlacklistHelperSet as BlacklistHelperSetEvent,
  CloseCreditAccount as CloseCreditAccountEvent,
  DecreaseBorrowedAmount as DecreaseBorrowedAmountEvent,
  IncreaseBorrowedAmount as IncreaseBorrowedAmountEvent,
  LiquidateCreditAccount as LiquidateCreditAccountEvent,
  LiquidateExpiredCreditAccount as LiquidateExpiredCreditAccountEvent,
  MultiCallFinished as MultiCallFinishedEvent,
  MultiCallStarted as MultiCallStartedEvent,
  OpenCreditAccount as OpenCreditAccountEvent,
  TokenDisabled as TokenDisabledEvent,
  TokenEnabled as TokenEnabledEvent,
  TransferAccount as TransferAccountEvent,
  TransferAccountAllowed as TransferAccountAllowedEvent,
  UnderlyingSentToBlacklistHelper as UnderlyingSentToBlacklistHelperEvent
} from "../generated/CreditFacade/CreditFacade"
import {
  AddCollateral,
  BlacklistHelperSet,
  CloseCreditAccount,
  DecreaseBorrowedAmount,
  IncreaseBorrowedAmount,
  LiquidateCreditAccount,
  LiquidateExpiredCreditAccount,
  MultiCallFinished,
  MultiCallStarted,
  OpenCreditAccount,
  TokenDisabled,
  TokenEnabled,
  TransferAccount,
  TransferAccountAllowed,
  UnderlyingSentToBlacklistHelper
} from "../generated/schema"

export function handleAddCollateral(event: AddCollateralEvent): void {
  let entity = new AddCollateral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.onBehalfOf = event.params.onBehalfOf
  entity.token = event.params.token
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBlacklistHelperSet(event: BlacklistHelperSetEvent): void {
  let entity = new BlacklistHelperSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.blacklistHelper = event.params.blacklistHelper

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCloseCreditAccount(event: CloseCreditAccountEvent): void {
  let entity = new CloseCreditAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDecreaseBorrowedAmount(
  event: DecreaseBorrowedAmountEvent
): void {
  let entity = new DecreaseBorrowedAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIncreaseBorrowedAmount(
  event: IncreaseBorrowedAmountEvent
): void {
  let entity = new IncreaseBorrowedAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidateCreditAccount(
  event: LiquidateCreditAccountEvent
): void {
  let entity = new LiquidateCreditAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.liquidator = event.params.liquidator
  entity.to = event.params.to
  entity.remainingFunds = event.params.remainingFunds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidateExpiredCreditAccount(
  event: LiquidateExpiredCreditAccountEvent
): void {
  let entity = new LiquidateExpiredCreditAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.liquidator = event.params.liquidator
  entity.to = event.params.to
  entity.remainingFunds = event.params.remainingFunds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiCallFinished(event: MultiCallFinishedEvent): void {
  let entity = new MultiCallFinished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiCallStarted(event: MultiCallStartedEvent): void {
  let entity = new MultiCallStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOpenCreditAccount(event: OpenCreditAccountEvent): void {
  let entity = new OpenCreditAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.onBehalfOf = event.params.onBehalfOf
  entity.creditAccount = event.params.creditAccount
  entity.borrowAmount = event.params.borrowAmount
  entity.referralCode = event.params.referralCode

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenDisabled(event: TokenDisabledEvent): void {
  let entity = new TokenDisabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenEnabled(event: TokenEnabledEvent): void {
  let entity = new TokenEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferAccount(event: TransferAccountEvent): void {
  let entity = new TransferAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferAccountAllowed(
  event: TransferAccountAllowedEvent
): void {
  let entity = new TransferAccountAllowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnderlyingSentToBlacklistHelper(
  event: UnderlyingSentToBlacklistHelperEvent
): void {
  let entity = new UnderlyingSentToBlacklistHelper(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
