import { updateOverlayPosition } from './dropdown-cdkportal.util';

describe('DropdownCDKPortal', () => {
  it('updateOverlayPosition should return undefined', () => {
    const val = updateOverlayPosition({
      boundClient: {
        bottom: 201.7265625,
      },

      selectOptionHeight: 300,
      windowHeight: 819,
    });

    expect(val).toEqual(undefined);
  });

  it('updateOverlayPosition should return 363.72', () => {
    const val = updateOverlayPosition({
      boundClient: {
        bottom: 701.71875,
      },

      selectOptionHeight: 300,
      windowHeight: 819,
    });

    expect(val).toEqual('363.72');
  });
});
