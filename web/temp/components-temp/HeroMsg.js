import { styled } from "linaria/react";
import React from "react";
// import PropTypes from 'prop-types';

const HeroMsg = (props) => {
  const heroMsg = props.heroMsg.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return (
    <HeroMsgDiv>
      <Content
        dangerouslySetInnerHTML={{
          __html: heroMsg,
        }}
      />
      {props.heroMsgSource && <Citation>{props.heroMsgSource}</Citation>}
    </HeroMsgDiv>
  );
};

const HeroMsgDiv = styled.div`
  margin: 3em auto;
  max-width: 650px;
`;

const Content = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  text-align: center;
`;

const Citation = styled.div`
  font-size: 0.8em;
  text-align: right;
`;

// HeroMsg.propTypes = {

// };

export default HeroMsg;
