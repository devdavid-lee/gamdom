import * as S from './Layout.styles';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer data-testid="layout-container">
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
    </S.LayoutContainer>
  );
}; 