export function getEncoding(string) {
  if (Buffer.from(string, 'hex').toString('hex') === string)
    return 'hex'
  else if (Buffer.from(string, 'base64').toString('base64') === string)
    return 'base64'
  
  throw new Error('Unknown encoding for sring:', string)
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};