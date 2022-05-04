import { Grid, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.scss";
import { setLoading, setUser } from "../../redux/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data) => {
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "/api/login",
      data,
      {
        withCredentials: true,
      }
    );
    dispatch(setUser(res.data.user));
    dispatch(setLoading(false))
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item md={6}>
          <div className={styles.imageContainer}>
            <img alt="login.svg" src="login.svg" />
          </div>
        </Grid>
        <Grid item md={6} className={styles.loginContainer}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                variant="filled"
                {...register("email", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="filled"
                {...register("password", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                disabled={!isValid}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default Login;
