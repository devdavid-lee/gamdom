import * as S from './Header.styles';

export const Header = () => {
  return (
    <S.Header data-testid="header">
      <S.HeaderContent data-testid="header-content">
        <S.LogoNav to="/" data-testid="logo-nav">
          <S.Logo data-testid="logo">Gamdom</S.Logo>
        </S.LogoNav>
        <S.Nav data-testid="nav">
          <S.NavLink to="/" data-testid="nav-link-home">Home</S.NavLink>
          <S.NavLink to="/events" data-testid="nav-link-events">Events</S.NavLink>
        </S.Nav>
      </S.HeaderContent>
    </S.Header>
  );
}; 