import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import TransactionsList from "./components/TransactionsList";
import Login from "./components/Login";

const App: React.FC = () => {
  const [credentials, setCredentials] = useState<string | null>(null);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("authCredentials");
    if (savedCredentials) {
      setCredentials(savedCredentials);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    localStorage.setItem("authCredentials", encodedCredentials);
    setCredentials(encodedCredentials);
  };

  const handleLogout = () => {
    localStorage.removeItem("authCredentials");
    setCredentials(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions Viewer
      </Typography>
      {!credentials ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Logout
          </Button>
          <TransactionsList credentials={credentials} />
        </>
      )}
    </Container>
  );
};

export default App;
