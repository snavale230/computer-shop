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
  
  const SellDataTable = ({ onRowClick, tableRows }) => {
    const theme = useTheme();
  
    const tableCellNamesForTransaction = [
      "ID",
      "Customer Name",
      "Customer Mobile",
      "Sell Price",
      "Sell Quantity",
      "Sell Date",
      "Description",
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
                      {row.customer_name}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.customer_mobile}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.sale_price}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.sale_quantity}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                  {new Date(row.sale_date).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.description}
                  </TableCell> 
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  // Passing onRowClick as an empty default function
  SellDataTable.defaultProps = {
    onRowClick: () => {},
  };
  
  SellDataTable.propTypes = {
    onRowClick: PropTypes.func,
  };
  
  export default SellDataTable;
  