import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";

const ProjectSkeleton = () => {
  return (
  <Box>
     <Card
        width="70%"
        height="200px"
        sx={{
          maxWidth: "100%",
          marginTop: "10px",
          background: "rgb(30, 29, 29)",
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={60} height={60} sx={{backgroundColor:"white"}}/>}
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
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
            </Box>
          }
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
        <CardActions
          disableSpacing
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box marginLeft={3}>
            <Skeleton
              height={30}
              width={50}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={40}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={70}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
          </Box>
          <Skeleton
           
            height={30}
            width={30}
            sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
          />
        </CardActions>
      </Card>

      <Card
        width="100%"
        height="200px"
        sx={{
          maxWidth: "100%",
          marginTop: "10px",
          background: "rgb(30, 29, 29)",
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={50} height={50} sx={{backgroundColor:"white"}}/>}
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
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
            </Box>
          }
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
        <CardActions
          disableSpacing
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box marginLeft={3}>
            <Skeleton
              height={30}
              width={50}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={40}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={70}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
          </Box>
          <Skeleton
           
            height={30}
            width={30}
            sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
          />
        </CardActions>
      </Card>
      
      <Card
        width="100%"
        height="200px"
        sx={{
          maxWidth: "100%",
          marginTop: "10px",
          background: "rgb(30, 29, 29)",
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={50} height={50} sx={{backgroundColor:"white"}}/>}
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
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
              <Skeleton
                sx={{backgroundColor:"white"}}
                variant="circular"
                width={10}
                height={10}
              />
            </Box>
          }
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
        <CardActions
          disableSpacing
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box marginLeft={3}>
            <Skeleton
              height={30}
              width={50}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={40}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
            <Skeleton
             
              height={30}
              width={70}
              sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
            />
          </Box>
          <Skeleton
           
            height={30}
            width={30}
            sx={{ display: "inline-block", marginRight: "10px",backgroundColor:"white" }}
          />
        </CardActions>
      </Card>
  </Box>
     
  );
};

export default ProjectSkeleton;
