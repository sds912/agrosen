import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const phoneNumber = control.value;
  const phonePattern = /^\+221(77|76|70)\d{7}$/; // Regex pattern to match the criteria

  if (phoneNumber && !phonePattern.test(phoneNumber)) {
    return { invalidPhoneNumber: true };
  }
  return null;
}
