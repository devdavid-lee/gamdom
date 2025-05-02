import * as S from "./LoadingSpinner.styles";

export const LoadingSpinner = () => {
  return (
    <S.SpinnerContainer data-testid="spinner-container">
      <S.Spinner data-testid="spinner" />
    </S.SpinnerContainer>
  );
}; 