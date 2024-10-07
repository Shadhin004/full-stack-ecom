// @ts-nocheck 

import { useDispatch, useSelector } from "react-redux"
import { Box, Grid, TextField, Stack, Button, Card, Typography, Select, MenuItem } from "@mui/material"
import { useForm } from "react-hook-form"
import { createUser } from "../data/reducers/UserSlice"
import { useGetCitiesQuery } from "../data/redux/api"

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { data: cities, error, isLoading } = useGetCitiesQuery();
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    const newUser = {
      ...data,
      contactNumbers: [data.contactNumbers],
      userName: data.email
    }
    dispatch(createUser(newUser))
    reset()
  }
  console.log(cities)
  return (
    <Box sx={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} m={3} >
          <Card sx={{ padding: 5 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 4 }}> Registration </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  fullWidth
                  inputProps={{ minLength: 4 }}
                  size="small"
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: "First Name is required!"
                    }
                  })}
                />
                {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}

                <TextField
                  variant="outlined"
                  label="Last Name"
                  fullWidth
                  inputProps={{ minLength: 4 }}
                  size="small"
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: "Last Name is required!"
                    }
                  })}
                />
                {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}

                <TextField
                  variant="outlined"
                  type="email"
                  label="Enter Your Email Address"
                  fullWidth
                  size="small"{...register('email', {
                    required: {
                      value: true,
                      message: "Email is required!"
                    }
                  })}
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

                <TextField
                  variant="outlined"
                  type="number"
                  label="Enter Mobile Number *"
                  fullWidth
                  size="small"
                  {...register('contactNumbers', {
                    required: {
                      value: true,
                      message: "Phone no is required!"
                    }
                  })}
                />
                {errors.contactNumbers && <span style={{ color: 'red' }}>{errors.contactNumbers.message}</span>}

                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  fullWidth
                  size="small"
                  // value={cities}
                  {...register('cityId', {
                    required: {
                      value: true,
                      message: "City is required!"
                    }
                  })}
                >
                  {
                    cities?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.cityId}>{item.cityName}</MenuItem>
                      )
                    })
                  }
                </Select>
                {errors.cityId && <span style={{ color: 'red' }}>{errors.cityId.message}</span>}

                <TextField
                  variant="outlined"
                  type="text"
                  label="Enter address 1 *"
                  fullWidth
                  size="small"{...register('addressLine1', {
                    required: {
                      value: true,
                      message: "Address 1 is required!"
                    }
                  })}
                />
                {errors.addressLine1 && <span style={{ color: 'red' }}>{errors.addressLine1.message}</span>}

                <TextField
                  variant="outlined"
                  type="text"
                  label="Enter Address 2 *"
                  fullWidth
                  size="small"{...register('addressLine2', {
                    required: {
                      value: true,
                      message: "Address 2 is required!"
                    }
                  })}
                />
                {errors.addressLine2 && <span style={{ color: 'red' }}>{errors.addressLine2.message}</span>}

                <TextField
                  variant="outlined"
                  type="password"
                  label="Create Your Password"
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
                  Create an account
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

export default Register