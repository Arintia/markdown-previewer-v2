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

const ButtonContainer = (props: {text: string, resetInputText: any}) : JSX.Element => {
    const { classes } = useStyles();

    const prepareDownload = () => {
        if(!props.text) return;
        const file = new Blob([props.text], {type: "text/plain"});
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", "export.md");
        if(window.webkitURL != null) {
            downloadLink.setAttribute("href", window.webkitURL.createObjectURL(file)); 
        } else {
            downloadLink.setAttribute("href", window.URL.createObjectURL(file));
        }
        downloadLink.click();
        downloadLink.remove();
    }

    return (
        <section className={classes.buttonContainer}>
            <Button variant="outline" color="red" size="md" className={classes.button} onClick={props.resetInputText}>
                Reset
            </Button>
            <Button leftIcon={<IconDownload />} variant="outline" size="md" className={classes.button} onClick={prepareDownload}>
                Export MD File
            </Button>
        </section>
    );
};

export default ButtonContainer;