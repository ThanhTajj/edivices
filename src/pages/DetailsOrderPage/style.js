import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 16px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address-info,.phone-info,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-top: 8px;
  }
  .status-payment {
    margin-top: 8px;
    font-size: 14px;
    color: rgba(0, 234, 62, 1); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 5px;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 295px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  font-size: 14px;
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  font-size: 14px;
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  font-size: 16px;
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1134px
`