import styled from "styled-components";

export const WrapperType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 120px;
  height: 120px;
  background-color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #f1f5f9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: #e2e8f0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
    transform: translateY(-2px);
  }
`

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.color || '#f1f5f9'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0f172a;
  transition: all 0.3s;
  
  ${WrapperType}:hover & {
    transform: scale(1.05);
  }
`

export const TypeName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  text-align: center;
`