import { AbstractControl, FormControl } from '@angular/forms';
import { IrasDateInputValidator } from './custom-date.validator';

describe('IrasDateInputValidatorTest', () => {
  let control: AbstractControl;

  beforeEach(() => {
    control = new FormControl('dateRangePicker');
  });

  it('should ValidationErrors.startAndEndDateMustBeValid true if the input startDate and endDate is null', () => {
    control.setValue({
      startDate: undefined,
      endDate: undefined,
    });
    expect(IrasDateInputValidator.startAndEndDateMustBeValid(control)).toEqual({ startAndEndDateMustBeValid: true });
  });

  it('should ValidationErrors.startAndEndDateMustBeValid true if the input startDate is invalid', () => {
    control.setValue({
      startDate: undefined,
      endDate: '2020-02-14',
    });
    expect(IrasDateInputValidator.startAndEndDateMustBeValid(control)).toEqual({ startAndEndDateMustBeValid: true });
  });

  it('should ValidationErrors null if the both input startDate and endDate is valid', () => {
    control.setValue({
      startDate: '2020-01-14',
      endDate: '2020-02-14',
    });
    expect(IrasDateInputValidator.startAndEndDateMustBeValid(control)).toBeNull();
  });

  it('should ValidationErrors.startAndEndDateMustBeValid true if the both input startDate and endDate is invalid', () => {
    control.setValue({
      startDate: '99-99-14',
      endDate: '99-0 -14',
    });
    expect(IrasDateInputValidator.startAndEndDateMustBeValid(control)).toEqual({ startAndEndDateMustBeValid: true });
  });

  it('should ValidationErrors null if the input startDate is valid', () => {
    control = new FormControl('startDate');
    control.setValue('2020-01-14');
    expect(IrasDateInputValidator.dateMustBeValid(control)).toBeNull();
  });

  it('should ValidationErrors.dateMustBeValid true if the input startDate is invalid', () => {
    control = new FormControl('startDate');
    control.setValue('99-99-14');
    expect(IrasDateInputValidator.dateMustBeValid(control)).toEqual({ dateMustBeValid: true });
  });

  it('should ValidationErrors null if the input startDate is null', () => {
    control = new FormControl('startDate');
    control.setValue('');
    expect(IrasDateInputValidator.dateMustBeValid(control)).toBeNull();
  });
});
