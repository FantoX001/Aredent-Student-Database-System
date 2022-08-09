import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

import { ValidationService } from '../../../services/config/config.service';
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-student-add',
	templateUrl: './student-add.component.html',
	styleUrls: ['./student-add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentAddComponent implements OnInit {
	studentAddForm: FormGroup;
	index: any;

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {

		this.route.params.subscribe(params => {
			this.index = params['id'];
			if (this.index && this.index != null && this.index != undefined) {
				this.getStudentDetails(this.index);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}

	doRegister() {
		if (this.index && this.index != null && this.index != undefined) {
			this.studentAddForm.value.id = this.index
		} else {
			this.index = null;
		}
		let studentRegister = this.studentService.doRegisterStudent(this.studentAddForm.value, this.index);
		if (studentRegister) {
			if (studentRegister.code == 200) {
				this.toastr.success(studentRegister.message, "Success");
				this.router.navigate(['/']);
			} else {
				this.toastr.error(studentRegister.message, "Failed");
			}
		}
	}

	getStudentDetails(index: number) {
		let studentDetail = this.studentService.getStudentDetails(index);
		this.createForm(studentDetail);
	}

	createForm(data: any) {
		if (data == null) {
			this.studentAddForm = this.formBuilder.group({
				first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phone: ['', [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: ['', [Validators.required, ValidationService.emailValidator]]
			});
		} else {
			this.studentAddForm = this.formBuilder.group({
				first_name: [data.studentData.first_name, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
				last_name: [data.studentData.last_name, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
				phone: [data.studentData.phone, [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: [data.studentData.email, [Validators.required, ValidationService.emailValidator]]
			});
		}
	}

}

