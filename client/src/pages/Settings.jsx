import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ChangePassword from "../components/settings/ChangePassword";

const Settings = () => {
  return (
    <Box
      sx={{
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom component="div">
        Ayarlar
      </Typography>

    
     
      <ChangePassword />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Hesap Ayarları"
          id="panel3-header"
        >
          Hesap Ayarları
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Hesap dondurma, hesap silme, hesap güncelleme gibi işlemler
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button>İptal Et</Button>
          <Button>Kaydet</Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
export default Settings;
