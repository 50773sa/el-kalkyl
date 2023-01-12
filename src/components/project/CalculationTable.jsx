
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useGetProject from '../../hooks/useGetProject';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { List, ListItem, Typography } from '@mui/material';
import { border, borderBottom, margin } from '@mui/system';
import useGetProj from '../../hooks/useGetProj';



const CalculationTable = ({ project }) => {
	const { projectId } = useParams()
	// const { data: project } = useGetProject(projectId)
	// const { data: project} = useGetProj(projectId)
	// console.log('proj', proj)
	const [objArr, setObjArr] = useState()
	let work = []
	let fittings = []
	let fittingsArr = []
	let workingHours;
	let products = []
	let qty = []
	let items = []

	const findDuplicates = (arr) => {
		let array = arr.filter((item, index) => arr.indexOf(item) === index)
		// setObjArr([...array])
		// console.log('array', array)
		return array
	}
	useEffect(() => {

		const convertToObj = (a, b, arr) => {
			// Checking if the array lengths are same and none of the array is empty
			if (a.length != b.length || a.length == 0 || b.length == 0) {
				return null
			}
		
			let object = a.reduce(( arr, element, index) => {
				// return [...arr, {item: element, value: b[index]} ]
				return [ ...arr, {item: element , value: b[index]} ]
			},'')



		
			console.log('object', object),
			setObjArr(object),
			console.log('object***', objArr)
		}


		// if (!project) {
		// 	return
		// }
		convertToObj(fittings, qty)

	}, [])
	  
	console.log('objArr', objArr)

	return (
		<TableContainer>
			<Table sx={{ minWidth: 300 }} aria-label="spanning table">
				<TableHead>
					<TableRow sx={{ backgroundColor: "#579eea"}} >
						<TableCell><strong>Material</strong></TableCell>
						<TableCell align="center"><strong>Antal</strong></TableCell>
						<TableCell align="right"><strong>Tid</strong></TableCell>
					</TableRow>
				</TableHead>


				<TableBody>
					{project?.map(prod => prod.projectMaterial.map((item, i)  => {
						items = [...items, item]
						products = [...products, item]

						// calculate estimated time
						const workHours = [(item.estimatedTime.hours + item.estimatedTime.minutes) * item.quantity]
							work = [...work, workHours].flat()
							work.reduce((a, b) => workingHours = a + b ,0)


						return 	(
							<>
								<TableRow key={i.id} colSpan={2} sx={{ backgroundColor: "#cccccc"}} >
									<TableCell>{item.product}</TableCell>
									<TableCell align='center'>{item.quantity}</TableCell>
									<TableCell align='right'>{workHours}</TableCell>
								</TableRow>

								{item.extraItems.map((items) => {
									qty = [...qty, items.quantity * item.quantity]
									fittings = [...fittings, items.fittings]
									// remove duplicates
									fittingsArr = [...new Set(fittings)]

									return (
										<TableRow key={i.id} colSpan={3} >
												<TableCell align='left' style={{ borderBottom: 'none' }}> - {items.fittings}</TableCell> 
												<TableCell align='center' style={{ borderBottom: 'none'}} >{items.quantity * item.quantity} {items.unit}</TableCell>
										</TableRow>
									)
								})}
							</>
						)
					}))}

		
					<TableRow colspan={2} style={{ borderTop: '2px solid #848484cf' }} >
						<TableCell align='left'><strong>Sammanställning</strong></TableCell>
						<TableCell align='right'></TableCell>
						<TableCell align="right">{workingHours}</TableCell>				
					</TableRow>

					{objArr?.map((item) => (
						<TableRow key={item.id} colSpan={3}>
							<TableCell style={{ borderBottom: 'none'}}></TableCell>
							<TableCell align='left'>{item.item}</TableCell>
							<TableCell align='right'>{item.value}</TableCell>
						</TableRow>
					
					))} 

					{/* {products.map((item) => (
						<TableRow key={item.id} colSpan={3}>
							<TableCell style={{ borderBottom: 'none'}}></TableCell>
							<TableCell align='left'>{item.product}</TableCell>
							<TableCell align='right'>{item.quantity} {item.unit}</TableCell>
						</TableRow>
					))}

					{fittings.map((item) => (
						<TableRow key={item.id} colspan={3}>
							<TableCell style={{ borderBottom: 'none'}}></TableCell>
							<TableCell align='left'>{item}</TableCell>
							<TableCell></TableCell>
						</TableRow>
					))}
				
					{qty.map((item) =>(
						<TableRow key={item.id}>
							<TableCell style={{ borderBottom: 'none'}}></TableCell>
							<TableCell align='right'>{item}</TableCell>
						</TableRow>
					))} */}

				</TableBody>
			</Table>
		</TableContainer>
  	)	
}

export default CalculationTable
