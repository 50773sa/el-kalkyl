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
					<Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem'} }}>
						{title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', md: '1.2rem'} }} >
            			{subtitle}{' '}
          			</Typography>
				</CardContent>
			</Box>
			<Box sx={{ display: 'flex', alignItems: { xs: 'start', lg: 'center'}, p: 1 }}>
				{cardIcon}
			</Box>
      </Card>
  	)
}
export default Cards