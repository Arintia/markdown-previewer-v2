import { createStyles } from '@mantine/core';
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';

const useStyles = createStyles(() => ({
    footerContainer: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100vw',
        display: 'flex',
        height: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '0.95rem'
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '8rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    },
    linkItem: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));
const Footer = () : JSX.Element => {
    const { classes } = useStyles();
    return (
        <footer className={classes.footerContainer}>
            <p>Developed by Yiğit Atak with ❤️ and a lot of ☕</p>
            <div className={classes.linkContainer}>
                <a 
                    href="https://github.com/Arintia/markdown-previewer-v2" 
                    className={classes.linkItem}
                    target="_blank"
                >
                    <IconBrandGithub size="1.32rem" stroke={2.5} />
                </a>
                <a 
                    href="https://www.instagram.com" 
                    className={classes.linkItem}
                    target="_blank"
                >
                    <IconBrandInstagram size="1.325rem" stroke={2.5} />
                </a>
                <a 
                    href="https://www.linkedin.com/in/yigitatak/" 
                    className={classes.linkItem}
                    target="_blank"
                >
                    <IconBrandLinkedin size="1.325rem" stroke={2.5} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;