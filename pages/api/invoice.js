import lnService from 'ln-service'

const test = {
  request: 'lntb1u1pw7cljmpp52cgq5tuhgdwaekujua5vsa4vav85k0sdfyfmjeq4uhrh9ysetegsdq5w3jhxapqd9h8vmmfvdjscqzpgc7p5egekqqz84j5fmh0xcz6yg6un3vqx8tan4yaf84pt7s4mgn58hem4vsemdnay9y436y5vrgkltempla39ty4gy5v34ku6sftufwgpxzm865',
  id: '56100a2f97435ddcdb92e768c876aceb0f4b3e0d4913b96415e5c77292195e51',
  secret: '4df5485ae42c5da862f6f2be1a81f79d391bd0c802d466f8f1868b862c8553c8', // not normally sent but saving for testing
  amount: 100
}
export default async (req, res) => {
  // send mock data
  if (process.env.NODE_ENV === 'development') {
    return res.end(JSON.stringify(test))
  }

  try {
    const { LND_CERT, LND_MACAROON, LND_SOCKET, MIN_PAYMENT } = process.env
    const { lnd } = lnService.authenticatedLndGrpc({
      cert: LND_CERT,
      macaroon: LND_MACAROON,
      socket: LND_SOCKET,
    })

    const {request, id, tokens} = await lnService.createInvoice({
          lnd: lnd,
          description:'test invoice',
          tokens: MIN_PAYMENT || 1000,
          expires_at: Date.now() + 2000
        })
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify({request, id, amount: tokens}))
  } catch (e) {
    res.statusCode = 500
    console.error('err:', e)
    res.end(JSON.stringify({ err: { message: 'problem connecting to lnd service '}}))
  }
}