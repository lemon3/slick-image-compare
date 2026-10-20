import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, beforeEach, test, describe, vi } from 'vitest';
import { ImageCompare } from '.';
import SlickImageCompare from 'slick-image-compare';

// Mock SlickImageCompare class using Vitest
const { mockSlickInstance } = vi.hoisted(() => ({
  mockSlickInstance: {
    animateTo: vi.fn(),
    addEventListener: vi.fn(),
    destroy: vi.fn(),
    init: vi.fn(),
  },
}));

vi.mock('slick-image-compare', () => ({
  default: vi.fn().mockImplementation(function () {
    return mockSlickInstance;
  }),
}));

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
    // const mockSlickInstance = {
    //   animateTo: vi.fn(),
    //   addEventListener: vi.fn(),
    //   destroy: vi.fn(),
    //   init: vi.fn(),
    // };
    // const sic = new SlickImageCompare();
    // vi.spyOn(sic, 'animateTo').mockImplementation(
    //   () => {}
    // );

    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };

    render(
      <ImageCompare
        options={options}
        mounted={mockInit}
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

  test('should call onUpdate when update DOM event is triggered', async () => {
    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };

    render(
      <ImageCompare
        mounted={mockInit}
        options={options}
        onUpdate={mockOnUpdate}
        onViewchange={mockOnViewChange}
        useDomEvents={true} // register DOM events
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
        mounted={mockInit}
        onUpdate={mockOnUpdate}
        onViewchange={mockOnViewChange}
        useDomEvents={true} // register DOM events
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
    const options = {
      beforeImage: '01_before.png',
      afterImage: '01_after.png',
    };
    const sic = new SlickImageCompare(document.createElement('div'), options);
    const animateToSpy = vi.spyOn(sic, 'animateTo');

    render(
      <>
        <ImageCompare
          options={options}
          mounted={mockInit}
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

    expect(animateToSpy).toHaveBeenCalledWith(10);
    expect(animateToSpy).toHaveBeenCalledWith(90);

    expect(animateToSpy).toHaveBeenLastCalledWith(90);
    expect(animateToSpy).toHaveBeenCalledTimes(2);
  });
});
