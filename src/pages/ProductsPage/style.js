import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 1310px;
    margin: 0 auto;
    padding: 40px 0;
`

export const PageHeader = styled.div`
    margin-bottom: 32px;
`

export const PageTitle = styled.h1`
    font-size: 32px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 8px 0;
`

export const PageSubtitle = styled.p`
    font-size: 15px;
    color: #64748b;
    margin: 0;
`

export const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`

export const SearchInputWrapper = styled.div`
    width: 300px;
`

export const FilterPills = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 32px;
`

export const Pill = styled.div`
    padding: 8px 20px;
    background: ${props => props.active ? '#3b82f6' : '#ffffff'};
    color: ${props => props.active ? '#ffffff' : '#64748b'};
    border: 1px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #3b82f6;
        color: ${props => props.active ? '#ffffff' : '#3b82f6'};
    }
`

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
`
