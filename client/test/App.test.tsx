import { render, screen } from '@testing-library/react';
import { AppRouter } from '@/router/AppRouter';

describe('App Component', () => {
  it('debería renderizar correctamente', () => {
    render(<AppRouter />);
    expect(screen.getByText(/RoomLock Frontend/i)).toBeVisible();
  });
});