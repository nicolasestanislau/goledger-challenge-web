import { useState } from "react";
import { Container, Typography } from "@mui/material";
import TransactionsList from "./components/TransactionsList";
import Login from "./components/Login";

function App() {
  const [credentials, setCredentials] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    setCredentials(encodedCredentials);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions Viewer
      </Typography>
      {!credentials ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TransactionsList credentials={credentials} />
      )}
    </Container>
  );
}

export default App;
