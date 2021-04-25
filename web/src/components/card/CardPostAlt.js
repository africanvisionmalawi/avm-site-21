import { Link } from "gatsby";
import { styled } from "linaria/react";
// import Img from "gatsby-image";
// import { styled } from "linaria/react";
import React from "react";
import { EventDate } from "../events/EventDate";
import { PortableText } from "../portableText/portableText";
import { PhotoCont } from "./PhotoCont";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 1rem 1rem 0;
  @media (min-width: 576px) {
    padding: 1rem 3px 0;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
  a:link,
  a:visited {
    color: #246a73;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const SubHeading = styled.div`
  color: #ababad;
  display: block;
  font-size: 0.9rem;
  padding: 0 2px 8px;
`;

export const CardPostAlt = ({
  type,
  title,
  excerpt,
  slug,
  publishDate,
  photo,
  date,
  endDate,
  hideTime,
  allDay,
}) => {
  const baseFolder = type === "event" ? "events" : "news";
  const url = `/${baseFolder}/${slug}/`;

  const text =
    type === "sanity" || type === "event" ? (
      <PortableText blocks={excerpt} />
    ) : (
      <div>{excerpt}</div>
    );

  return (
    <Card>
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
        <Content>
          {title ? (
            <Heading>{slug ? <Link to={url}>{title}</Link> : title}</Heading>
          ) : null}
          {date ? (
            <EventDate
              date={date}
              endDate={endDate ? endDate : null}
              hideTime={hideTime ? hideTime : false}
              allDay={allDay ? allDay : false}
            />
          ) : null}
          {publishDate ? <SubHeading>{publishDate}</SubHeading> : null}
          {excerpt ? text : null}
          {/* TODO: add hideLink here */}
        </Content>
      </div>
    </Card>
  );
};
