import { ColorInput, Button, createStyles, useMantineTheme } from '@mantine/core';

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
    width: '50%',
    height: '6rem'
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

const UserInputContainer = (props: 
{
  inputText: string, 
  inputSetText: React.Dispatch<React.SetStateAction<string>>, 
  inputBackgroundColor: string, 
  setInputBackgroundColor: React.Dispatch<React.SetStateAction<string>>,
  inputTextColor: string, 
  setInputTextColor: React.Dispatch<React.SetStateAction<string>>,
  setInputModifiedBackground: React.Dispatch<React.SetStateAction<Boolean>>,
  setInputModifiedTextColor: React.Dispatch<React.SetStateAction<Boolean>>
}) : JSX.Element => {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  const resetBgColor = () => {
    props.setInputBackgroundColor(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]);
    localStorage.removeItem("inputBgColor");
    props.setInputModifiedBackground(false);
  }
  const resetTextColor = () => { 
    props.setInputTextColor(theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]);
    localStorage.removeItem("inputTextColor");
    props.setInputModifiedTextColor(false);
  }

  const handleInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    props.inputSetText(e.currentTarget.value);
    localStorage.setItem("inputText", e.currentTarget.value);
  }

  const handleBgColorChange = (color : string) => {
    localStorage.setItem("inputBgColor", color);
    props.setInputBackgroundColor(color);
    props.setInputModifiedBackground(true);
  };

  const handleTextColorChange = (color : string) => {
    localStorage.setItem("inputTextColor", color);
    props.setInputTextColor(color); 
    props.setInputModifiedTextColor(true);
  }

  return (
    <section className={classes.inputWrapper}>
      <section className={classes.customizationContainer}>
        <div className={classes.colorPickerContainer}>
          <ColorInput 
            placeholder="Pick a color" 
            label="Background Color" 
            className={classes.colorPicker} 
            value={props.inputBackgroundColor} 
            onChangeEnd={handleBgColorChange} 
          />
          <div className={classes.colorPickerBtnContainer}>
            {props.inputBackgroundColor !== (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]) &&
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
            value={props.inputTextColor} 
            onChangeEnd={handleTextColorChange} 
          />
          <div className={classes.colorPickerBtnContainer}>
            {props.inputTextColor !== (theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]) &&
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
          style={{background: props.inputBackgroundColor, color: props.inputTextColor}} 
          value={props.inputText}
          onChange={handleInput}
        >

        </textarea>
      </section>
    </section>
  );
};

export default UserInputContainer;