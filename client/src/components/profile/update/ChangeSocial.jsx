import PropTypes from "prop-types";
import {
  FilledInput,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { CardActions } from "@mui/material";

const ChangeSocial = ({ formData, handleInputChance }) => {
  const isPhone = useMediaQuery("(max-width: 600px)");
  return (
    <CardActions
      sx={{
        width: isPhone ? "100%" : "90%",
        maxWidth: isPhone ? "500px" : "800",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem 5rem",
        justifyContent: "center",
      }}
    >
      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          <EmailIcon fontSize="small" />
          Email
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.email}
          type="email"
          onChange={handleInputChance}
          placeholder="example@mail.com"
          name="email"
        />
      </FormControl>

      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          <LanguageIcon fontSize="small" />
          Website
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.website}
          onChange={handleInputChance}
          placeholder="https://softwareistanbul.com.tr"
          name="website"
        />
      </FormControl>

      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          <GitHubIcon fontSize="small" />
          github
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.github}
          onChange={handleInputChance}
          placeholder="https://github.com/"
          name="github"
        />
      </FormControl>

      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          {" "}
          <LinkedInIcon fontSize="small" />
          LinkedIn
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.linkedin}
          onChange={handleInputChance}
          placeholder="https://linkedin.com/"
          placeholderTextColor="gray"
          name="linkedin"
        />
      </FormControl>

      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          {" "}
          <YouTubeIcon fontSize="small" />
          Youtube
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.youtube}
          onChange={handleInputChance}
          placeholder="https://youtube.com/"
          placeholderTextColor="gray"
          name="youtube"
        />
      </FormControl>

      <FormControl variant="filled" sx={{ width: isPhone ? "80%" : "40%" }}>
        <InputLabel sx={{ background: "none" }}>
          <XIcon fontSize="small" />
          Twitter
        </InputLabel>
        <FilledInput
          sx={{ background: "none" }}
          value={formData?.twitter}
          onChange={handleInputChance}
          placeholder="https://x.com/"
          placeholderTextColor="gray"
          name="twitter"
        />
      </FormControl>
    </CardActions>
  );
};

export default ChangeSocial;
ChangeSocial.propTypes = {
  formData: PropTypes.object,
  handleInputChance: PropTypes.func,
};
