import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/CreditFacade/CreditFacade"

export function createAddCollateralEvent(
  onBehalfOf: Address,
  token: Address,
  value: BigInt
): AddCollateral {
  let addCollateralEvent = changetype<AddCollateral>(newMockEvent())

  addCollateralEvent.parameters = new Array()

  addCollateralEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  addCollateralEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  addCollateralEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return addCollateralEvent
}

export function createBlacklistHelperSetEvent(
  blacklistHelper: Address
): BlacklistHelperSet {
  let blacklistHelperSetEvent = changetype<BlacklistHelperSet>(newMockEvent())

  blacklistHelperSetEvent.parameters = new Array()

  blacklistHelperSetEvent.parameters.push(
    new ethereum.EventParam(
      "blacklistHelper",
      ethereum.Value.fromAddress(blacklistHelper)
    )
  )

  return blacklistHelperSetEvent
}

export function createCloseCreditAccountEvent(
  borrower: Address,
  to: Address
): CloseCreditAccount {
  let closeCreditAccountEvent = changetype<CloseCreditAccount>(newMockEvent())

  closeCreditAccountEvent.parameters = new Array()

  closeCreditAccountEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  closeCreditAccountEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return closeCreditAccountEvent
}

export function createDecreaseBorrowedAmountEvent(
  borrower: Address,
  amount: BigInt
): DecreaseBorrowedAmount {
  let decreaseBorrowedAmountEvent = changetype<DecreaseBorrowedAmount>(
    newMockEvent()
  )

  decreaseBorrowedAmountEvent.parameters = new Array()

  decreaseBorrowedAmountEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  decreaseBorrowedAmountEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return decreaseBorrowedAmountEvent
}

export function createIncreaseBorrowedAmountEvent(
  borrower: Address,
  amount: BigInt
): IncreaseBorrowedAmount {
  let increaseBorrowedAmountEvent = changetype<IncreaseBorrowedAmount>(
    newMockEvent()
  )

  increaseBorrowedAmountEvent.parameters = new Array()

  increaseBorrowedAmountEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  increaseBorrowedAmountEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return increaseBorrowedAmountEvent
}

export function createLiquidateCreditAccountEvent(
  borrower: Address,
  liquidator: Address,
  to: Address,
  remainingFunds: BigInt
): LiquidateCreditAccount {
  let liquidateCreditAccountEvent = changetype<LiquidateCreditAccount>(
    newMockEvent()
  )

  liquidateCreditAccountEvent.parameters = new Array()

  liquidateCreditAccountEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  liquidateCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidateCreditAccountEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  liquidateCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "remainingFunds",
      ethereum.Value.fromUnsignedBigInt(remainingFunds)
    )
  )

  return liquidateCreditAccountEvent
}

export function createLiquidateExpiredCreditAccountEvent(
  borrower: Address,
  liquidator: Address,
  to: Address,
  remainingFunds: BigInt
): LiquidateExpiredCreditAccount {
  let liquidateExpiredCreditAccountEvent = changetype<
    LiquidateExpiredCreditAccount
  >(newMockEvent())

  liquidateExpiredCreditAccountEvent.parameters = new Array()

  liquidateExpiredCreditAccountEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  liquidateExpiredCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidateExpiredCreditAccountEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  liquidateExpiredCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "remainingFunds",
      ethereum.Value.fromUnsignedBigInt(remainingFunds)
    )
  )

  return liquidateExpiredCreditAccountEvent
}

export function createMultiCallFinishedEvent(): MultiCallFinished {
  let multiCallFinishedEvent = changetype<MultiCallFinished>(newMockEvent())

  multiCallFinishedEvent.parameters = new Array()

  return multiCallFinishedEvent
}

export function createMultiCallStartedEvent(
  borrower: Address
): MultiCallStarted {
  let multiCallStartedEvent = changetype<MultiCallStarted>(newMockEvent())

  multiCallStartedEvent.parameters = new Array()

  multiCallStartedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )

  return multiCallStartedEvent
}

export function createOpenCreditAccountEvent(
  onBehalfOf: Address,
  creditAccount: Address,
  borrowAmount: BigInt,
  referralCode: i32
): OpenCreditAccount {
  let openCreditAccountEvent = changetype<OpenCreditAccount>(newMockEvent())

  openCreditAccountEvent.parameters = new Array()

  openCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  openCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "creditAccount",
      ethereum.Value.fromAddress(creditAccount)
    )
  )
  openCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "borrowAmount",
      ethereum.Value.fromUnsignedBigInt(borrowAmount)
    )
  )
  openCreditAccountEvent.parameters.push(
    new ethereum.EventParam(
      "referralCode",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(referralCode))
    )
  )

  return openCreditAccountEvent
}

export function createTokenDisabledEvent(
  borrower: Address,
  token: Address
): TokenDisabled {
  let tokenDisabledEvent = changetype<TokenDisabled>(newMockEvent())

  tokenDisabledEvent.parameters = new Array()

  tokenDisabledEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  tokenDisabledEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenDisabledEvent
}

export function createTokenEnabledEvent(
  borrower: Address,
  token: Address
): TokenEnabled {
  let tokenEnabledEvent = changetype<TokenEnabled>(newMockEvent())

  tokenEnabledEvent.parameters = new Array()

  tokenEnabledEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  tokenEnabledEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenEnabledEvent
}

export function createTransferAccountEvent(
  oldOwner: Address,
  newOwner: Address
): TransferAccount {
  let transferAccountEvent = changetype<TransferAccount>(newMockEvent())

  transferAccountEvent.parameters = new Array()

  transferAccountEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  transferAccountEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return transferAccountEvent
}

export function createTransferAccountAllowedEvent(
  from: Address,
  to: Address,
  state: boolean
): TransferAccountAllowed {
  let transferAccountAllowedEvent = changetype<TransferAccountAllowed>(
    newMockEvent()
  )

  transferAccountAllowedEvent.parameters = new Array()

  transferAccountAllowedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferAccountAllowedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferAccountAllowedEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return transferAccountAllowedEvent
}

export function createUnderlyingSentToBlacklistHelperEvent(
  borrower: Address,
  amount: BigInt
): UnderlyingSentToBlacklistHelper {
  let underlyingSentToBlacklistHelperEvent = changetype<
    UnderlyingSentToBlacklistHelper
  >(newMockEvent())

  underlyingSentToBlacklistHelperEvent.parameters = new Array()

  underlyingSentToBlacklistHelperEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  underlyingSentToBlacklistHelperEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return underlyingSentToBlacklistHelperEvent
}
