import Home from "./pages/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
    colors: {
      primary: {
        900: "#74CB48",
        800: "#74CB48",
        700: "#74CB48",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
