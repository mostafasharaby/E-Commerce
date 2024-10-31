import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {


  profile: any = {}
  isVisible: boolean = false;
  isSubmitted: boolean = false;
  editUserFormGroup!: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserAuthenticationService,
  ) { }

  ngOnInit(): void {
    this._userService.getUser().subscribe((user) => {
      this.profile = user
      this.initeditUserForm();
    })
    this.initeditUserForm();

  }

  initeditUserForm() {
    this.editUserFormGroup = this._formBuilder.group({
      name: [this.profile.name, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      role: [this.profile.role, Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.editUserFormGroup.invalid) return;
    const newUser: any = {
      name: this.editUserFormGroup.get('name')?.value,
      email: this.editUserFormGroup.get('email')?.value,
      role: this.editUserFormGroup.get('role')?.value,
    };
    console.log(newUser)
    this.closeEditModal()
  }

  get editUserForm() {
    return this.editUserFormGroup.controls;
  }

    
  openEditModal(user: any) {
    this.isVisible = true;
  }

  closeEditModal() {
    this.isVisible = false;
  }



}
