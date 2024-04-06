

// import { Grid, Typography, TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";

// const InputBar = ({ placeholder, onChange, onSubmit }) => {
//   return (
//     <Grid container spacing={1} alignItems="left" style={{ width: "200%" }}>
//       <Grid item alignItems = "left" style={{ width: "100%" }}>
//         <TextField
//           label={placeholder}
//           variant="outlined"
//           fullWidth
//           onChange={onChange}
//           sx={{ backgroundColor: "##D3D3D3" }}
//         />
//       </Grid>
//       <Grid item alignItems = "left" style={{ width: "100%" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<SendIcon style={{ color: "##eeeeee" }}  />}
//           onClick={onSubmit}
//         >
//           Send
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default InputBar;

import { Grid, Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const InputBar = ({ placeholder, onChange, onSubmit }) => {
  return (
    <Grid container spacing={1} alignItems="center" style={{ paddingLeft: "0px" , width: "213%" }}>
      <Grid item style={{ width: "100%" }}>
        <TextField
          label={placeholder}
          variant="outlined"
          fullWidth
          onChange={onChange}
          sx={{ backgroundColor: "#f0f0f0" }} // Set background color here
          style={{ marginLeft: 0 }} // Set left margin to 0 to start at the very left
        />
      </Grid>
      <Grid item alignItems = "center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={onSubmit}
          sx={{ fontSize: "1rem", padding: "12px 24px" }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default InputBar;

