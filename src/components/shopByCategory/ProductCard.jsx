// import styled from "styled-components"
import ImageScale from "../shared/imageScale/ImageScale"
// console.log('object');


const ProductCard = ({text, imgsrc}) => {
  return (
    <section className="mb-8 p-0">
     <ImageScale imgsrc={''} height='clamp(245px, 30vw, 450px)' />
     <p style={{textAlign:'center', marginTop:'0.5rem'}} className='text-xs'>{text}</p>
    </section>
  )
}

export default ProductCard