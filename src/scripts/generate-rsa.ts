import crypto from 'crypto';
import { writeFileSync } from 'fs';
import path from 'path';
// Generate a new RSA private key with 2048-bit length
const newCrypto = () => {
  const rootPath = path.resolve(__dirname, '../../');
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

  writeFileSync(rootPath + '/private.pem', privateKey);
  writeFileSync(rootPath + '/public.pem', publicKey);
};

newCrypto();
