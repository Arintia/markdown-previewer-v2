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
  /*
    useStyles is used to define CSS styling for Mantine.
  */
  const { classes } = useStyles();

  /* 
    * Used in user input field.
    * @param {string} text - User input text state.
    * @param {SetStateAction} setText - Used to set the user input text state.
  */
  const [text, setText] = useState<string>(localStorage.getItem("inputText") === null ? "" : localStorage.getItem("inputText")!);

  /*
    * useMantineTheme is used to access Mantine's theming object.
  */
  const theme = useMantineTheme();

  /* 
    * @param {string} themeBgColor - Stores the default background color for the current theme(light/dark).
  */
  const themeBgColor = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3];
  /* 
    * @param {string} themeTextColor - Stores the default text color for the current theme(light/dark).
  */
  const themeTextColor = theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6];

  /* 
    * @param {string} savedInputBgColor - Fetches the background color for user input field(if modified) from localStorage.
  */
  const savedInputBgColor = localStorage.getItem("inputBgColor");
  /* 
    * @param {string} savedInputTextColor - Fetches the text color for user input field(if modified) from localStorage.
  */
  const savedInputTextColor = localStorage.getItem("inputTextColor");

  /* 
    * Used to store background color of input field.
    * @param {string} inputBackgroundColor - User input field background color state.
    * @param {SetStateAction} setInputBackgroundColor - Used to set the user input field background color state.
  */
  const [inputBackgroundColor, setInputBackgroundColor] = useState<string>(localStorage.getItem("inputBgColor") === null ? themeBgColor : savedInputBgColor!);
  /* 
    * Used to store text color of input field.
    * @param {string} inputTextColor - User input field text color state.
    * @param {SetStateAction} setInputTextColor - Used to set the user input field text color state.
  */
  const [inputTextColor, setInputTextColor] = useState<string>(localStorage.getItem("inputTextColor") === null ? themeTextColor : savedInputTextColor!);
  /* 
    * Used to store whether the user has modified the background color of the user input field.
    * @param {Boolean} inputModifiedBackground - User input field background color modification state.
    * @param {SetStateAction} setInputModifiedBackground - Used to set the user input field background color modification state.
  */
  const [inputModifiedBackground, setInputModifiedBackground] = useState<Boolean>(localStorage.getItem("inputBgColor") === null ? false : true);
  /* 
    * Used to store whether the user has modified the text color of the user input field.
    * @param {Boolean} inputModifiedTextColor - User input field text color modification state.
    * @param {SetStateAction} setInputModifiedTextColor - Used to set the user input field text color modification state.
  */
  const [inputModifiedTextColor, setInputModifiedTextColor] = useState<Boolean>(localStorage.getItem("inputTextColor") === null ? false : true);

  /*
    NOTE: The code below works the exact same way as the code above does but for Generated Input field. Observe GeneratedInputContainer.tsx for more information.
  */
  const savedGeneratedBgColor = localStorage.getItem("generatedBgColor");
  const savedGeneratedTextColor = localStorage.getItem("generatedTextColor");

  const [generatedBackgroundColor, setGeneratedBackgroundColor] = useState<string>(localStorage.getItem("generatedBgColor") === null ? themeBgColor : savedGeneratedBgColor!);
  const [generatedTextColor, setGeneratedTextColor] = useState<string>(localStorage.getItem("generatedTextColor") === null ? themeTextColor : savedGeneratedTextColor!);

  const [generatedModifiedBackground, setGeneratedModifiedBackground] = useState<Boolean>(localStorage.getItem("generatedBgColor") === null ? false : true);
  const [generatedModifiedTextColor, setGeneratedModifiedTextColor] = useState<Boolean>(localStorage.getItem("generatedTextColor") === null ? false : true);

  /* END OF NOTE */

  /* 
    * useColorScheme is a custom mantine hook to fetch the user's preferred color scheme, check Mantine documentation for more info.
  */
  const preferredColorScheme = useColorScheme();

  /* 
    * useLocalStorage is a custom mantine hook to access localStorage.
    * @param {string} key - Key to store current mantine color scheme in using localStorage(either "dark" or "light").
    * @param {ColorScheme} defaultValue - The default value to set the theme to if no localStorage entry exists.
    * @param {Boolean} getInitialValueInEffect - Color scheme is updated in useEffect after DOM mount if set to true. Don't touch if you aren't sure.
  */
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  /* 
    * toggleColorScheme is a function that triggers whenever the color scheme changes from dark to light or vice versa.
    * Rest of the logic is there to make sure the input/output fields change color accordingly if they weren't modified by the user themselves.
  */
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

  /*
    * resetText is a function that is used to reset the text in the user input field.
  */
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
