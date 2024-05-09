import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import IosShareIcon from "@mui/icons-material/IosShare";

const ShareAction = ({ post }) => {
  const webSiteUrl = import.meta.env.VITE_WEBSITE_BASE_URL;
  return (
    <IconButton
      aria-label="share"
      onClick={async () => {
        if (navigator.share) {
          navigator
            .share({
              title: "Şahane fikir", // İsteğe bağlı
              text: "idea sitesinde çok güzel bir fikir buldum", // İsteğe bağlı
              url: `${webSiteUrl}/explore/post/${post.username}/${post._id}`, // İsteğe bağlı
            })
            .catch((error) => console.log("Paylaşım hatası", error));
        } else {
          // navigator.share API'si desteklenmiyor
          console.log("Paylaşım API'si desteklenmiyor");
        }
      }}
    >
      <IosShareIcon />
    </IconButton>
  );
};

export default ShareAction;
ShareAction.propTypes = {
  post: PropTypes.object.isRequired,
};
