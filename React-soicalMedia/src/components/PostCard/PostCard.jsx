import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

// import { UserOutlined } from "@ant-design/icons";
// import { Avatar, Space } from "antd";
import "./PostCard.css";

const PostCard = ({ elements }) => {
  let nameFirstLetter = elements.userName.split("");
  return (
    // <div className="card_div">
    //   <div className="user_info_div">
    //     <div className="user_icon">
    //       <Space wrap size={26}>
    //         <Avatar size={50} icon={nameFirstLetter[0]} />
    //       </Space>
    //     </div>
    //     <div className="name_and_date">
    //       <div className="user_fullname">{elements.userName}</div>
    //       <div className="user_psot_Date">
    //         <p>{elements.date}</p>
    //       </div>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="user_post">
    //     <h3>{elements.userPost}</h3>
    //   </div>
    //   <hr />
    //   <div className="like_btn">
    //     <div className="like_icon">
    //       <i className="fa-regular fa-heart"></i>
    //     </div>
    //     <div className="like_count">
    //       <h3>20</h3>
    //     </div>
    //   </div>
    // </div>

    <Card sx={{ maxWidth: "100" }} className="card">
      <CardHeader
        avatar={<Avatar aria-label="recipe">{nameFirstLetter[0]}</Avatar>}
        title={elements.userName}
        subheader={elements.date}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image=""
        alt=""
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {elements.userPost}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
