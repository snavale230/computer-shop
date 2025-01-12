// import {
//   TableCell,
//   Table,
//   TableBody,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import { useTheme } from "@mui/material/styles";
// import PropTypes from "prop-types";
// import "../../Styles/Table.sass";
// import React, { useState, useMemo } from "react";

// const SellDataTable = ({ onRowClick, tableRows }) => {
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState("");

//   const tableCellNamesForTransaction = [
//     "ID",
//     "Customer Name",
//     "Customer Mobile",
//     "Serial No",
//     "Sell Price",
//     "Sell Quantity",
//     "Sell Date",
//   ];

//   // Use useMemo to memoize the filtered rows
//   const filteredRows = useMemo(() =>
//     tableRows.filter((row) =>
//       row.customer_name?.toLowerCase().includes(searchTerm?.toLowerCase())
//     ), [searchTerm, tableRows]
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by customer name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: "8px", padding: "5px" }}
//       />
//       <Paper
//         className="table"
//         sx={{
//           pl: { sm: 1 },
//           pr: { xs: 1, sm: 1 },
//           "& th, & td": {
//             fontSize: theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
//           },
//           mt: 2,
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="Table">
//           <TableHead>
//             <TableRow>
//               {tableCellNamesForTransaction.map((name, i) => (
//                 <TableCell
//                   className="table_cell"
//                   sx={{ p: 1 }}
//                   key={i}
//                   style={{ color: "#20B2AA" }}
//                 >
//                   {name}{" "}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.map((row) => (
//               <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.id}{" "}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.customer_name}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.customer_mobile}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.serial_no}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.sale_price}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {row.sale_quantity}
//                 </TableCell>
//                 <TableCell className="table_cell" sx={{ p: 1 }}>
//                   {new Date(row.sale_date).toLocaleDateString("en-GB")}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </div>
//   );
// };

// // Passing onRowClick as an empty default function
// SellDataTable.defaultProps = {
//   onRowClick: () => {},
// };

// SellDataTable.propTypes = {
//   onRowClick: PropTypes.func,
// };

// export default SellDataTable;

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
import React, { useState, useMemo } from "react";

const SellDataTable = ({ onRowClick, tableRows }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const tableCellNamesForTransaction = [
    "ID",
    "Customer Name",
    "Customer Mobile",
    "Serial No",
    "Sell Price",
    "Sell Quantity",
    "Sell Date",
  ];

  // Filtered rows based on the search term
  const filteredRows = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearchTerm) return tableRows;

    return tableRows.filter((row) => {
      // Ensure `customer_name` is defined and is a string before filtering
      const customerName = row.customer_name || "";
      return customerName.toLowerCase().includes(lowerCaseSearchTerm);
    });
  }, [searchTerm, tableRows]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "8px", padding: "5px" }}
      />
      <Paper
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
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.id}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.customer_name}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.customer_mobile}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.serial_no}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.sale_price}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.sale_quantity}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {new Date(row.sale_date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.description}
                  </TableCell> 
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableCellNamesForTransaction.length} align="center">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

// Passing onRowClick as an empty default function
SellDataTable.defaultProps = {
  onRowClick: () => {},
};

SellDataTable.propTypes = {
  onRowClick: PropTypes.func,
  tableRows: PropTypes.array.isRequired,
};

export default SellDataTable;
