import Heading from "../headings/Heading1"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const CreateWrapper = ({ h1, icon, isEditBtn, onclick, buttonText, children }) => {
    return (
        <Grid>
            <Heading 
                h1={h1} 
                icon={icon} 
                isEditBtn={isEditBtn} 
                onclick={onclick} 
                buttonText={buttonText}
            />

            <Grid mx={2}>
                {children}
            </Grid>
        </Grid>
    )
}

export default CreateWrapper