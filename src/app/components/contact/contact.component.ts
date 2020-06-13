import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm:any;
  formData: any;
  companyData: any;
  formSubmitAttempt: boolean = false;
  constructor(private formBuilder: FormBuilder, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    this.contactForm  =  this.formBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone:[''],
      message: ['',[Validators.required]]
    });
    // form fields along with their details
    this.formData = [
                      { fieldName: 'first_name', label: 'Name', class: 'wrap-input100 validate-input rs1-wrap-input100', placeholder: 'Fname', ValidateError: 'FnameError', id: 'first-name' },
                      { fieldName: 'last_name', label: '', class: 'wrap-input100 validate-input rs2-wrap-input100', placeholder: 'Lname', ValidateError: 'LnameError', id: 'last-name' },
                      { fieldName: 'email', label: 'Email', class: 'wrap-input100 validate-input', placeholder: 'EmailEg', ValidateError: 'EmailError', id: 'email' },
                      { fieldName: 'phone', label: 'Phone', class: 'wrap-input100 validate-input', placeholder: 'PhoneEg', ValidateError: '', id: 'phone' },
                      { fieldName: 'message', label: 'Message', class: 'wrap-input100 validate-input', placeholder: 'WriteMessage', ValidateError: 'MessageError', id: 'message' }
                    ];
    //  static company details
    this.companyData = [
                        { class: 'lnr lnr-map-marker', type: 'Address', value: 'Mada Center 8th floor, 379 Hudson St, New York, NY 10018 US', valueClass: 'txt2' },
                        { class: 'lnr lnr-phone-handset', type: 'Talk', value: '+1 800 1236879', valueClass: 'txt3' },
                        { class: 'lnr lnr-envelope', type: 'Support', value: 'contact@example.com', valueClass: 'txt3' }
                      ];
  }

  // method to submit contact details
  saveContact(){
    this.formSubmitAttempt = true;
    if(this.contactForm.dirty && this.contactForm.valid){
      console.log('submit');
    }
  }

  // check fields validity
  isFieldValid(field: string) {
    return (!this.contactForm.get(field).valid && this.contactForm.get(field).touched) ||
      (this.contactForm.get(field).untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'alert-validate': this.isFieldValid(field)
    };
  }

  // change language
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

}
