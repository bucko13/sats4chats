import lnService from 'ln-service'

const test = {
  request: 'lntb1u1pw7cljmpp52cgq5tuhgdwaekujua5vsa4vav85k0sdfyfmjeq4uhrh9ysetegsdq5w3jhxapqd9h8vmmfvdjscqzpgc7p5egekqqz84j5fmh0xcz6yg6un3vqx8tan4yaf84pt7s4mgn58hem4vsemdnay9y436y5vrgkltempla39ty4gy5v34ku6sftufwgpxzm865',
  id: '56100a2f97435ddcdb92e768c876aceb0f4b3e0d4913b96415e5c77292195e51',
  amount: 100
}
export default async (req, res) => {
  // const { LND_CERT, LND_MACAROON, LND_SOCKET } = process.env
  // const { lnd } = lnService.authenticatedLndGrpc({
  //   cert: LND_CERT,
  //   macaroon: LND_MACAROON,
  //   socket: LND_SOCKET,
  // })
  // const {request, id, tokens} = await lnService.createInvoice({
  //       lnd: lnd,
  //       description:'test invoice',
  //       tokens: 100,
  //       expires_at: Date.now() + 1000
  //     })
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  // res.end(JSON.stringify({request, id, amount: tokens}))
  res.end(JSON.stringify(test))
}