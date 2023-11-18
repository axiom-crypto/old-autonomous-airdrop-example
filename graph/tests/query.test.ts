import { fetchOpenCreditAccounts } from '../src/query'

async function main() {
  try {
    // Call the query function from query.ts
    const openOnceAddress = '0xb01a58b4F35E79795C66288fd06115F40D5BEB61'
    const openMultipleTimes = '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70'
    const testAddress = openMultipleTimes
    const result = await fetchOpenCreditAccounts(testAddress)

    // Process the result
    console.log(
      testAddress,
      ' have opened CA ',
      result.openCreditAccounts.length,
      ' times'
    )
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

main()
