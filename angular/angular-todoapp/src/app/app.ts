import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo-app');
}

export function emailDomainValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value: string = control.value;
    let tempEmail: Array<string> = ['temp-mail.org', '10minutemail.com', 'guerrillamail.com', 'maildrop.cc', 'yopmail.com',
      'emailondeck.com', 'mailsac.com'
    ];
    var valueSplit = value?.split('@');
    if (valueSplit?.length == 2) {
      if (tempEmail.find(t => t == valueSplit[1].toLocaleLowerCase()) || (tempEmail.filter(t => valueSplit[1].toString().startsWith(t))?.length > 0)) {
        return {
          invalidEmail: {
            error: true,
            message: 'Please enter valid email domain.'
          }
        }
      }
    }
    return null;
  }
}

// Temp-Mail – https://temp-mail.org
// 10 Minute Mail – https://10minutemail.com
// Guerrilla Mail – https://www.guerrillamail.com
// Maildrop – https://maildrop.cc
// YOPmail – https://yopmail.com
// EmailOnDeck – https://www.emailondeck.com
// Mailsac – https://mailsac.com