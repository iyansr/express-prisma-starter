import crypto from 'crypto';
// Generate a new RSA private key with 2048-bit length
const newCrypto = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  console.log({ privateKey, publicKey });
};

newCrypto();
