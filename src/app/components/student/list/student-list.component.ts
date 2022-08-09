import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentListComponent implements OnInit {
	studentList: any;
	studentListData: any;
	filterData: string = '';
	constructor(private studentService: StudentService, private toastr: ToastrService) { }
	ngOnInit() {
		this.getStudentList();
	}

	getStudentList() {
		let studentList = this.studentService.getAllStudents();
		this.success(studentList)
	}

	success(data: any) {
		this.studentListData = data.data;
		for (var i = 0; i < this.studentListData.length; i++) {
			this.studentListData[i].name = this.studentListData[i].first_name + ' ' + this.studentListData[i].last_name;
		}
	}

	deleteStudent(index: number) {
		let r = confirm("Are you sure?");
		if (r == true) {
			let studentDelete = this.studentService.deleteStudent(index);
			if (studentDelete) {
				this.toastr.success("Success", "Student Deleted");
			}
			this.getStudentList();
		}
	}
}

