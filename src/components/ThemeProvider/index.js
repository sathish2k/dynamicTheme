import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { user } = useSelector((state) => state);
  const themeOptions = useMemo(() => {
    return {
      palette: {
        primary: {
          main: user && user.theme ? user.theme : "#3f51b5",
        },
      },
    };
  }, [user]);
  const theme = createTheme(themeOptions);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
