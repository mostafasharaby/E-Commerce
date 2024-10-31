import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {
  }

  constructor(private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router,
    private snackBar: SnakebarService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  getEmailErrorMessage() {
    if (this.email?.hasError('required')) return 'Email is required.';
    if (this.email?.hasError('email')) return 'Invalid email format.';
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) return 'Password is required.';
    if (this.password?.hasError('minlength')) return 'Password must be at least 6 characters.';
    return '';
  }

  onLoginSuccess() {
    this.snackBar.showSnakeBar(`Welcome ${this.authService.getUsernameFromToken()}`);
  }
  onLoginFailed() {
    this.snackBar.showSnakeBar('Login Failed');
  }

  errorMessage: string | null = null; 
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      //console.log("login val : " + this.loginForm.value);
      this.authService.login(email, password).subscribe(
        (response: any) => {          
          this.onLoginSuccess();
          if (this.authService.isAdmin()) {
            this.router.navigate(['admin/dashboard']);  
            console.log("admin");
          } else {
            this.router.navigate(['Home']);  
            console.log("user");
          }
        },
        (error: any) => {
          console.error('Login failed', error);
          this.errorMessage = 'Email or password is incorrect';
          this.onLoginFailed();
        }
      );
    }
  }


}
