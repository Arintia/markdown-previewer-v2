import { ColorInput, Button, createStyles, useMantineTheme } from '@mantine/core';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import { useEffect, useRef } from 'react';
import MarkdownIt from 'markdown-it';

const useStyles = createStyles(() => ({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  customizationContainer: {
    width: '75%',
    display: 'flex',
    [`@media (max-width: 514px)`]: {
      flexDirection: 'column'
    },
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
    minHeight: '35rem',
    width: '75%',
    marginTop: '2rem',
    marginBottom: '2rem',
    padding: '2rem',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
    overflow: 'auto'
  }
}));


const GeneratedInputContainer = (props: 
  {
    inputText: string, 
    resetInputText: any
    generatedBackgroundColor: string, 
    setGeneratedBackgroundColor: React.Dispatch<React.SetStateAction<string>>,
    generatedTextColor: string, 
    setGeneratedTextColor: React.Dispatch<React.SetStateAction<string>>,
    setGeneratedModifiedBackground: React.Dispatch<React.SetStateAction<Boolean>>,
    setGeneratedModifiedTextColor: React.Dispatch<React.SetStateAction<Boolean>>
  }) => {

  const theme = useMantineTheme();
  const outputRef = useRef<HTMLElement | null>(null);
  const { classes } = useStyles();

  const resetBgColor = () => { 
    props.setGeneratedBackgroundColor(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]); 
    props.setGeneratedModifiedBackground(false);
    localStorage.removeItem("generatedBgColor");
  }
  const resetTextColor = () => { 
    props.setGeneratedTextColor(theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]); 
    props.setGeneratedModifiedTextColor(false);
    localStorage.removeItem("generatedTextColor");
  }

  const md = MarkdownIt();

  useEffect(() => {
    if(outputRef.current !== null) {
      outputRef.current.innerHTML = md.render(props.inputText);
    }
  }, [props.inputText]);

  const handleBgColorChange = (color : string) => {
    localStorage.setItem("generatedBgColor", color);
    props.setGeneratedBackgroundColor(color);
    props.setGeneratedModifiedBackground(true);
  };

  const handleTextColorChange = (color : string) => {
    localStorage.setItem("generatedTextColor", color);
    props.setGeneratedTextColor(color); 
    props.setGeneratedModifiedTextColor(true);
  }

  return (
    <section className={classes.inputWrapper}>
      <section className={classes.customizationContainer}>
        <div className={classes.colorPickerContainer}>

          <ColorInput 
            placeholder="Pick a color" 
            label="Background Color" 
            className={classes.colorPicker}
            value={props.generatedBackgroundColor} 
            onChangeEnd={handleBgColorChange} 
          />
          <div className={classes.colorPickerBtnContainer}>
            {props.generatedBackgroundColor !== (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]) &&
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
            value={props.generatedTextColor} 
            onChangeEnd={handleTextColorChange} 
          />
          <div className={classes.colorPickerBtnContainer}>
          {props.generatedTextColor !==  (theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[6]) &&
            <Button variant="outline" color="red" size="md" className={classes.colorPickerBtn} onClick={resetTextColor}>
              Reset
            </Button>
          }
          </div>
        </div>
      </section>
      <section className={classes.inputContainer} style={{background: props.generatedBackgroundColor, color: props.generatedTextColor}} ref={outputRef}>

      </section>
      <ButtonContainer text={props.inputText} resetInputText={props.resetInputText} />
    </section>
  );
};

export default GeneratedInputContainer;