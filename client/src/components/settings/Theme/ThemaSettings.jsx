import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
const ThemaSettings = () => {
  return (
    <Accordion sx={{ backgroundColor: "grey" }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="Tema Ayarları"
      id="panel3-header"
    >
      Tema Ayarları
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Tema rengi, tema düzeni, tema fontu gibi ayarlar
      </Typography>
    </AccordionDetails>
    <AccordionActions>
      <Button>İptal Et</Button>
      <Button>Kaydet</Button>
    </AccordionActions>
  </Accordion>

  )
}

export default ThemaSettings