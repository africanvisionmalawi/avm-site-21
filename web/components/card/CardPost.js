import { Link } from "gatsby";
// import Img from "gatsby-image";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

export const CardPost = (props) => {
  const { slug, title, _rawExcerpt, photo } = props.post;
  const url = `/news/${slug.current}/`;
  // console.log("cardpost ", props);

  return (
    <div>
      {slug ? (
        <>
          <Link to={url} className="card-image">
            {photo && typeof photo === "object" ? (
              <PhotoCont photo={photo} photoType="news" />
            ) : null}
          </Link>
        </>
      ) : photo && typeof photo === "object" ? (
        <PhotoCont photo={photo} photoType="news" />
      ) : null}

      <CardContent title={title} linkText={_rawExcerpt} url={url} />
    </div>
  );
};
