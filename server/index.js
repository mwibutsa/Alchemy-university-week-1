const express = require("express");
const app = express();
const cors = require("cors");

const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02df2e94a9ef590ed36ec539f321aba849a33196e4a2f634364383d1be09e4a7cd": 100,
  "0276c71146c2c5dd84954ccc0d87f0992aae8983e1346f8516a7989a93b999712d": 50,
  "032c183a3057996b22107815ee6847acf3d3b5b1c63b089bfcbc06c96c92d7ed30": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  try {
    const { publicKey, signature, message } = req.body;
    const sender = publicKey;

    const { amount, recipient } = message;

    const parsedSignature = {
      ...signature,
      r: BigInt(signature.r),
      s: BigInt(signature.s),
    };

    setInitialBalance(sender);
    setInitialBalance(recipient);

    const hashMessage = (message) => keccak256(Uint8Array.from(message));

    const hashedMessage = hashMessage(message);

    const isValid =
      secp256k1.verify(parsedSignature, hashedMessage, publicKey) === true;

    if (!isValid) return res.status(400).send({ message: "Bad signature!" });

    if (balances[sender] < amount) {
      return res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      return res.send({ balance: balances[sender] });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
