import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperSection = styled.div`
    margin-top: 30px;
    background-color: #fff;
    border-radius: 4px;
`

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    background-color: #0057D9;
    padding: 10px 20px;
    border-radius: 20px;
    height: 50px;
`

export const SectionTitle = styled.div`
    background-color: #ffc400;
    color: #000;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 16px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

export const SectionFilters = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    flex: 1;
    justify-content: space-between;
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
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #0057D9;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #0057D9;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`