import styled from "styled-components";

export const CategorySection = styled.section`
    // border: 2px solid black;
    padding: 0 1.25rem;

    .category-header {
        max-width: 80rem;
        width: 100%;
        margin: 3rem auto;
        text-align: center;

        h2 {
            font-size: 2.2rem;
            margin: .5rem 0;
        }
    }

    .category-flex {
        max-width: 80rem;
        width: 100%;
        margin 0 auto 6rem;
        display: flex;
        justify-content: space-between;
        gap: 2rem;

        .flex-one {
            width: 27%;

            > h3 {
                margin-bottom: 1rem;
            }
            .category-filter {
                border-top: .8px solid black;
                .filter-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: .7rem 0;
                }
            }
            @media (max-width: 880px) {
                display: none;
            }
        }
        .flex-two {
            width: 73%;

            @media (max-width: 880px) {
                width: 100%;

            }

            .category-sort {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: end;

                .filter-btn, .sort-btn {
                    display: none;
                    padding: .4rem 3rem;
                    font-size: 1.3rem;
                    border: 2px solid black;
                    @media (max-width: 880px) {
                        display: flex;
                        margin-bottom: 1rem;
                    }
                }
            }
            .sort-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                @media (min-width: 880px) {
                    justify-content: flex-end;
                }
            }
            .sort-div {
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                align-self: flex-end;
                position: relative;
                @media (max-width: 880px) {
                    display: none;
                }
                .sort-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }
                .sort-options {
                    position: absolute;
                    content: " ";
                    width: 14rem;
                    right: 0;
                    bottom: -18rem;
                    z-index: 1;
                    border: .8px solid black;
                    background-color: #fff;
                    padding: 1rem;
                    div {
                        display: flex;
                        flex-direction: row-reverse;
                        align-items: center;
                        justify-content: flex-end;
                        padding: 0.5rem 0;
                        gap: 0.75rem;
                    }
                }
            }
            .category-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 3rem;
                width: 100%;
                @media (max-width: 1035px) {
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;

                }
            }
        }
    }
`;
