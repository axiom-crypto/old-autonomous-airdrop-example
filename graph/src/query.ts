import axios from 'axios'
import { gql, GraphQLClient } from 'graphql-request'
require('dotenv').config()

// Define the GraphQL query
function generateSchema(address: string): string {
  return gql`
        query MyQuery {
        openCreditAccounts(where: { onBehalfOf: "${address}" }) {
            id,
            transactionHash,
            onBehalfOf
        }
        }
    `
}

async function getRecentReceipt(hash: string) {
  return await axios
    .post(
      process.env.PROVIDER_URI_GOERLI as string,
      {
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_getTransactionReceipt',
        params: [hash],
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    )
    .then((response) => {
      return response.data.result
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}

function findLogIdx(logs: any[]) {
  const targetTopic =
    '0xfa2baf5d3eb95569f312f22477b246f9d4c50276f1cb3ded8e1aeadcbc07a763'

  return logs.findIndex((log) => log.topics[0] === targetTopic)
}

// TypeScript function to execute the query
async function fetchOpenCreditAccounts(address: string): Promise<any> {
  const client = new GraphQLClient(
    'https://api.studio.thegraph.com/query/58827/gearbox-creditfacade/version/latest'
  )

  try {
    const data = await client.request(generateSchema(address))
    return data
  } catch (error) {
    console.error('Error fetching open credit accounts:', error)
    throw error
  }
}

// Export the function if needed
export { getRecentReceipt, findLogIdx, fetchOpenCreditAccounts }
