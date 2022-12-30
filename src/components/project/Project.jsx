import React from 'react'
import Typography from '@mui/material/Typography'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Table from './CalculationTable'
import CalculationTable from './CalculationTable';

const Project = () => {
    return (
      <div className='wrapper project' id='project'>

			<Grid container spacing={2}>
				<Grid item xs={12} display='flex' alignItems="center" justifyContent="space-between" paddingBottom="2rem" paddingTop='2rem'>

					<Typography
						variant="h6" 
						component="div" 
					>
						<strong>Projektets namn</strong> 
						{/* <strong>{project.name}}</strong>  */}
					</Typography>

					<ModeEditOutlineOutlinedIcon />
				</Grid>

				{/**
				 * 	Table
				 */}

				<Grid item xs={12}>
					<CalculationTable />
				</Grid>
			</Grid>
      	</div>
    )
}

export default Project