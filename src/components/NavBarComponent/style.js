import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: #0057D9;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 10px;
    text-transform: uppercase;
`

export const WrapperTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        color: #0057D9;
    }
`

export const WrapperContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 12px;
`

export const WrapperTextPrice = styled.div`
    padding: 8px;
    color: rgb(56, 56, 61);
    border-radius: 10px;
    background-color: #f5f5fa;
    width: fit-content;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
        border-color: #0057D9;
        color: #0057D9;
    }
`