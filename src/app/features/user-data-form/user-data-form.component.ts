import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setUserData } from '@core/store/actions/user.actions';
import { UserData } from '@core/store/models/UserState';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-data-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-data-form.component.html',
  styleUrl: './user-data-form.component.css'
})
export class UserDataFormComponent {
  userForm: FormGroup;
  tiers = ['Free', 'Lite', 'Pro']; // Available tier options

  private fb = inject(FormBuilder);
  private store = inject(Store);

  constructor() {
    this.userForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      tier: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value as UserData;
      this.store.dispatch(setUserData({ user }));
    }
  }
}
