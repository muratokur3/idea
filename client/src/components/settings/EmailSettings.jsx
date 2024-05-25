import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FilledInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";
import { useState } from "react";

const EmailSettings = () => {
  const userEmail = useSelector(
    (state) => state.session && state.session?.user?.email
  );
  const [expanded, setExpanded] = useState(false);
  // newEmail diye state oluşturur
  const [newEmail, setNewEmail] = useState("");
  const [activateCode, setActivateCode] = useState("");
  const [sendCode, setSendCode] = useState(false);

  const handleSendCode = async () => {
    setSendCode(true);
    // send code to email
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded(!expanded)}
        aria-controls="Şifre Değiştirme"
        id="panel3-header"
      >
     Mail değiştirme
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          paddingLeft: "10%",
        }}
      >
        <FormControl disabled>
          <InputLabel>{userEmail}</InputLabel>
          <FilledInput
            type="email"
            sx={{ background: "none", width: "100%" }}
          />
        </FormControl>

        <FormControl>
          <InputLabel>Yeni E-posta Adresiniz</InputLabel>
          <FilledInput
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            sx={{ background: "none", width: "100%" }}
          />
        </FormControl>
        {newEmail.length > 0 && (
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={handleSendCode}
            disabled={sendCode}
          >
            {sendCode && "Tekrar"} Doğrulama kodu gönder
          </Button>
        )}
        {sendCode && (
          <Box
            sx={{
              display: "flex",
              // flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10%",
              width: "100%",
            }}
          >
            <FormControl sx={{ display: "flex" }}>
              <InputLabel>Doğrulama kodu</InputLabel>
              <FilledInput
                onChange={(e) => setActivateCode(e.target.value)}
                type="text"
                sx={{ background: "none", fontSize: "1.5rem" }}
              />
            </FormControl>

            {activateCode.length > 0 && (
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={handleSendCode}
              >
                Doğrula
              </Button>
            )}
          </Box>
        )}
      </AccordionDetails>
      <AccordionActions>
        <Button
          onClick={() => {
            setExpanded(false);
            setNewEmail("");
            setActivateCode("");
            setSendCode(false);
          }}
        >
          İptal Et
        </Button>
        <Button color="primary" onClick={handleSendCode}>
          Kaydet
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default EmailSettings;
