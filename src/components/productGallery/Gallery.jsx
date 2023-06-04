import styled from 'styled-components'
import ImageScale from '../shared/imageScale/ImageScale'
import image09 from '../../assets/productImages/Bemi09.jpg'
import image07 from '../../assets/productImages/Bemi07.jpg'
import image06 from '../../assets/productImages/Bemi06.jpg'
import image05 from '../../assets/productImages/Bemi05.jpg'
import image04 from '../../assets/productImages/Bemi04.jpg'


const Section = styled.section`
width:100%;
margin:auto;
@media (max-width: 740px){
 overflow-x:scroll;
 grid-template-columns: repeat(6, minmax(200px, 1fr));

 ::-webkit-scrollbar {
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
   
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #000; 
  border-radius: 25px;
}
}
`
const Textdiv = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
@media(max-width: 740px){
 padding:0 1.2rem;
}
`

const Gallery = () => {
  return (
    <>
     <Section className='grid grid-cols-3 my-4'>
      <ImageScale imgsrc={image09} />      
      <ImageScale imgsrc={image04} />      
      <Textdiv>
       <p className='text-xs md:text-sm' style={{lineHeight: '2.5', textAlign:'center'}}>The best fashion influencers to <br />
          follow for sartorial inspiration.</p>
      </Textdiv>       
      <ImageScale imgsrc={image05} />      
      <ImageScale imgsrc={image06} />      
      <ImageScale imgsrc={image07} />      
     </Section>
    </>
  )
}

export default Gallery