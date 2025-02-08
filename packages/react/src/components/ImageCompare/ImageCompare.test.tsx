import { cleanup, render } from '@testing-library/react';
import { expect, afterEach, test, describe, it, vi } from 'vitest';
import { ImageCompare } from '.';

describe('MyButton test:', () => {
  afterEach(cleanup);

  it('should render component', () => {
    render(<ImageCompare />);
  });

  it('should render', async () => {
    const mockFn = vi.fn();
    render(
      <ImageCompare
        data-testid='image-compare'
        init={mockFn}
      />
    );
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test('async callback', async () => {
    const myMockFn = vi.fn(() => ({ error: false }));

    render(
      <ImageCompare
        data-testid='image-compare'
        init={myMockFn}
      />
    );

    const result = await myMockFn();
    expect(result).toBeTypeOf('object');
    expect(result.error).toBe(false);
    expect(myMockFn).toHaveBeenCalledTimes(1);
  });
});
