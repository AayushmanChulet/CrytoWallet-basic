const { useEffect, useState } = require("react");
import { generateMnemonic , mnemonicToSeedSync } from 'bip39';

const Mnemonic = () => {
  const [mnemonicCode, setMnemonicCode] = useState([]);

  useEffect(() => setMnemonicCode(generateMnemonic()), []);

  return mnemonicCode || [];
}

export default Mnemonic;