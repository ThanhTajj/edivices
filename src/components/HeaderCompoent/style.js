import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled.div`
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1310px;
    padding: 16px 20px;
    margin: 0 auto;
`

export const WrapperTextHeader = styled(Link)`
    font-size: 22px;
    color: #111;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    &:hover {
        color: #111;
    }
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #333;
    gap: 8px;
    cursor: pointer;
    font-weight: 500;
`

export const WrapperNavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`

export const NavLink = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.active ? '#2b6cb0' : '#666'};
    background-color: ${props => props.active ? '#ebf4ff' : 'transparent'};
    padding: 8px 20px;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        color: #2b6cb0;
        background-color: #ebf4ff;
    }
`

export const WrapperRight = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    padding: 8px 12px;
    margin: 0;
    border-radius: 4px;
    &:hover {
        background-color: #f5f5f5;
        color: #2b6cb0;
    }
`