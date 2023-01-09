import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { useParams } from 'react-router-dom';
import useGetProject from '../../hooks/useGetProject';
import { useEffect } from 'react';
import { useState } from 'react';

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



// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;



const CalculationTable = ({ project }) => {
	const [product, setProduct] = useState()
	const [amount, setAmount] = useState()
	const [workingHours, setWorkingHours] = useState() 
	const [error, setError] = useState(null)

	// console.log('project', project?.map(item => item.projectMaterial).map(p => p[0].product))

	console.log('******', project?.map(item => item.projectMaterial))
	console.log('*', project?.map(item => item.projectMaterial.map(item => item).map(i => i)))


	
	console.log('product', product)


	return (
		<TableContainer>
			<Table sx={{ minWidth: 300 }} aria-label="spanning table">
				<TableHead>
					<TableRow>
						<TableCell align="start"><strong>Material</strong></TableCell>
						<TableCell align="center"><strong>Antal</strong></TableCell>
						<TableCell align="right"><strong>Tid</strong></TableCell>
					</TableRow>
				</TableHead>


				<TableBody>
					{project?.map(prod => prod.projectMaterial.map((item, i)  => {
						const workHours = (item.estimatedTime.hours + item.estimatedTime.minutes) * item.quantity
						console.log('workHours', workHours)

						console.log('***', item.extraItems.map(val => val?.fittings))
					
					
							return 	(
								<>
									<TableRow key={i.id} colSpan={2}>
										<TableCell>{item.product}</TableCell>
										<TableCell align='center'>{item.quantity}</TableCell>
										<TableCell align='right'>{workHours}</TableCell>

										{/* <TableCell>{item.product}</TableCell> */}
										{/* <TableCell>{(item.estimatedTime.hours, item.estimatedTime.minutes)}</TableCell> */}

										{/* <TableCell>{item.extraItems.map(item => item.fittings)}</TableCell> */}
									</TableRow>

									{item.extraItems.map((val) => (
										<TableRow key={i.id} colSpan={2}>
											<TableCell> - {val.fittings}</TableCell> 
											<TableCell align='center'>{val.quantity} {val.unit}</TableCell>
										</TableRow>
									))}

									<TableRow>
										<TableCell colSpan={2}>Tid</TableCell>
										<TableCell colSpan={1} align="right">24</TableCell>
									</TableRow>
						
								</>
					
							)
					}))}
				
				</TableBody>
			</Table>
		</TableContainer>
  	)	
}

export default CalculationTable
