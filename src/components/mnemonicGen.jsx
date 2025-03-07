const { default: Mnemonic } = require("../utils/useMnemonicGen");

const MnemonicGen = ({ mnemonicCode, setMnemonicCode }) => {
  const code = Mnemonic();
  const setCode = () => {
    setMnemonicCode("thing loud shoulder dentist can divert wood alley enemy service imitate differ");
  };

  return mnemonicCode.length > 0 ? (<div>
    <div className="text-xl mb-2">Mnemonic code :-  </div>
    <div className="flex justify-evenly min-w-32 flex-wrap  items-center">
      {mnemonicCode.split(" ").map((e, index) => (
        <div key={index} className="p-3 border border-gray-400 rounded-lg ">{e}</div>
      ))}
      
    </div>
    </div>
  ) : (
    <div className="flex flex-row place-content-around justify-center">
      <button onClick={() => setCode()} className="text-center">generate Mnemonic</button>
    </div>
  );
};

export default MnemonicGen;
