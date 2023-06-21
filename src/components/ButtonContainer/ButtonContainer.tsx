import { createStyles } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';


const useStyles = createStyles(() => ({
    buttonContainer: {
        width: '75%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1rem'
    },
    button: {
        marginLeft: '1rem'
    }
}));

const ButtonContainer = () : JSX.Element => {
    const { classes } = useStyles();
    return (
        <section className={classes.buttonContainer}>
            <Button variant="outline" color="red" size="md" className={classes.button}>
                Reset
            </Button>
            <Button leftIcon={<IconDownload />} variant="outline" size="md" className={classes.button}>
                Export MD File
            </Button>
        </section>
    );
};

export default ButtonContainer;