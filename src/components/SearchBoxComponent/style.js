import styled from 'styled-components'

export const SearchBoxWrapper = styled.div`
  position: absolute;
  top: 42px;
  width: 100%;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  max-height: 350px;
  overflow-y: auto;
`

export const SearchItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`
