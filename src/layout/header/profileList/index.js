import { Menu, MenuItem, Icon } from "@mui/material";
const ProfileList = (props) => {
  return (
    <Menu
      id="settings"
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
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
      <MenuItem onClick={props.handleClose}>
        <Icon sx={{marginRight:'10px'}}>face</Icon>Profile
      </MenuItem>
      <MenuItem onClick={props.logOut}>
        <Icon sx={{marginRight:'10px'}}>power_settings_new</Icon>Logout
      </MenuItem>
    </Menu>
  );
};
export default ProfileList;
