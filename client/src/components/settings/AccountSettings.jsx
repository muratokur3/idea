import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useState } from "react";
import axios from "../../../axiosConfig";
import { sessionService } from "redux-react-session";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );
  const loginedUserId = useSelector(
    (state) => state.session && state.session.user._id
  );
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    if (value !== "" && isLoggedIn) {
     if(window.confirm(`hesabınızın ${value==="delete"?"silme":"dondurma"} işlemi gerçekleşecek ve oturumunuz sonlandırılacak. Devam etmek istiyor musunuz?`))
     { const response =await axios.put(`users/account/${value}/${loginedUserId}`);
      if (response.status === 200) {
        sessionService.invalidateSession();
        window.localStorage.clear();
        alert(`hesabınızın ${value==="delete"?"silme":"dondurma"} işlemi başarılı!`);
        window.location.href = "/";
      }}
    } else {
      alert("Lütfen bir seçenek seçin");
      return;
    }
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded(!expanded)}
        aria-controls="Hesap Ayarları"
        id="panel3-header"
      >
        Hesap Ayarları
      </AccordionSummary>
      <AccordionDetails>
        {/* hesabı dondurmak veya silmek için radio butonlar */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "0rem 3rem 0rem 1rem ",
          }}
        >
          <Box>
            <input
              type="radio"
              id="freeze"
              name="acccount"
              value="freeze"
              onChange={handleChange}
            />
            <label htmlFor="freeze" style={{ padding: "1rem" }}>
              <b>Hesabı Dondur</b> (Dilediğiniz zaman geri dönebilirsiniz)
            </label>
          </Box>
          <Box>
            <input
              type="radio"
              id="delete"
              name="acccount"
              value="delete"
              onChange={handleChange}
            />
            <label htmlFor="delete" style={{ padding: "1rem" }}>
              <b>Hesabı Sil</b> (Geri kurtarılamaz tüm verileriniz silinir)
            </label>
          </Box>
        </form>
      </AccordionDetails>
      <AccordionActions>
        <Button
          onClick={() => {
            setExpanded(false);
            setValue("");
          }}
        >
          İptal Et
        </Button>
        <Button onClick={onSubmit}>Kaydet</Button>
      </AccordionActions>
    </Accordion>
  );
};

export default AccountSettings;
