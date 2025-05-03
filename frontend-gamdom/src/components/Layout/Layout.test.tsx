import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import { Layout } from './Layout';

jest.mock('./Header/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('./Footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe('Layout Component', () => {
  it('renders layout with correct structure', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('layout-container')).toBeInTheDocument();
  });

  it('renders header component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders footer component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders children in main content area', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders all elements in correct hierarchy', () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const layoutContainer = container.querySelector('[data-testid="layout-container"]');
    const main = layoutContainer?.querySelector('main');
    const header = layoutContainer?.querySelector('[data-testid="header"]');
    const footer = layoutContainer?.querySelector('[data-testid="footer"]');

    expect(layoutContainer).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    const children = Array.from(layoutContainer?.children || []);
    expect(children[0]).toBe(header);
    expect(children[1]).toBe(main);
    expect(children[2]).toBe(footer);
  });
}); 