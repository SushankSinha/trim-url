const fetch = global.fetch || (typeof require === 'function' ? require('node-fetch') : null);

async function urlValidator(url) {
  if (!url) return false;
  try {
    new URL(url);
  } catch (err) {
    return false;
  }

  if (!fetch) {
    return true;
  }

  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (res && res.ok) return true;
     res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return !!(res && res.ok);
  } catch (error) {
    return false;
  }
}

module.exports = { urlValidator };