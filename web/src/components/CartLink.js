import { styled } from "linaria/react";
import React from "react";

const colors = {
  orange: {
    fill: "#f99d1c",
  },
  default: {
    fill: "#fff",
  },
};

const CartLink = ({ link, text, variant }) => {
  const fill = variant ? colors[variant].fill : "#fff";

  return (
    <Container
      className={`Header__summary snipcart-summary snipcart-checkout`}
    >
      <CartTop>
        <Icon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"          
        >
          <path
            fill={fill}
            d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
          />
        </Icon>

        <TotalItems className={`snipcart-total-items ${variant}`} />
      </CartTop>
    </Container>
  );
};

const Container = styled.div`
  padding: 4px;
`;

const CartTop = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
`;
const TotalItems = styled.span`
  color: #fff;
  display: inline-block;
  font-size: 0.8em;
  font-weight: bold;
  height: 18px;
  margin-right: 4px;
  text-align: center;
  &.orange {
    color: #c17d3d;
  }
`;

const Icon = styled.svg`
  height: auto;
  padding: 4px;
  width: 30px;
`;

export default CartLink;
