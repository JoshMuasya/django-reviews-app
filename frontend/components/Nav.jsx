import { AppBar, Drawer, IconButton, Button, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Nav = () => {

    const [toggle, setToggle] = useState(false);

    const router = useRouter()

    const toggleDrawer = (value) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setToggle(value)
    } 

  return (
    <>
        <AppBar>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                <Drawer
                    anchor={'left'}
                    open={toggle}
                    onClose={toggleDrawer(!toggle)}
                >
                    <div>
                        <List>
                            <ListItem Button onClick={() => router.push('/')}>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                
                <Typography variant='h6'>
                    Local Reviews
                </Typography>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Nav