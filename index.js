const { createRoot } = require("react-dom/client");
const { default: Wallet } = require("./src/components/wallet");
import { ChakraProvider } from "@chakra-ui/react";


const root = createRoot(document.querySelector(".root"));

root.render(
  <ChakraProvider>
    <Wallet />
  </ChakraProvider>
);
