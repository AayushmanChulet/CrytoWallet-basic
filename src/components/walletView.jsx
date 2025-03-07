import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import axios from 'axios'

const WalletView = ({ privateKey, publicKey }) => {
  const [clicked, isClicked] = useState(false);
  const [balance , setBalance] = useState(null);
  useEffect(() => {
    const getBal =async () => {
      const bal =await fetch('https://solana-mainnet.g.alchemy.com/v2/joZ-do8C-_fxAF0T7i6GcNEyNGaq9tCI', {
        method : 'POST', 
        body : JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [publicKey],
        })
      })
      const data = await bal.json();
      setBalance(data.result.value/1000000000);
  }
    getBal();
    }, []);
  return (
    <div>
      <div>Current Balance:- {balance!= null && balance}</div>
      <div>
        Private key :- 
        {" " + privateKey?.slice(0, 6) + "..." + privateKey?.slice(25, 32)}
      </div>
      <div>Public key :- {publicKey}</div>
    </div>
  );
};

export default WalletView;
