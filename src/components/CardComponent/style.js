import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 100%;
    max-width: 280px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }

    .ant-card-body {
        padding: 20px;
    }

    .ant-card-cover {
        position: relative;
        img {
            height: 240px;
            object-fit: cover;
            width: 100%;
        }
    }
`

export const BadgeTopLeft = styled.div`
    position: absolute;
    top: 12px;
    left: 12px;
    background: #ef4444;
    color: white;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 12px;
    z-index: 10;
`

export const BadgeTopRight = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    background: #3b82f6;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 12px;
    z-index: 10;
`

export const ProductCategory = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
`

export const StyleNameProduct = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.4;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 44px;
`

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: #f59e0b;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;

    .review-count {
        color: #64748b;
        margin-left: 4px;
    }
`

export const BottomRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
`

export const PriceSection = styled.div`
    display: flex;
    flex-direction: column;
`

export const WrapperPriceText = styled.div`
    color: #0f172a;
    font-size: 18px;
    font-weight: 700;
`

export const OriginalPrice = styled.div`
    color: #94a3b8;
    font-size: 13px;
    text-decoration: line-through;
    font-weight: 500;
    margin-left: 1px;
`

export const CartButton = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #2563eb;
    }
`