import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

interface Transaction {
  id: string;
  transaction: string;
}

interface TransactionsListProps {
  credentials: string;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ credentials }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Transaction[]>(
        "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/getTx",
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      )
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch transactions. Check your credentials.");
        setLoading(false);
      });
  }, [credentials]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Transaction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>{tx.id || "N/A"}</TableCell>
            <TableCell>{tx.transaction || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsList;
