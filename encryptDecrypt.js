const crypto = require('crypto');

const ENCRYPTION_KEY= "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const IV_LENGTH = "1234567890123456"; // 16 bytes for AES-256
const ALGORITHM = "aes-256-cbc";

const encrypt = ((text) => {
   let cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV_LENGTH);
   let encrypted = cipher.update(text, 'utf8', 'base64');
   encrypted += cipher.final('base64');
   return encrypted;
});

const decrypt = ((text) => {
   let decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, IV_LENGTH);
   let decrypted = decipher.update(text, 'base64', 'utf8');
   return (decrypted + decipher.final('utf8'));
});

const encrypted_key = encrypt("This is a test for crypto");
console.log(encrypted_key);
const decrypted_key = decrypt(encrypted_key);
console.log(decrypted_key); // M7SN8xPP6bas+9wRlr8Z6tKVlvG1s11Z5lvdWRSqhvQ=



// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotallySecretKey');

// const encryptedString = cryptr.encrypt("This is a test for crypto");
// const decryptedString = cryptr.decrypt(encryptedString);

// console.log(encryptedString);
// console.log(decryptedString);