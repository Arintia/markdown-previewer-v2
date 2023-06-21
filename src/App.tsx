import UserInputContainer from "./components/UserInputContainer/UserInputContainer";
import GeneratedInputContainer from "./components/GeneratedInputContainer/GeneratedInputContainer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  appContainer: {
    display: 'flex',
    paddingLeft: '2rem',
    width: '100vw',
    height: 'calc(100vh - 12rem)'
  }
}));

function App() {
  const { classes } = useStyles();

  return (
    <>
      <Navbar />
      <main className={classes.appContainer}>
        <UserInputContainer />
        <GeneratedInputContainer />
      </main>
      <Footer />
    </>
  );
};

export default App;
