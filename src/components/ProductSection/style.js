import styled from "styled-components";

export const WrapperSection = styled.div`
    margin-top: 30px;
    background-color: #fff;
    border-radius: 4px;
`

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    background-color: #0057D9; /* Blue background */
    padding: 10px 20px;
    border-radius: 20px; /* Rounded corners for the whole bar */
    height: 50px;
`

export const SectionTitle = styled.div`
    background-color: #ffc400; /* Yellow background */
    color: #000;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 20px; /* Pill shape */
    font-size: 16px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px; /* Small logical gap from title */
`

export const SectionFilters = styled.div`
    display: flex;
    gap: 20px; /* Keep gap as minimum spacing */
    align-items: center;
    flex: 1; /* Take up remaining space */
    justify-content: space-between; /* Spread items across the space */
`

export const FilterItem = styled.span`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
        text-decoration: underline;
    }
`

export const SectionBody = styled.div`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px 0;
`
