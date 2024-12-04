import { useEffect, useState } from "react";
import { Button } from "@mui/material";
export default function Logout() {
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
    console.log("test");
    localStorage.removeItem("authCredentials");
    setCredentials(null);
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
      >
        Logout
      </Button>
    </>
  );
}
