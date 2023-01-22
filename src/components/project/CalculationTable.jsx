import { useEffect, useState } from 'react'
// mui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'


const CalculationTable = ({ project }) => {
	const [loading, setLoading] = useState(true)
	const [objArr, setObjArr] = useState([])
	const [reducedResult, setReducedResult] = useState([])

	let workingHours;
	let work = []
	let fittings = []
	let products = []
	let qty = []
	let items = []

	let hours;
	let minutes;

	const findDuplicates = () => {
		// Remove items if more than one, but keep the values
		const groupByItem = objArr?.reduce((acc, curr) => {
			if (acc[curr.item]) {
			  acc[curr.item].value += curr.value
			} else {
			  acc[curr.item] = { item: curr?.item, value: curr?.value }
			}
			return acc
		}, {})

		setReducedResult([...Object?.values(groupByItem)])
	}

	const convertToObj = (a, b) => {
		// Checking if the array lengths are same and none of the array is empty
		if (a.length != b.length || a.length == 0 || b.length == 0) {
			return null
		}

		// Merge the arrays into one array of objects
		let object = a.reduce(( arr, element, index) => {
			return [ ...arr, {item: element , value: b[index]} ]
		},'')

		setObjArr(object)
	}	

	useEffect(() => {

		if (!project) {
			console.log('Waiting for project...')
			return 
		}

		if(fittings.length === 0) {
			console.log('No fittings')
			return 
		}

		convertToObj(fittings, qty)

	}, [project])
 

	useEffect(() => {
		setLoading(true)

		if (objArr.length === 0) {
			console.log('ObjArr is empty')
			return
		}
		findDuplicates()
		setLoading(false)

	}, [objArr])


	return (
		<>
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
						{project?.projectMaterial?.map((item, i) => {
							items = [...items, item]
							products = [...products, item]

							// calculate estimated time
							const workHours = [(item.estimatedTime.hours + item.estimatedTime.minutes) * item.quantity]
								work = [...work, workHours].flat()
								work.reduce((a, b) => workingHours = a + b ,0)
								hours = Math.floor([workingHours/60])
								minutes = workingHours % 60
						
							return (
								<>
									<TableRow key={i.id} colSpan={2} sx={{ backgroundColor: "#cccccc"}}>
										<TableCell>{item.product}</TableCell>
										<TableCell align='center'>{item.quantity}</TableCell>
										<TableCell align='right'>{workHours} min</TableCell>
									</TableRow>

									{item.extraItems.map((items) => {
										qty = [...qty, items.quantity * item.quantity]
										fittings = [...fittings, items.fittings]
										
										return (
											<TableRow key={i.id} colSpan={3} >
												<TableCell align='left' style={{ borderBottom: 'none' }}> - {items.fittings}</TableCell> 
												<TableCell align='center' style={{ borderBottom: 'none'}} >{items.quantity * item.quantity} {items.unit}</TableCell>
											</TableRow>
										)
									})}
								</>
							)
						})}

						{/**
						 *	Reduced list of items 
						 */}

			
						<TableRow colSpan={2} style={{ borderTop: '2px solid #848484cf', borderBottom: '2px solid #848484cf' }} >
							<TableCell align='left'><strong>Sammanställning</strong></TableCell>
							<TableCell align='left'>Arbetstimmar</TableCell>
							<TableCell align="right">{hours} tim {minutes} min</TableCell>				
						</TableRow>

						{products?.map((item) => (
							<TableRow key={item.id} colSpan={3}>
								<TableCell style={{ borderBottom: 'none'}}></TableCell>
								<TableCell align='left'>{item.product}</TableCell>
								<TableCell align='right'>{item.quantity} {item.unit}</TableCell>
							</TableRow>
						))}
		
						{!loading && reducedResult?.map((i) => (
							<TableRow key={i.item} colSpan={3}>
								<TableCell style={{ borderBottom: 'none'}}></TableCell>
								<TableCell align='left'>{i.item}</TableCell>
								<TableCell align='right'>{i.value}</TableCell>
							</TableRow> 
						))} 

					</TableBody>
				</Table>
			</TableContainer>
		</>
  	)	
}

export default CalculationTable
