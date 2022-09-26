import { Button, Container, Grid, css } from "@nextui-org/react";
import fondEcran from "./assets/alberta.jpg";
function App() {
  return (
    <div>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        responsive={false}
        css={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          p: 0,
          background: `url(${fondEcran})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <Grid.Container justify="center" gap={4} css={{ mt: 50, p: 10 }}>
          <Button
            auto
            css={{
              borderRadius: "$xs",
              padding: "10px",
              fontSize: "2em",
              border: "$space$1 solid transparent",
              background: "$blue800",
              color: "$blue200",
              height: "$35",
              boxShadow: "$xl",
              "&:hover": {
                background: "$green900",
                color: "$blue300",
              },
              "&:active": {
                background: "$green700",
              },
              "&:focus": {
                borderColor: "$gray600",
              },
            }}
          >
            Hello World
          </Button>
        </Grid.Container>
      </Container>
    </div>
  );
}

export default App;
