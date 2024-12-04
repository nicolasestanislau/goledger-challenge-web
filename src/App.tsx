import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container, Typography } from "@mui/material";
import TransactionsList from "./components/TransactionsList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions Viewer
      </Typography>
      <TransactionsList />
    </Container>
  );
}

export default App;
