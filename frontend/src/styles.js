import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  margin: 10px;
  background: #0a84ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;
