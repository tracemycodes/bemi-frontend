import styled from 'styled-components';

export const FormSection = styled.section`
// position: relative;
.mark-down-section {
    border-top: 2px solid black;
    padding: 1rem 0;
    margin-top: 1rem;
    
    .mark-down-btn {
        margin: 1rem 0;
        padding: .35rem .7rem;
        display: inline-block;
        cursor: pointer;
    }
}
.product-color-div {
    >*+*{
        margin-left: 1rem;
    }
    .product-shed-div {
        border-radius: 50%;
        height: 1.3rem;
        width: 1.3rem;
    }
}
.drop-zone-container {
    border-top: 2px solid black;
    margin-top: 1rem;
    .dropzone {
        border: 2px dashed #4F86BA;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 5rem;
        
        input, p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }
    aside {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
    }
}
.size-bar {
    display: flex;
    p {
        margin: 0 .6rem;
        cursor: pointer;
    }
}
.product-image-div {
    height: 7rem;
    width: 7rem;
    margin: 1rem 0;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
`
export const MdSection = styled.section`
position: fixed;
display: flex;
alignItems: center;
justify-content: center;
width: 100;
height: 100%;
background-color: rgba(0, 0, 0, 0.65);
left: 0;
right: 0;
top: 0;
z-index: 25;

.mark-down-div {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    width: 80%;
    // min-height: 28rem;
    margin: 7rem;
    
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .6rem;
        margin: 1rem 0rem;
        align-self: end;   
    }
    .save-btn {
        padding: .5rem 1rem;
        margin-right: 1rem;
        background-color: #4F86BA;
        color: #fff;
    }
    .mark-down-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 1rem;

        p {
            color: #1D3449;
            font-size: 1.3rem;
        }
    }
}
`


