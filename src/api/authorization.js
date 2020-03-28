const JSSHA = require('jssha');

module.exports = {
  getAuthorizationHeader() {
    const AppID = '2ba29351e8fa4a80812ea7505894dfd3';
    const AppKey = 'Hi_QE7-spH4YHcETREoNc7I7Fs4';

    const GMTString = new Date().toGMTString();
    const ShaObj = new JSSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update(`x-date: ${GMTString}`);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

    return { Authorization, 'X-Date': GMTString };
  },
};
