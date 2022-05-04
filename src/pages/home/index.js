import { Button, Card } from "@mui/material";
const Home = () => {
  return (
    <>
      <Card
        sx={{
          height: "100vh",
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{color:'#fff'}}> Theme Switcher , Select different themes </h1>
          <Button color="secondary" variant="contained">
            Get Started
          </Button>
        </div>
      </Card>
    </>
  );
};
export default Home;
