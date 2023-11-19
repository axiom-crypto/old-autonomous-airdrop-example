import { fetchGearBoxTx } from '../src/query'

async function main() {
  // Call the query function from query.ts
  const openOnceAddress = '0xb01a58b4F35E79795C66288fd06115F40D5BEB61'
  const openMultipleTimes = '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70'
  const testAddress = openMultipleTimes
  await fetchGearBoxTx(testAddress);
}

main()
