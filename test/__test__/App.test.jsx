import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../src/App.jsx';

describe('Renderização do App', () => {
  it('Deve renderizar a tela de Login por padrão', async () => {
    render(<App />);
    
    const botaoLogin = await screen.findByText(/Entrar/i); 
    expect(botaoLogin).toBeInTheDocument();
  });
});