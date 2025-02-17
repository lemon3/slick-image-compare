import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, beforeEach, test, describe, vi } from 'vitest';
import { ImageCompare } from '.';
// import { ImageCompare } from './components/ImageCompare';
import SlickImageCompare from 'slick-image-compare';

// Mock SlickImageCompare class using Vitest
vi.mock('slick-image-compare');

describe('ImageCompare Component', () => {
  const mockInit = vi.fn();
  const mockOnUpdate = vi.fn();
  const mockOnViewChange = vi.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    mockInit.mockClear();
    mockOnUpdate.mockClear();
    mockOnViewChange.mockClear();
  });

  test('should render ImageCompare and initialize SlickImageCompare', async () => {
    // Mock SlickImageCompare constructor
    const mockSlickInstance = {
      animateTo: vi.fn(),
      addEventListener: vi.fn(),
      destroy: vi.fn(),
      init: vi.fn(),
    };
    (SlickImageCompare as vi.Mock).mockImplementation(() => mockSlickInstance);

    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };

    render(
      <ImageCompare
        options={options}
        init={mockInit}
        onUpdate={mockOnUpdate}
        onViewchange={mockOnViewChange}
      />
    );

    // Assert that the component renders without crashing
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    // Check that init is called when component mounts
    await waitFor(() => {
      expect(mockInit).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onUpdate when update event is triggered', async () => {
    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };

    render(
      <ImageCompare
        options={options}
        init={mockInit}
        onUpdate={mockOnUpdate}
        onViewchange={mockOnViewChange}
      />
    );

    // Trigger the onUpdate event manually
    const customEvent = new CustomEvent('update', {
      detail: { percent: 50 },
    });

    // Assuming that the component triggers the event via the DOM, you can do:
    fireEvent(screen.getByRole('presentation'), customEvent);

    // Assert that onUpdate was called with correct data
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(customEvent);
    });
  });

  test('should call onViewchange when viewchange event is triggered', () => {
    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };

    render(
      <ImageCompare
        options={options}
        init={mockInit}
        onUpdate={mockOnUpdate}
        onViewchange={mockOnViewChange}
      />
    );

    // Trigger the onViewchange event manually
    const customEvent = new CustomEvent('viewchange', {
      detail: { afterShown: true },
    });

    fireEvent(screen.getByRole('presentation'), customEvent);

    // Assert that onViewchange was called
    expect(mockOnViewChange).toHaveBeenCalledWith(customEvent);
  });

  test('should call animateTo when button is clicked', () => {
    const mockSlickInstance = { animateTo: vi.fn() };
    (SlickImageCompare as vi.Mock).mockImplementation(() => mockSlickInstance);

    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };
    const sic = new SlickImageCompare(document.createElement('div'), options);

    render(
      <>
        <ImageCompare
          options={options}
          init={mockInit}
          onUpdate={mockOnUpdate}
          onViewchange={mockOnViewChange}
        />
        <button
          data-testid='click1'
          onClick={() => sic?.animateTo(10)}
        ></button>
        <button
          data-testid='click2'
          onClick={() => sic?.animateTo(90)}
        ></button>
      </>
    );

    fireEvent.click(screen.getByTestId('click1'));
    fireEvent.click(screen.getByTestId('click2'));

    expect(mockSlickInstance.animateTo).toHaveBeenCalledWith(10);
    expect(mockSlickInstance.animateTo).toHaveBeenCalledWith(90);

    expect(mockSlickInstance.animateTo).toHaveBeenLastCalledWith(90);
    expect(mockSlickInstance.animateTo).toHaveBeenCalledTimes(2);
  });
});
