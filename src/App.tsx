import UserInputContainer from "./components/UserInputContainer/UserInputContainer";
import GeneratedInputContainer from "./components/GeneratedInputContainer/GeneratedInputContainer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { createStyles } from '@mantine/core';
import { useState } from "react";

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
  const [text, setText] = useState("");

  const resetText = () => setText("");
  
  return (
    <>
      <Navbar />
      <main className={classes.appContainer}>
        <UserInputContainer inputText={text} inputSetText={setText} />
        <GeneratedInputContainer inputText={text} resetInputText={resetText} />
      </main>
      <Footer />
    </>
  );
};

export default App;
