import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";

const UserSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        marginTop: "10px",
        borderRadius: "10px",
        background: "rgb(30, 29, 29)",
      }}
    >
      <CardHeader
        avatar={
          <Skeleton variant="circular" width={40} height={40} sx={{backgroundColor:"white"}}/>
        }
        action={
          <Box
            sx={{
              height: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <Skeleton
              sx={{backgroundColor:"white"}}
              width={100}
              height={50}
            />
          </Box>
        }
        title={
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Skeleton height={20} width="10%" sx={{backgroundColor:"white",marginBottom:"6"}} />
            <Skeleton
              height={20}
              width="10%"
              sx={{backgroundColor:"white",marginBottom:"6"}} 
            />
          </Box>
        }
        subheader={<Skeleton sx={{backgroundColor:"white"}} height={15} width="15%" />}
      />
      <CardContent>
        <Typography variant="body2" color="white" padding="10px">
          <Skeleton
            sx={{backgroundColor:"white"}}
            height={20}
            style={{ marginBottom: 6 }}
          />
          <Skeleton height={20} width="80%" sx={{backgroundColor:"white"}} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserSkeleton;