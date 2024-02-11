import { Box, Container, Grid, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from '@mui/icons-material/Pinterest';
const UserInfo = () => {
 
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box
        sx={{
          flexGrow: 1,
          background: "none",
          border: "1px dotted white",
          borderRadius: "20px",
          padding: "3%",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography variant="h5">Murat OKUR</Typography>
            <Typography variant="body3">Responsible IT Factory</Typography>
            <Typography variant="body2">01.01.1990</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">İstanbul</Typography>
            <Typography variant="body2">Arçelik Global</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">İstanbul Üniversitesi</Typography>
            <Typography variant="body2">Computer Engineer</Typography>
          </Grid>
          <Grid xs={6}>
            <GitHubIcon />
            <Typography>github.com/muratokur3</Typography>
          </Grid>
          <Grid xs={6}>
            <LinkedInIcon />
            <Typography>linkedin/in/muratokur3</Typography>
          </Grid>
          <Grid xs={6}>
            <YouTubeIcon />
            <Typography>youtube.com.tr/muratokur</Typography>
          </Grid>
          <Grid xs={6}>
            <LanguageIcon />
            <Typography>muratokur.com.tr</Typography>
          </Grid>
          <Grid xs={6}>
            <XIcon />
            <Typography>twitter.com/muratokur3</Typography>
          </Grid>
          <Grid xs={4}>
            <PinterestIcon />
            <Typography>pinterest.com/muratokur3</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserInfo;
