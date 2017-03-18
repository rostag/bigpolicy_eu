import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  console.log('Validator, forbiddenNameValidator, nameRe =', nameRe);
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? null : {'validateEmail': {name}} ;
  };
}

@Directive({
  selector: '[appValidateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator, OnChanges {
  @Input() validateEmail: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Validator, changes =', changes);
    const change = changes['validateEmail'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = forbiddenNameValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    console.log('Validator, validate: control =', control);
    return this.valFn(control);
  }
}
