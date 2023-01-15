import styled from "@emotion/styled";
import { Link } from "gatsby";
import { priceFormatted } from "../../utils/helpers";
import { Photo } from "./Photo";

const PhotoCont = styled.div`
  max-height: 280px;
  max-width: 280px;
  overflow: hidden;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const Heading = styled.h2`
  margin-bottom: 0.5rem;
`;

const Container = styled.div`
  padding: 0 1rem;
`;

export const ShopListItem = (props) => {
  const productPrice = props.salePrice
    ? props.salePrice
    : props.price
    ? props.price
    : null;
  return (
    <li key={props.id}>
      <Link to={`/shop/${props.slug}/`}>
        {props.photo && (
          <PhotoCont>
            <Photo photo={props.photo} photoType={props.photoType} />
          </PhotoCont>
        )}
        <Container>
          <Heading>{props.title}</Heading>
          <span>
            {productPrice > 0 ? (
              <>
                &pound;
                {priceFormatted(productPrice)}
              </>
            ) : (
              <>Donation</>
            )}
          </span>
        </Container>
      </Link>
    </li>
  );
};
