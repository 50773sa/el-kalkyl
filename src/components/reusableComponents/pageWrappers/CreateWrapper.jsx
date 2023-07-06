import Heading from "../headings/Heading"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const CreateWrapper = ({ h1, children }) => {
    return (
        <Grid>
            <Heading h1={h1} />

            <Grid mx={2}>
                {children}
            </Grid>

        </Grid>
    )
}

export default CreateWrapper