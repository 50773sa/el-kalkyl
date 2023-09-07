import React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// mui
import { useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const StyledTableRows = styled(TableRow)(() => ({
	border: 'none',
}))

const StyledTableCellProduct = styled(TableCell)(() => ({
		backgroundColor: '#E6EEF6',
		border: 'none',
}))

const StyledTableCell = styled(TableCell)(() => ({
	border: 'none',
}))


const CalculationTable = ({ project }) => {
	const theme = useTheme()
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const [objArr, setObjArr] = useState([])
	const [reducedResult, setReducedResult] = useState([])
	
	let workingHours;
	let work = []
	let products = []
	let items = []
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


	useEffect(() => {
		setLoading(true)

		if (allProducts.length === 0) {
			console.log('allProducts are empty')
			return
		}
		findDuplicates()
		setLoading(false)

	}, [project])

	return (
		<>
			<TableContainer>
				<Table sx={{ minWidth: 300 }} size='small' aria-label="spanning table" >
					<TableHead>
						<TableRow >
							<TableCell><strong>{t(`tableHead.material`, 'Material')}</strong></TableCell>
							<TableCell align="center"><strong>{t(`tableHead.quantity`, 'Quantity')}</strong></TableCell>
							<TableCell align="right"><strong>{t(`tableHead.timeEstimate`, 'Time estimated')}</strong></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{project && project.projectMaterial?.map((item, i) => {
							items = [...items, item]
							products = [...products, item]

							// calculate estimated time
							const workHours = [(item.estimatedTime.hours + item.estimatedTime.minutes) * item.quantity]
							work = [...work, workHours].flat()
							work.reduce((a, b) => workingHours = a + b ,0)
							hours = Math.floor([workingHours/60])
							minutes = workingHours % 60
						
							return (
								<React.Fragment key={item.id}>
									<StyledTableRows key={i.id} >
										<StyledTableCellProduct>{item.product}</StyledTableCellProduct>
										<StyledTableCellProduct align='center' >{item.quantity} st </StyledTableCellProduct>
										<StyledTableCellProduct align='right'>{workHours} min</StyledTableCellProduct>
									</StyledTableRows>

									{item.extraItems.map((items) => {
										allProducts = [
											...allProducts, {
												product: item.product, 
												item: items.fittings, 
												value: items.quantity * item.quantity, 
												unit: items.unit
											}
										]

										return (
											<StyledTableRows key={items.id}>
												<StyledTableCell id='table-margin-left' > - {items.fittings}</StyledTableCell>
												<StyledTableCell align='center' >{items.quantity * item.quantity} {items.unit}</StyledTableCell>
											</StyledTableRows >
										)
									})}
								</React.Fragment>
							)
						})}
					</TableBody>

					{/**
					 *	Reduced list of items 
						*/}

					<TableBody>
						<TableRow  sx={{ borderTop: '1px solid #848484cf', borderBottom: '1px solid #848484cf' }} >
							<StyledTableCell align='left'><strong>{t(`other.workHours`, 'Working hours')}</strong></StyledTableCell>			
							<StyledTableCell />			
							<StyledTableCell align="right">
								{hours + t(` other.hours`, 'h')} 
									{' '}
								{minutes + t(`other.minutes`, 'min')}
							</StyledTableCell>				

						</TableRow>

						{products?.sort((a,b) => a.product > b.product ? 1 : -1).map((item) => (
							<StyledTableRows key={item.id} sx={{ fontWeight: '700'}}>
								<StyledTableCell sx={{ display: {xs: 'none', md:'table-cell'} }} />
								<StyledTableCell align='left' sx={{ fontWeight: '700' }}>{item.product}</StyledTableCell>
								<StyledTableCell sx={{ display: {xs: 'table-cell', md:'none'} }} />
								<StyledTableCell align='right' sx={{ fontWeight: '700' }}>{item.quantity} st</StyledTableCell>
							</StyledTableRows>
						))}
		
						{!loading && reducedResult?.sort((a,b) => a.item > b.item ? 1 : -1).map((i) => (
							<StyledTableRows key={i.item} >
								<StyledTableCell sx={{ display: {xs: 'none', md:'table-cell'} }} />
								<StyledTableCell align='left'>{i.item}</StyledTableCell>
								<StyledTableCell sx={{ display: {xs: 'table-cell', md:'none'} }} />
								<StyledTableCell align='right'>{i.value} {i.unit}</StyledTableCell>
							</StyledTableRows> 
						))} 
					</TableBody>
				</Table>
			</TableContainer>
		</>
  	)	
}

export default CalculationTable
