import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import axios from "axios";
import { getUser, setUser } from "./redux/actions";

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state);
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
        console.log(err.response.data.message)
      if (err.response.data.message === "Invalid token") {
        navigate("/login");
        dispatch(setUser(null))
      }
    }
  );

  if (loading) {
    return <CircularProgress />;
  }
  return user ? children : <Navigate to="/login" />;
}

export { PrivateRoute };
