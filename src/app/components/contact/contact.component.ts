import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm:any;
  formSubmitAttempt: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm  =  this.formBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone:[''],
      message: ['',[Validators.required]]
    });
  }

  saveContact(){
    this.formSubmitAttempt = true;
    if(this.contactForm.dirty && this.contactForm.valid){
      console.log('submit');
    }
  }

  isFieldValid(field: string) {
    return (!this.contactForm.get(field).valid && this.contactForm.get(field).touched) ||
      (this.contactForm.get(field).untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'alert-validate': this.isFieldValid(field)
    };
  }

}
