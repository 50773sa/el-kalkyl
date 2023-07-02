import Heading from "../headers/Heading"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const ContentWrapper = ({ h1, children }) => {
    return (
        <Grid>
            <Heading h1={h1} />

            <Grid mx={4}>
                {children}
            </Grid>

        </Grid>
    )
}

export default ContentWrapper