import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const Figure = styled.figure`
  height: ${(props) => (props.height ? props.height : "500px")};
  overflow: hidden;
  @media (max-width: 1200px) {
    height: 360px;
  }
  @media (max-width: 980px) {
    height: 300px;
  }
  @media (max-width: 740px) {
    height: clamp(200px, 20vw, 220px);
  }
`;

const ImageScale = ({ imgsrc, height }) => {
  return (
    <>
      <Figure height={height}>
        <Image src={imgsrc} />
      </Figure>
    </>
  );
};

export default ImageScale;
