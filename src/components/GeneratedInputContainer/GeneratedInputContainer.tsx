import { ColorInput, Button, createStyles } from '@mantine/core';
import ButtonContainer from '../ButtonContainer/ButtonContainer';

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
  }
}));

function GeneratedInputContainer() {
  const { classes } = useStyles();
  return (
    <section className={classes.inputWrapper}>
      <section className={classes.customizationContainer}>
        <div className={classes.colorPickerContainer}>
          <ColorInput placeholder="Pick a color" label="Background Color" className={classes.colorPicker} />
          <div className={classes.colorPickerBtnContainer}>
            <Button variant="outline" size="md" className={classes.colorPickerBtn}>
              Change
            </Button>
            <Button variant="outline" color="red" size="md" className={classes.colorPickerBtn}>
              Reset
            </Button>
          </div>
        </div>
        <div className={classes.colorPickerContainer}>
          <ColorInput placeholder="Pick a color" label="Text Color" className={classes.colorPicker} />
          <div className={classes.colorPickerBtnContainer}>
            <Button variant="outline" size="md" className={classes.colorPickerBtn}>
              Change
            </Button>
            <Button variant="outline" color="red" size="md" className={classes.colorPickerBtn}>
              Reset
            </Button>
          </div>
        </div>
      </section>
      <section className={classes.inputContainer}>

      </section>
      <ButtonContainer />
    </section>
  );
};

export default GeneratedInputContainer;