import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ publicKey, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState(
    "0276c71146c2c5dd84954ccc0d87f0992aae8983e1346f8516a7989a93b999712d"
  );

  const hashMessage = (message) => keccak256(Uint8Array.from(message));

  const signMessage = (message) =>
    secp256k1.sign(hashMessage(message), privateKey);

  const stringifyBigInts = (obj) => {
    for (let prop in obj) {
      let value = obj[prop];
      if (typeof value === "bigint") {
        obj[prop] = value.toString();
      } else if (typeof value === "object" && value !== null) {
        obj[prop] = stringifyBigInts(value);
      }
    }
    return obj;
  };
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const message = { amount: parseFloat(sendAmount), recipient };
    let signature = signMessage(message);

    signature = stringifyBigInts(signature);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        publicKey,
        message,
        signature,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
