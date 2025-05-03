import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 2rem;
  text-align: center;
  background-color: #f8f9fa;
`;

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #dc3545;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 600px;
`;

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`; 