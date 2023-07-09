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
	console.log('reducedResult', reducedResult)
	let workingHours;
	let work = []
	let fittings = []
	let products = []
	let qty = []
	let items = []
	let unit = ''
	let allProducts = []

	let hours;
	let minutes;

	const findDuplicates = () => {
		// Remove items if more than one, but keep the values
		const groupByItem = allProducts?.reduce((acc, curr) => {
			if (acc[curr.item]) {
			  acc[curr.item].value += curr.value
			} else {
			  acc[curr.item] = { item: curr?.item, value: curr?.value, unit: curr?.unit}
			}
			return acc
		}, {})

		setReducedResult([...Object?.values(groupByItem)])
	}
	// const convertToObj = (a, b) => {
	// 	// Checking if the array lengths are same and none of the array is empty
	// 	if (a.length != b.length || a.length == 0 || b.length == 0) {
	// 		return null
	// 	}

	// 	// Merge the arrays into one array of objects
	// 	let object = a.reduce(( arr, element, index) => {
	// 		return [ ...arr, {item: element , value: b[index] } ]
	// 	},'')

	// 	setObjArr(object)
	// }	

	// useEffect(() => {

	// 	if (!project) {
	// 		console.log('Waiting for project...')
	// 		return 
	// 	}

	// 	if(fittings.length === 0) {
	// 		console.log('No fittings')
	// 		return 
	// 	}

	// 	convertToObj(fittings, qty, unit)

	// }, [project])
 

	useEffect(() => {
		setLoading(true)

		if (allProducts.length === 0) {
			console.log('allProducts is empty')
			return
		}
		findDuplicates()
		setLoading(false)

	}, [project])
console.log('allProducts', reducedResult.sort((a,b) => a.item > b.item ? 1 : -1))

	return (
		<>
			<TableContainer>
				<Table sx={{ minWidth: 300 }} aria-label="spanning table">
					<TableHead>
						<TableRow sx={{ backgroundColor: "#579eea"}} >
							<TableCell><strong>Material</strong></TableCell>
							{/* <TableCell /> */}
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
									<TableRow key={i.id} colSpan={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
										<TableCell>{item.product}</TableCell>
										{/* <TableCell /> */}
										<TableCell align='center'>{item.quantity} st </TableCell>
										<TableCell align='right'>{workHours} min</TableCell>
									</TableRow>

									{item.extraItems.map((items) => {
										// qty = [...qty, items.quantity * item.quantity]
										// fittings = [...fittings, items.fittings]
										// unit = [...unit, items.unit]
										allProducts = [...allProducts, {product: item.product, item: items.fittings, value: items.quantity * item.quantity, unit: items.unit}]

										const prevProduct = allProducts.filter((_event, index) => index === i - 1)[0]?.fittings || ''
										const nextProduct = item.extraItems.filter((_event, index) => index === i + 1)[0]?.product || ''
										console.log('nextProduct !== prevProduct', items.fittings !== prevProduct)

										return (
											<TableRow key={i.id} colSpan={3} >
												<TableCell align='left' style={{ borderBottom: 'none' }}> - {items.fittings}</TableCell> 
												{/* <TableCell /> */}
												<TableCell align='center' style={{ borderBottom: 'none'}} >{items.quantity * item.quantity} {items.unit}</TableCell>
											</TableRow>
										)
									})}
								</>
							)
						})}
					</TableBody>

						{/**
						 *	Reduced list of items 
						 */}


					<TableBody>
						<TableRow colSpan={2} style={{ borderTop: '2px solid #848484cf', borderBottom: '2px solid #848484cf' }} >
							<TableCell align='left'><strong>Sammanställning</strong></TableCell>
							<TableCell align='left'>Arbetstimmar</TableCell>
							<TableCell align="right">{hours} tim {minutes} min</TableCell>				
						</TableRow>
					
						{products?.sort((a,b) => a.product > b.product ? 1 : -1).map((item) => (
							<TableRow key={item.id} colSpan={3} sx={{ fontWeight: '700'}}>
								<TableCell sx={{ display: {xs: 'none', md:'table-cell'}, borderBottom: 'none' }} ></TableCell>
								<TableCell align='left' sx={{ borderBottom: 'none', fontWeight: '700' }} >{item.product}</TableCell>
								<TableCell align='right' sx={{ borderBottom: 'none', fontWeight: '700' }} >{item.quantity} st</TableCell>
							</TableRow>
						))}
		
						{!loading && reducedResult?.sort((a,b) => a.item > b.item ? 1 : -1).map((i) => (
							<TableRow key={i.item} >
								<TableCell sx={{ display: {xs: 'none', md:'table-cell'}, borderBottom: 'none' }} />
								<TableCell align='left' sx={{ borderBottom: 'none' }} >{i.item}</TableCell>
								<TableCell align='right' sx={{ borderBottom: 'none' }} >{i.value} {i.unit}</TableCell>
							</TableRow> 
						))} 

					</TableBody>
				</Table>
			</TableContainer>
		</>
  	)	
}

export default CalculationTable
