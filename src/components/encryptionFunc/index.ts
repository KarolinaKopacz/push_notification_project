const CryptoJS = require("crypto-js");

const crypt = {
  secret: "CIPHERKEY",

  //  ENCRYPT
  encrypt: function (clear: string) {
    let cipher = CryptoJS.AES.encrypt(clear, crypt.secret);

    cipher = cipher.toString();
    return cipher;
  },

  //  DECRYPT
  decrypt: function (cipher: string) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },
};

export { crypt };
