import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

/**
 * 
{
  privateKey: 'ac05fd383a3a2c927e5426d8548fb50719b782579841a5c0bfc3fa7871c46afa',
  publicKey: '02df2e94a9ef590ed36ec539f321aba849a33196e4a2f634364383d1be09e4a7cd',
  wallet: '8b71dcd433499f67edf38deb888331b54789cfc1'
}
{
  privateKey: '877635b0d65d776882faa3b0b0250ea5980934ec32140aae7c42d1e6e1c11561',
  publicKey: '0276c71146c2c5dd84954ccc0d87f0992aae8983e1346f8516a7989a93b999712d',
  wallet: 'c7cda7d4d2fa5ae718f7e58b0e3ff212a2d4d65e'
}
{
  privateKey: '46b072883dd0206e4ceead33b0f5a3fd5c7e2f9399086dd01794efe937d09de6',
  publicKey: '032c183a3057996b22107815ee6847acf3d3b5b1c63b089bfcbc06c96c92d7ed30',
  wallet: '284e3ce3114c87168544db02bc9408dfba8993fd'
}
 */

function App() {
  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState(
    "ac05fd383a3a2c927e5426d8548fb50719b782579841a5c0bfc3fa7871c46afa"
  );

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setPublicKey={setPublicKey}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
        setBalance={setBalance}
        publicKey={publicKey}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
