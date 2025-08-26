import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import '@testing-library/jest-dom';

test('Renders modal', () => {
  render(
    <Modal isOpen={true} handleClose={() => {}}>
      <p>Modal</p>
    </Modal>
  );
  expect(screen.getByText('Modal')).toBeInTheDocument();
});

test('Calls handleClose on X click', async () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen={true} handleClose={handleClose}>
      <p>Modal</p>
    </Modal>
  );
  await userEvent.click(screen.getByTestId('close-button'));
  expect(handleClose).toHaveBeenCalled();
});

test('Calls handleClose on Escape key', async () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen={true} handleClose={handleClose}>
      <p>Modal</p>
    </Modal>
  );
  await userEvent.keyboard('{Escape}');
  expect(handleClose).toHaveBeenCalled();
});
