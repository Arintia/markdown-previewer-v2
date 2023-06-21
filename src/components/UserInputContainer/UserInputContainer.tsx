import { ColorInput, Button, createStyles, useMantineTheme } from '@mantine/core';
import { useState, useEffect } from 'react';

const useStyles = createStyles(() => ({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  customizationContainer: {
    width: '75%',
    display: 'flex'
  },
  colorPicker: {
    marginRight: '5rem',
    marginBottom: '1rem',
    width: '75%'
  },
  colorPickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  colorPickerBtn: {
    width: '45%',
  },
  colorPickerBtnContainer: {
    display: 'flex',
    width: '75%',
    justifyContent: 'space-evenly'
  },
  inputContainer: {
    height: '35rem',
    width: '75%',
    marginTop: '2rem',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
  },
  inputText: {
    border: 'none',
    height: '100%',
    width: '100%',
    resize: 'none',
    padding: '2rem',
    whiteSpace: 'pre-wrap'
  }
}));

const UserInputContainer = (props: {inputText: string, inputSetText: React.Dispatch<React.SetStateAction<string>>}) : JSX.Element => {
  const theme = useMantineTheme();
  const [bgColor, setBgColor] = useState(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
  const [textColor, setTextColor] = useState(theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);

  const { classes } = useStyles();

  const resetBgColor = () => setBgColor(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
  const resetTextColor = () => setTextColor(theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);

  const handleInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => props.inputSetText(e.currentTarget.value);

  useEffect(() => {
    setBgColor(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
    setTextColor(theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);
  }, [theme.colorScheme]);

  return (
    <section className={classes.inputWrapper}>
      <section className={classes.customizationContainer}>
        <div className={classes.colorPickerContainer}>
          <ColorInput 
            placeholder="Pick a color" 
            label="Background Color" 
            className={classes.colorPicker} 
            value={bgColor} 
            onChangeEnd={(color : string) => setBgColor(color)} 
          />
          <div className={classes.colorPickerBtnContainer}>
            {bgColor !== (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]) &&
              <Button variant="outline" color="red" size="md" className={classes.colorPickerBtn} onClick={resetBgColor}>
                Reset
              </Button>
            }
          </div>
        </div>
        <div className={classes.colorPickerContainer}>
          <ColorInput 
            placeholder="Pick a color" 
            label="Text Color" 
            className={classes.colorPicker} 
            value={textColor} 
            onChangeEnd={(color : string) => setTextColor(color)} 
          />
          <div className={classes.colorPickerBtnContainer}>
            {textColor !== (theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]) &&
              <Button variant="outline" color="red" size="md" className={classes.colorPickerBtn} onClick={resetTextColor}>
                Reset
              </Button>
            }
          </div>
        </div>
      </section>
      <section className={classes.inputContainer}>
        <textarea 
          autoFocus={true} 
          autoCorrect='on' 
          className={classes.inputText} 
          style={{background: bgColor, color: textColor}} 
          value={props.inputText}
          onChange={handleInput}
        >

        </textarea>
      </section>
    </section>
  );
};

export default UserInputContainer;