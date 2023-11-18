import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddCollateral } from "../generated/schema"
import { AddCollateral as AddCollateralEvent } from "../generated/CreditFacade/CreditFacade"
import { handleAddCollateral } from "../src/credit-facade"
import { createAddCollateralEvent } from "./credit-facade-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let onBehalfOf = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let value = BigInt.fromI32(234)
    let newAddCollateralEvent = createAddCollateralEvent(
      onBehalfOf,
      token,
      value
    )
    handleAddCollateral(newAddCollateralEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddCollateral created and stored", () => {
    assert.entityCount("AddCollateral", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddCollateral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "onBehalfOf",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddCollateral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddCollateral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
