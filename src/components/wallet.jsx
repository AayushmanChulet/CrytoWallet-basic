"use client";

import { useEffect, useState } from "react";
import MnemonicGen from "./mnemonicGen";
import WalletView from "./walletView";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Stack, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Wallet = () => {
  const [mnemonicCode, setMnemonicCode] = useState("");
  const [seed, setSeed] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [value, setValue] = useState(["Walletc"]);

  useEffect(() => {
    setSeed(mnemonicToSeedSync(mnemonicCode));
  }, [mnemonicCode]);
  console.log(mnemonicCode);

  const incWalletCount = () => {
    const path = `m/44'/501'/${wallets.length}'/0'`;
    console.log(path);
    console.log(seed);
    const derivedSeed = derivePath(path, seed?.toString("hex"))?.key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const privateKey = Buffer.from(secret.slice(0, 32)).toString('hex');
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const crptoWallet = {
      privateKey,
      publicKey,
    };
    setWallets([...wallets, crptoWallet]);
    console.log(wallets);
  };

  return (
    <div className="ml-64 mr-64 mt-12">
      <div className="text-2xl ">Hey, Aayushman</div>
      <div className="mt-8">
        <MnemonicGen
          mnemonicCode={mnemonicCode}
          setMnemonicCode={setMnemonicCode}
        />
        {mnemonicCode.length > 0 ? ( <div className="m-8 flex flex-row justify-center ">
          <button onClick={incWalletCount} className="border p-3 border-gray-400 rounded-lg">Add new wallet</button>
          </div>
        ) : (
          ""
        )}
      </div>

      {wallets.length > 0 && (
        <div>
          <Stack gap="4">
                <Text fontWeight="medium">Wallets:</Text>
                <Accordion allowToggle>
                  {wallets.map((item, index) => (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton>
                          <Text flex="1" textAlign="left">
                            Wallet : {index + 1} balance : $90
                          </Text>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <WalletView {...item} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Stack>
        </div>
      )}
    </div>
  );
};
export default Wallet;
