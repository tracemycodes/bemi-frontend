import ProductCard from "./ProductCard";
import styled from "styled-components";

const Title = styled.div`
  width: max-content;
  margin: 1rem auto 2.5rem;
  position: relative;
  &:before {
    content: " ";
    position: absolute;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.3rem;
    border: 1px solid grey;
  }
  `;
  const Section = styled.section`
  max-width: 80rem;
  width: 100%;
  padding: unset;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  & > * {
    width: 22%;
  }
  @media (max-width: 600px) {
    width: 80%;
    & > * {
      width: 45%;
    }
  }
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const Category = () => {
  return (
    <section className="my-12 px-6">
      <Title className="text-sm">SHOP BY CATEGORY</Title>
      <Section>
        <ProductCard
          imgsrc="https://cdn.shopify.com/s/files/1/0603/0180/3753/collections/6W1JJ2410800F20_l_1_77c47027-1ee3-413b-aa12-45811c4545e2_360x.jpg?v=1661399604"
          text="Jeans"
        />
        <ProductCard
          imgsrc="https://cdn.shopify.com/s/files/1/0603/0180/3753/collections/Sweaters_Sweatshirts_720x.jpg?v=1661399240"
          text="Sweaters & sweat-shirts"
        />
        <ProductCard
          imgsrc="https://cdn.shopify.com/s/files/1/0603/0180/3753/collections/Dresses_540x.jpg?v=1661399280"
          text="Dresses"
        />
        <ProductCard
          imgsrc="https://cdn.shopify.com/s/files/1/0603/0180/3753/collections/Jackets_Outerwears_540x.jpg?v=1661399310"
          text="Jeans"
        />
      </Section>
    </section>
  );
};

export default Category;
