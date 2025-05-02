import * as S from './Footer.styles';

export const Footer = () => {
  return (
    <S.Footer>
      <S.FooterContent>
        <S.FooterText>&copy; {new Date().getFullYear()} Gamdom. All rights reserved.</S.FooterText>
        <S.FooterLinks>
          <S.FooterLink to="/terms">Terms</S.FooterLink>
          <S.FooterLink to="/privacy">Privacy</S.FooterLink>
          <S.FooterLink to="/contact">Contact</S.FooterLink>
        </S.FooterLinks>
      </S.FooterContent>
    </S.Footer>
  );
}; 