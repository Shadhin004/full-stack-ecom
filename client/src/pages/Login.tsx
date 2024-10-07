// @ts-nocheck 

import { useDispatch, useSelector } from "react-redux"
import { Box, Grid, TextField, Stack, Button, Card, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { loginUser } from "../data/reducers/UserSlice"
import { useNavigate, useLocation } from "react-router-dom"
import { RootState } from "../data/store"
import { useEffect } from "react"

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { currentUser } = useSelector((state: RootState) => state.userR);
 
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    const onSubmit = (data) => {
        dispatch(loginUser(data))
        reset()
    }

    useEffect(() => {
        if (currentUser) {
            navigate(redirectUrl)
        }
    }, [currentUser, navigate])

    return (
        <Box sx={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} m={3} >
                    <Card sx={{ padding: 5 }}>
                        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 4 }}> Login </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <TextField
                                    variant="outlined"
                                    label="User name or Email"
                                    fullWidth
                                    inputProps={{ minLength: 4 }}
                                    size="small"
                                    {...register('userName', {
                                        required: {
                                            value: true,
                                            message: "This field is required!"
                                        }
                                    })}
                                />
                                {errors.userName && <span style={{ color: 'red' }}>{errors.userName.message}</span>}

                                <TextField
                                    variant="outlined"
                                    type="password"
                                    label="Enter Your Password"
                                    fullWidth
                                    // error={passError}
                                    inputProps={{ minLength: 8 }}
                                    size="small"{...register('password', {
                                        required: {
                                            value: true,
                                            message: "Password is required!"
                                        }
                                    })}
                                />
                                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                                <Button
                                    // loading={false}
                                    variant="contained"
                                    type="submit"
                                    sx={{ textTransform: "none" }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Card>

                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </Box >
    )
}

export default Login