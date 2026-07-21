import { CommonModule } from '@angular/common';
import { Component, linkedSignal, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../service/data-service';
import { TodoApiService } from '../service/todo-api-service';
import { Gender, UserRegistrationModel } from '../app/app.models';
import { emailDomainValidation } from '../app/app';
import { UserIdGeneratorPipe } from '../app/user-id-generator-pipe';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})
export class UserRegistration implements OnInit {
  registrationForm: FormGroup;
  user: UserRegistrationModel | null = null;
  currentDate: Date = new Date();
  minDate: string = new Date(2001, 1, 1).toISOString().split('T')[0];
  maxDate: string = this.currentDate.toISOString().split('T')[0];
  Gender = Gender;
  StatesandCity = [
    {
      name: "Tamil Nadu",
      cities: [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli"
      ]
    },
    {
      name: "Kerala",
      cities: [
        "Kochi",
        "Thiruvananthapuram",
        "Kozhikode",
        "Thrissur"
      ]
    },
    {
      name: "Karnataka",
      cities: [
        "Bengaluru",
        "Mysuru",
        "Mangaluru",
        "Belagavi"
      ]
    }
  ];
  cityID = signal(0);
  stateID = signal(0);

  stateList = this.StatesandCity.map((value, index) => ({
    id: index + 1,
    state: value.name
  }));

  
  citiesList = this.StatesandCity.flatMap(state => {
    this.stateID.update(s => s + 1);

    return state.cities.map(city => {
      this.cityID.update(c => c + 1);

      return {
        id: this.cityID(),
        city: city,
        stateid: this.stateID()
      };
    });
  });

  selectedCity = signal(1);

  selectedState = linkedSignal(() => {
    const city = this.citiesList.find(
      c => c.id === this.selectedCity()
    );

    return city?.stateid ?? null;
  });

  onStatechange(event:any){
    console.log(this.stateList);
    console.log(event)
    this.selectedState.update(t=> Number(event.currentTarget.value.split(':')[0]));
  }

  constructor(private fb: FormBuilder, private dataService: DataService, private apiService: TodoApiService) {
    
    this.registrationForm = this.fb.group({
      fullName: [this.user?.fullName ?? '', [Validators.required, Validators.maxLength(50)]],
      dob: [this.user?.dob ?? this.getCurrentDate(), [Validators.required]],
      gender: [this.user?.gender ?? Gender.Male, [Validators.required]],
      emailId: [this.user?.emailId, [Validators.required, Validators.email, emailDomainValidation()]],// Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)]],
      phoneNo: [this.user?.phoneNo, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: [this.user?.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      livinginChennai: [this.user?.livinginChennai ?? false],
      termsandcondition: [this.user?.termsandcondition ?? false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      let value = this.registrationForm.value;
      value.userID = (this.dataService.userRegistration.length ?? 0) + 1;
      const model = new UserRegistrationModel(value)
      this.dataService.userRegistration.push(model);
      //console.log(model);
      console.log(this.dataService.userRegistration);

      var blob = new Blob([JSON.stringify(value)], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = (this.registrationForm.value["fullName"]).toString() + "_data.json";
      //a.click();
      window.URL.revokeObjectURL(url);

      this.user = new UserRegistrationModel();

      this.registrationForm.reset({
        fullName: this.user?.fullName,
        dob: this.user?.dob ?? this.getCurrentDate(),
        gender: this.user?.gender ?? Gender.Female,
        emailId: this.user?.emailId,
        phoneNo: this.user?.phoneNo,
        password: this.user?.password,
        livinginChennai: false,
        termsandcondition: false
      });
    }
  }

  clearForm() {

    this.registrationForm.reset({
      fullName: this.user?.fullName,
      dob: this.user?.dob ?? this.getCurrentDate(),
      gender: this.user?.gender ?? Gender.Female,
      emailId: this.user?.emailId,
      phoneNo: this.user?.phoneNo,
      password: this.user?.password,
      livinginChennai: false,
      termsandcondition: false
    });
  }


  private getCurrentDate(): string {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    return new Date(today.getTime() - offset * 60000)
      .toISOString()
      .split('T')[0];
  }
}


/*

// registrationForm = new FormGroup({
//   fullName: new FormControl<string>('', {
//     nonNullable: true,
//     validators: [Validators.required]
//   }),
//   dob: new FormControl<string>(this.getCurrentDate(), {
//     nonNullable: true,
//     validators: [Validators.required]
//   }),
//   gender: new FormControl<Gender>(Gender.Male, {
//     nonNullable: true,
//     validators: [Validators.required]
//   }),
//   emailId: new FormControl<string>('', {
//     nonNullable: true,
//     validators: [Validators.required, Validators.email]
//   }),
//   phoneNo: new FormControl<string>('', {
//     nonNullable: true,
//     validators: [
//       Validators.required,
//       Validators.pattern(/^[0-9]{10}$/)
//     ]
//   }),
//   password: new FormControl<string>('', {
//     nonNullable: true,
//     validators: [Validators.required, Validators.minLength(8)]
//   }),
//   livinginChennai: new FormControl(false, {
//     nonNullable: true
//   }),
//   termsandcondition: new FormControl(false, {
//     nonNullable: true,
//     validators: [Validators.requiredTrue]
//   })
// });
*/