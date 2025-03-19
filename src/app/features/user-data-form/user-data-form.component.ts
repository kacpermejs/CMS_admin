import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setUserData } from '@core/store/actions/user.actions';
import { UserData } from '@core/store/models/UserState';
import { selectUserData } from '@core/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';

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
  originalUserData: Partial<UserData> = {};

  constructor() {

    this.userForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      tier: ['', Validators.required]
    });

    this.store.select(selectUserData).pipe(
      filter(userData => !!userData), // Ensure data is not null/undefined
    ).subscribe(userData => {
      this.originalUserData = userData;
      this.userForm.patchValue({
        nickname: userData.nickname || '', // Fallback in case of null/undefined values
        tier: userData.tier || ''
      });
    });
  
  }

  getChangedData(): Partial<UserData> {
    if (!this.originalUserData) return {}; // No original data to compare
  
    const formValues = this.userForm.value;
    const changedData: Partial<UserData> = {};
  
    (Object.keys(formValues) as Array<keyof UserData>).forEach((key) => {
      if (formValues[key] !== this.originalUserData[key]) {
        changedData[key] = formValues[key]; // Only include modified fields
      }
    });
  
    return changedData;
  }

  onSubmit() {
    const changedData = this.getChangedData();
    if (Object.keys(changedData).length > 0) {
      console.log('Changed fields:', changedData);
      // Dispatch update action with only changed fields
      this.store.dispatch(setUserData({ user: changedData }));
    } else {
      console.log('No changes detected');
    }
  }
}
