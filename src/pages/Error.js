import Header from "../components/Header/Header";
import poPasContent from "../assets/img/poPasContent.png";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
const Error = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            height: "auto",
            padding: "15px",
            textAlign: "center",
          }}
          elevation="15"
        >
          <Typography variant="h6">Vous vous êtes égaré !</Typography>
          <br />
          <Typography variant="h5">
            {" "}
            Ceci est une erreur 404, notre PO n'est pas content et vous remercie
            de rebrousser chemin il n'a pas finis de tester son scanner
            d'ISBN...
          </Typography>
          <br />
          <Box component="img" src={poPasContent} width="50vw" />
        </Paper>
      </Box>
    </>
  );
};

export default Error;
