import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperSection = styled.div`
    margin-bottom: 60px;
    background-color: transparent;
`

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const SectionTitle = styled.h2`
    color: #0f172a;
    font-weight: 800;
    font-size: 28px;
    margin: 0;
`

export const SectionSubtitle = styled.p`
    color: #64748b;
    font-size: 15px;
    margin: 0;
`

export const ViewAllLink = styled.div`
    color: #3b82f6;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #2563eb;
        text-decoration: underline;
    }
`

export const SectionBody = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 10px 0;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #3b82f6;
        border-color: #3b82f6;
        span {
            color: #fff;
        }
    }
    width: 200px;
    height: 44px;
    color: #3b82f6;
    border: 1px solid #3b82f6;
    border-radius: 22px;
    text-align: center;
    font-weight: 600;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    background: transparent;
`