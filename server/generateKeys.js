import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

const generateKeys = () => {
  const privateKey = toHex(secp256k1.utils.randomPrivateKey());
  const publicKey = toHex(secp256k1.getPublicKey(privateKey));

  return {
    privateKey,
    publicKey,
  };
};

generateKeys();
generateKeys();
generateKeys();
