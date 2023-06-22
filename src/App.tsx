import UserInputContainer from "./components/UserInputContainer/UserInputContainer";
import GeneratedInputContainer from "./components/GeneratedInputContainer/GeneratedInputContainer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { createStyles } from '@mantine/core';
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider, ColorScheme, useMantineTheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';

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
  const [text, setText] = useState<string>(localStorage.getItem("inputText") === null ? "" : localStorage.getItem("inputText")!);
  const theme = useMantineTheme();
  const themeBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3];
  const themeTextColor = theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6];

  const savedInputBgColor = localStorage.getItem("inputBgColor");
  const savedInputTextColor = localStorage.getItem("inputTextColor");

  const [inputBackgroundColor, setInputBackgroundColor] = useState<string>(localStorage.getItem("inputBgColor") === null ? themeBgColor : savedInputBgColor!);
  const [inputTextColor, setInputTextColor] = useState<string>(localStorage.getItem("inputTextColor") === null ? themeTextColor : savedInputTextColor!);

  const [inputModifiedBackground, setInputModifiedBackground] = useState<Boolean>(localStorage.getItem("inputBgColor") === null ? false : true);
  const [inputModifiedTextColor, setInputModifiedTextColor] = useState<Boolean>(localStorage.getItem("inputTextColor") === null ? false : true);

  const savedGeneratedBgColor = localStorage.getItem("generatedBgColor");
  const savedGeneratedTextColor = localStorage.getItem("generatedTextColor");

  const [generatedBackgroundColor, setGeneratedBackgroundColor] = useState<string>(localStorage.getItem("generatedBgColor") === null ? themeBgColor : savedGeneratedBgColor!);
  const [generatedTextColor, setGeneratedTextColor] = useState<string>(localStorage.getItem("generatedTextColor") === null ? themeTextColor : savedGeneratedTextColor!);

  const [generatedModifiedBackground, setGeneratedModifiedBackground] = useState<Boolean>(localStorage.getItem("generatedBgColor") === null ? false : true);
  const [generatedModifiedTextColor, setGeneratedModifiedTextColor] = useState<Boolean>(localStorage.getItem("generatedTextColor") === null ? false : true);

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    if(!inputModifiedBackground) {
      setInputBackgroundColor(colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);
    }
    if(!inputModifiedTextColor) {
      setInputTextColor(colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
    }
    if(!generatedModifiedBackground) {
      setGeneratedBackgroundColor(colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);
    }
    if(!generatedModifiedTextColor) {
      setGeneratedTextColor(colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
    }
  }

  const resetText = () => {
    localStorage.removeItem("inputText");
    setText("");
  }

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
          <Navbar toggleColorScheme={toggleColorScheme} />
          <main className={classes.appContainer}>
            <UserInputContainer 
              inputText={text} 
              inputSetText={setText} 
              inputBackgroundColor={inputBackgroundColor} 
              setInputBackgroundColor={setInputBackgroundColor}
              inputTextColor={inputTextColor}
              setInputTextColor={setInputTextColor}
              setInputModifiedBackground={setInputModifiedBackground}
              setInputModifiedTextColor={setInputModifiedTextColor}
            />
            <GeneratedInputContainer 
              inputText={text} 
              resetInputText={resetText} 
              generatedBackgroundColor={generatedBackgroundColor} 
              setGeneratedBackgroundColor={setGeneratedBackgroundColor}
              generatedTextColor={generatedTextColor}
              setGeneratedTextColor={setGeneratedTextColor}
              setGeneratedModifiedBackground={setGeneratedModifiedBackground}
              setGeneratedModifiedTextColor={setGeneratedModifiedTextColor}
            />
          </main>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
