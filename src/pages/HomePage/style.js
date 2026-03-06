import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
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
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 24px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const WrapperHero = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px;
    background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
    border-radius: 32px;
    margin-bottom: 60px;
    margin-top: 40px;
`

export const HeroContent = styled.div`
    flex: 1;
    max-width: 500px;
    text-align: left;
`

export const HeroTag = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    background: #e0f2fe;
    color: #0284c7;
    border-radius: 20px;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 24px;
`

export const HeroTitle = styled.h1`
    font-size: 64px;
    font-weight: 800;
    line-height: 1.1;
    color: #0f172a;
    margin-bottom: 24px;
    margin-top: 0;
    
    span {
        color: #3b82f6;
    }
`

export const HeroSubtitle = styled.p`
    font-size: 18px;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 40px;
`

export const HeroButtonGroup = styled.div`
    display: flex;
    gap: 16px;
`

export const StyledButton = styled.button`
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;

    &.primary {
        background: #3b82f6;
        color: white;
        border: none;
        &:hover {
            background: #2563eb;
        }
    }

    &.secondary {
        background: white;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        &:hover {
            border-color: #cbd5e1;
            background: #f8fafc;
        }
    }
`

export const WrapperFeatures = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 40px 0;
    border-bottom: 1px solid #f1f5f9;
    border-top: 1px solid #f1f5f9;
    margin-bottom: 60px;
`

export const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

export const FeatureIcon = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #eff6ff;
    color: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
`

export const FeatureText = styled.div`
    h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: #64748b;
    }
`

export const SubTitleSection = styled.h2`
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    color: #111;
`

export const DescSection = styled.p`
    font-size: 15px;
    color: #666;
    text-align: center;
    margin-bottom: 40px;
`