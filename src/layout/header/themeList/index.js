import { useState } from "react";
import { Menu } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../../redux/actions";
import styles from "./themelist.module.scss";

const ThemeList = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [value, setValue] = useState(
    user && user.theme ? user.theme : "#3f51b5"
  );
  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(setTheme(event.target.value));
  };

  const colors = [
    {
      colorCode: "#000000",
      name: "Black theme",
      id: 1,
    },
    {
      colorCode: "#3f51b5",
      name: "Violet theme",
      id: 2,
    },
    {
      colorCode: "#8bc34a",
      name: "Green theme",
      id: 3,
    },
    {
      colorCode: "#ffc107",
      name: "Yellow theme",
      id: 4,
    },
  ];
  return (
    <Menu
      id="theme"
      anchorEl={props.open}
      keepMounted
      open={Boolean(props.open)}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {colors.map((tile) => (
            <div key={tile.id} className={styles.radioGroup}>
              <FormControlLabel
                value={tile.colorCode}
                control={<Radio />}
                label={tile.name}
              />
              <div
                className={styles.colorBox}
                style={{
                  backgroundColor: tile.colorCode,
                }}
              ></div>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </Menu>
  );
};

export default ThemeList;
