import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
const UserInfo = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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
            <Typography variant="h5">John Doe</Typography>
            <Typography variant="body3">Responsible IT Factory</Typography>
            <Typography variant="body2">01.01.1990</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">İstanbul</Typography>
            <Typography variant="body2">Arçelik Global</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">University of Helsinki</Typography>
            <Typography variant="body2">Computer Science</Typography>
          </Grid>
          <Grid xs={4}>
            <GitHubIcon />
            <Typography>github.com/muratokur3</Typography>
          </Grid>
          <Grid xs={4}>
            <LinkedInIcon />
            <Typography>linkedin/in/muratokur3</Typography>
          </Grid>
          <Grid xs={4}>
            <YouTubeIcon />
            <Typography>youtube.com.tr/muratokur</Typography>
          </Grid>
          <Grid xs={4}>
            <LanguageIcon />
            <Typography>muratokur.com.tr</Typography>
          </Grid>
          <Grid xs={4}>
            <XIcon />
            <Typography>twitter.com/muratokur3</Typography>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserInfo;
