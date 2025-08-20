import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRegisterCreds } from '../../../interfaces/user';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Register {
  //  public membersFromHome = input<IUser[]>(); // one way data binding between parent and child = input signal --- pure example
  private accountService = inject(AccountService);
  public cancelRegistration = output<boolean>();
  protected creds = {} as IRegisterCreds;

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }

  cancel() {
    this.cancelRegistration.emit(false); // emit signal to parent component
    console.log('Registration cancelled');
  }
}
