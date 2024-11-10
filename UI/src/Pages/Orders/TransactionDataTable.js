import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import "../../Styles/Table.sass";

const TransactionDataTable = ({ onRowClick, tableRows }) => {
  const theme = useTheme();

  const tableCellNamesForTransaction = [
    "ID",
    "Name",
    "Brand",
    "Price",
    "Quantity",
    "Status",
    "Added Date",
    "Product Description",
    "Supplier Name",
  ];

  return (
    <div
      component={Paper}
      className="table"
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        "& th, & td": {
          fontSize: theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
        },
        mt: 2,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Table">
        <TableHead>
          <TableRow>
            {tableCellNamesForTransaction.map((name, i) => (
              <TableCell
                className="table_cell"
                sx={{ p: 1 }}
                key={i}
                style={{ color: "#20B2AA" }}
              >
                {name}{" "}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows &&
            tableRows.map((row) => (
              <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.id}{" "}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.product_name}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.product_brand}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.product_price}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.product_quantity}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.product_status}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                {new Date(row.date_added).toLocaleDateString('en-GB')}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.product_description}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.supplier_name}
                </TableCell>
                
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Passing onRowClick as an empty default function
TransactionDataTable.defaultProps = {
  onRowClick: () => {},
};

TransactionDataTable.propTypes = {
  onRowClick: PropTypes.func,
};

export default TransactionDataTable;
