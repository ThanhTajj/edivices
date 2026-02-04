import styled from "styled-components";

export const WrapperType = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  background-color: #f5f5fa;
  border-radius: 30px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 13px;
  margin-top: 10px;
  &:hover {
    background-color: var(--primary-color);
    color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`