import UserInputContainer from "./components/UserInputContainer/UserInputContainer";
import GeneratedInputContainer from "./components/GeneratedInputContainer/GeneratedInputContainer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { createStyles } from '@mantine/core';
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

const useStyles = createStyles(() => ({
  appContainer: {
    display: 'flex',
    paddingLeft: '2rem',
    width: '100vw',
    height: 'calc(100vh - 12rem)'
  }
}));

const App = () : JSX.Element => {
  const { classes } = useStyles();
  const [text, setText] = useState<string>("");
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  const resetText = () => setText("");

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
          <Navbar toggleColorScheme={toggleColorScheme} />
          <main className={classes.appContainer}>
            <UserInputContainer inputText={text} inputSetText={setText} />
            <GeneratedInputContainer inputText={text} resetInputText={resetText} />
          </main>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
