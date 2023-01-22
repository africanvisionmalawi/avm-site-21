import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { ImFilePdf } from "react-icons/im";

const Container = styled.a`
  align-items: center;
  border: 1px dashed #f99d1c;
  display: flex;
  margin: 1rem auto;
  padding: 2rem;
  width: 80%;
  svg {
    height: 80px;
    margin-right: 1rem;
  }
`;

const Heading = styled.h4`
  margin-bottom: 0;
`;

const Text = styled.p`
  font-style: italic;
  margin-bottom: 0;
`;

export default ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  return (
    <Container href={node.asset.url}>
      <IconContext.Provider value={{ size: "3rem" }}>
        <ImFilePdf />
      </IconContext.Provider>
      <div>
        {node.description ? <Heading>{node.description}</Heading> : null}
        <Text>{node.asset.originalFilename}</Text>
      </div>
    </Container>
  );
};
