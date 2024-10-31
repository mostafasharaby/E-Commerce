import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';

interface User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})

export class RegisterComponent implements OnInit {
  user: User = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  register: FormGroup;
  usernameTakenError: boolean = false;
  existedUsersEmails: string[] = ["a@example.com", "b@example.com", "c@example.com"];
  constructor(private fb: FormBuilder,
    private snakebar: MatSnackBar,
    private router: Router,
    private userAuth: UserAuthenticationService) {
    // this.register = new FormGroup({
    // fullName: new FormControl('',[Validators.minLength(3) , Validators.required]),
    // email : new FormControl(''),
    // password : new FormControl(''),
    // confirmPassword : new FormControl(''),
    // })
    this.register = this.fb.group({
      fullName: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.required, this.exsitEmailValidation(this.existedUsersEmails)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: fb.array([this.fb.control('')]),
      referral: [''],
      referralOther: ['']
    },
      {
        validators: this.passwordMatch(true, true) //function is invoked when the form group is created to return the actual validator function (Cross-Field Validation)
      });
  }

  passwordMatch(complexPassword: boolean = false, complexPasswordWithFullName: boolean = false): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      let pas = formGroup.get('password');
      let confirm = formGroup.get('confirmPassword');
      let email = formGroup.get('email');
      let fullName = formGroup.get('fullName');

      if (!pas && !confirm && !email && !fullName) return null;
      let pasVal = pas?.value;
      let confirmVal = confirm?.value;
      let emailVal = email?.value;
      let fullNameVal = fullName?.value;

      if (pasVal !== confirmVal) {
        return { notMatchPassword: true };
      }
      if (complexPassword && pasVal == emailVal) {
        return { complexPassword: true };
      }
      if (complexPasswordWithFullName && pasVal == fullNameVal) {
        return { complexPasswordWithFullName: true };
      }
      return null;
    }
  }
  exsitEmailValidation(arr: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { //This is the base class for FormControl, FormGroup, and FormArray
      let emailValue: string = control.value;
      let validationErrors = { 'emailNotValid': { 'value': emailValue } }
      // if(emailValue.includes('@') || emailValue.length ===0){   ex1 
      //   return null ;      
      // }else {
      //   return validationErrors ;    
      // }
      return (arr.includes(emailValue)) ? validationErrors : null; // ex1 
    }
  }
  get fullName() {
    return this.register.get('fullName');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('password');
  }
  get confirmPassword() {
    return this.register.get('confirmPassword');
  }
  get phoneNumber() {
    return this.register.get('phoneNumber') as FormArray;
  }
  get referral() {
    return this.register.get('referral');
  }
  get referralOther() {
    return this.register.get('referralOther');
  }


  AddNewNumber(event: any, idx: number) {
    this.phoneNumber.push(this.fb.control(''));
    if (idx > 0) event.target?.classList.add('d-none');
  }


  updateReferralValidators() {
    if (this.referral?.value === 'Other') {
      this.referralOther?.addValidators(Validators.required); // add validators at runtime
    } else {
      // this.referralOther?.clearAsyncValidators();  not correct 
      this.referralOther?.clearValidators();
    }
    this.referralOther?.updateValueAndValidity();  // -> re-bind validation (update state)
  }


  onRegister() {
    if (this.password?.value !== this.confirmPassword?.value) {
      alert('Passwords do not match!');
      return;
    }
  
    // Ensure that the form is valid before proceeding with registration
    if (this.register.valid) {
      this.userAuth.register(
        this.fullName?.value, 
        this.email?.value, 
        this.password?.value, 
        this.confirmPassword?.value
      ).subscribe({
        next: (response: any) => {
          console.log('User registered:', this.fullName?.value);
          this.router.navigate(['/auth/Login']);  // Redirect to Login on success
        },
        error: (error: any) => {
          console.log('Registration failed:', error);  
          // Check how the error is returned from the backend         
            this.usernameTakenError = true;  // Set flag for the error         
        }
      });
    } else {
      alert('Please fill out all fields correctly!');
    }
  }
  

  ngOnInit() {
  }

}