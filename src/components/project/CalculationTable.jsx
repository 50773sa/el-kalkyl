import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.07;


function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const CalculationTable = () => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 300 }} aria-label="spanning table">
				<TableHead>
					<TableRow>
						<TableCell align="start" >Material</TableCell>
						<TableCell align="center">Antal</TableCell>
						<TableCell align="right">Tid</TableCell>
					</TableRow>
				</TableHead>


				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.desc} colSpan={3}>
							<TableCell>{row.desc}</TableCell>
							<TableCell align="right">{row.qty}</TableCell>
							{/* <TableCell align="right">{row.time}</TableCell> */}
							<TableCell align="right">8</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell colSpan={2}>Tid</TableCell>
						<TableCell colSpan={1} align="right">24</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
  	)	
}

export default CalculationTable
