import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('sample@gmail.com', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      address: new FormArray([]),
    },
    { updateOn: 'submit' }
    /*form data is updated when it is submitted, 
    apart from email, since it is mentioned to be updated on change*/
  );
  newAddress() {
    return new FormGroup({
      city: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [
        Validators.required,
        this.zipcodeValidator(),
      ]),
    });
  }
  get addressObj() {
    return this.checkoutForm.get('address') as FormArray;
  }
  addAddress() {
    this.addressObj.push(this.newAddress());
  }

  removeAddress(index: number) {
    this.addressObj.removeAt(index);
  }

  saveData() {
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      console.log('form submitted: ', this.checkoutForm.value);
    }
  }
  loadData() {
    const data = {
      name: 'john',
      email: 'john@gmail.com',
      address: {
        city: 'city',
        pincode: '362489',
      },
    };
    this.checkoutForm.setValue(data);
  }

  patchData() {
    const data = {
      name: 'johny',
      email: 'johny@gmail.com',
    };
    this.checkoutForm.patchValue(data);
  }
  zipcodeValidator() {
    return (control: AbstractControl) => {
      if (control.value == 123456) {
        // valid
        return null;
      }
      // invalid
      return {
        // name_of_error:information_related_to_error
        zipcode: {
          validCode: 123456,
          enteredCode: control.value,
        },
      };
    };
  }
}
