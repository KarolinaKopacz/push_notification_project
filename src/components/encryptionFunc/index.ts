const CryptoJS = require("crypto-js");
const crypt = {
  secret: "CIPHERKEY",

  // (B2) ENCRYPT
  encrypt: function (clear: any) {
    let cipher = CryptoJS.AES.encrypt(clear, crypt.secret);

    cipher = cipher.toString();
    return cipher;
  },

  // (B3) DECRYPT
  decrypt: function (cipher: string) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },
};

export { crypt };
