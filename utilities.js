export function getEncoding(string) {
  if (Buffer.from(string, 'hex').toString('hex') === string)
    return 'hex'
  else if (Buffer.from(string, 'base64').toString('base64') === string)
    return 'base64'
  
  throw new Error('Unknown encoding for sring:', string)
}