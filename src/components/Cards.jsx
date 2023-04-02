import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Cards = ({ onClick, title, subtitle, cardIcon, color }) => {

    return (
      	<Card 
			onClick={onClick}
			sx={{ 
				display: 'flex', 
				justifyContent: 'space-between',
				borderBottom: `5px solid ${color}`,
				cursor: 'pointer',
				borderRadius: '10px 10px 0 0'
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="h5">
						{title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" component="div">
            			{subtitle}{' '}
          			</Typography>
				</CardContent>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center'}}>
				{cardIcon}
			</Box>
      </Card>
  	)
}
export default Cards