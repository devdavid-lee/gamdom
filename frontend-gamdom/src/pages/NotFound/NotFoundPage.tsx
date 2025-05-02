import * as S from './NotFoundPage.styles';

export const NotFoundPage = () => {
  return (
    <S.Container>
      <S.ErrorCode>404</S.ErrorCode>
      <S.Title>Page Not Found</S.Title>
      <S.Description>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </S.Description>
      <S.HomeLink to="/">Return to Home</S.HomeLink>
    </S.Container>
  );
}; 