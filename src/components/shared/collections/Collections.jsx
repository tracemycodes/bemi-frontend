import styled from 'styled-components'
import Bemi06 from '../../../assets/productImages/Bemi06.jpg'


const Section = styled.section`
margin: 6rem auto 3rem;
max-width: 32rem;
width:70%;
text-align:center;
`
const Figure = styled.figure`
height: 540px;
margin-bottom:1.5rem;
`
const Img = styled.img`
 width:100%;
 height:100%;
  object-fit: cover;
`
const H3 = styled.h3`
text-align:center;
margin-bottom:1rem;
`
const H2 = styled.h2`
text-align:center;
margin-bottom:1.5rem;
`
const A = styled.a`
text-decoration:underline;
`

const Collections = ({collection, type, width, height}) => {
  return (
    <Section>
     <Figure>
      <Img src={Bemi06} alt='bemi'  />
     </Figure>
     <H3 className='text-sm'>FALL/WINTER COLLECTION 2022</H3>
     <H2 className='text-4xl font-bold'>NEW ARRIVAL</H2>
     <A className='text-sm' href='https://www.google.com'>SHOP NOW</A>
    </Section>
  )
}

export default Collections