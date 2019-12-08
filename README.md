# Sats4Chats
#### Self-hosted solution to get paid when people want to send you a message

## Features
- Fully Self-hosted: get paid to your lightning node
- Private: Keep your email information private until you're ready to respond
- Custom pricing: You set the price required to send you a message
- Secure: Uses LSAT protocol to ensure that only people that have paid can send you a message

## Requirements
- Now account with Zeit.co (preferred for deployment)
- Your own lnd node 
- A gmail account (for sending emails with SMTP service)

## Setup

1. Setup your zeit account
1. Get your [Google App Password](https://support.google.com/accounts/answer/185833?hl=en)
1. Get your lnd node's macaroon, tls cert and socket
1. Set `now` secrets in your terminal with command `now secrets add [secret-name] "[secret value]"`
1. Deploy with now: just run command `now` from the directory of the project and visit the resulting url!

### Secrets (required unless indicated)
- `gmail-user`
- `mail-pass`
- `lnd-cert` (base64 encoded)
- `lnd-macaroon` (base64 encoded)
- `lnd-socket`
- `min-payment` (optional)


