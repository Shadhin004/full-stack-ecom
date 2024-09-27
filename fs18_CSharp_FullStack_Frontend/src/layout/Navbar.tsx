import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Container, Menu, MenuItem, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Footer from './Footer';

export default function Navbar() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { currentUser } = useSelector((state: RootState) => state.userR);

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '2px solid #f48fb1' }}>
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between', padding: '0px 0px !important' }}>
                        {/* Search Bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid lightgrey', borderRadius: '0px', overflow: 'hidden', height: '35px' }}>
                            <InputBase
                                placeholder="Search For Product"
                                sx={{ padding: '0 10px', width: '200px' }}
                            />
                            <IconButton type="submit" sx={{ backgroundColor: '#f50057', borderRadius: 0, padding: '10px 15px', color: 'white' }}>
                                <SearchIcon />
                            </IconButton>
                        </Box>

                        {/* Centered Title */}
                        <Typography variant="h3" sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                            <img src='/app_logo.png' height={'80px'} />
                        </Typography>

                        {/* Cart */}
                        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f50057', borderRadius: '0px', padding: '5px 10px', color: 'white' }}>
                            {
                                currentUser ?
                                    <>
                                        <AccountBoxIcon />
                                        <Typography onClick={handleClick} variant="body2" sx={{ ml: 1 }}>
                                            {currentUser.firstName}
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <LockOpenIcon />
                                        <Typography onClick={handleClick} variant="body2" sx={{ ml: 1 }}>
                                            {'Login / Register'}
                                        </Typography>
                                    </>
                            }
                            
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                    <Box sx={{ backgroundColor: '#f8f8f8', border: '1px solid #eaeaea' }}>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='' color="inherit">Home</Link>
                            <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='/search/product' color="inherit">Shop</Link>
                            {/* <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='' color="inherit">Categories</Link> */}
                            <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='/cart' color="inherit">Cart</Link>
                            <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='/register' color="inherit">Register</Link>
                            <Link style={{ padding: '10px 20px', color: '#000', minWidth: '64px', fontWeight: 'bold', textDecoration: 'none' }} to='/login' color="inherit">Login</Link>
                        </Stack>
                    </Box>
                </Container>
            </AppBar>
            <Outlet />
            <Footer />
        </div>
    );
}
