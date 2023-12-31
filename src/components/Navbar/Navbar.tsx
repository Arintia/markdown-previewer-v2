import { createStyles } from '@mantine/core';
import { Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';

const useStyles = createStyles(() => ({
    navbar: {
        height: '3rem',
        width: '100vw',
        display: 'flex'
    },
    navbarHeader: {
        fontSize: '1.25rem',
        fontFamily: '"Caveat", cursive;'
    },
    navbarBrand: {
        width: '25vw',
        height: '100%',
        paddingLeft: '2rem',
        display: 'flex',
        alignItems: 'center'
    },
    navbarBtn: {
        display: 'flex',
        justifyContent: 'end',
        paddingRight: '2rem',
        height: '100%',
        width: '75vw',
        alignItems: 'center'
    }
}));

const Navbar = (props: {toggleColorScheme: any }) : JSX.Element => {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <header className={classes.navbar}>
            <div className={classes.navbarBrand}>
                <h1 className={classes.navbarHeader}>
                    Markdown Previewer
                </h1>
            </div>
            <div className={classes.navbarBtn}>
            <Switch
                size="md"
                color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                value={theme.colorScheme === 'dark' ? 'on' : 'off'}
                onLabel={<IconSun size="1rem" stroke={2.5} color={'rgb(255, 212, 59)'} />}
                offLabel={<IconMoonStars size="1rem" stroke={2.5} color={'rgb(34, 139, 230)'} />}
                onClick={() => props.toggleColorScheme()}
            />
            </div>
        </header>
    );
};

export default Navbar;