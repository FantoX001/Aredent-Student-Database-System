import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	title = 'Student Management By Sangwin Gawande';

	studentsList = [
	{	
		id : 1,
		first_name : "Shubha Pratim",
		last_name : "Biswas",
		email : "shubhapratimbiswas@gmail.com",
		phone : 8101187835,
		department : "Science"
	},
	{
		id : 2,
		first_name : "Soumyodeep",
		last_name : "Majumdar",
		email : "soumyadeepmajumdar@gmai.com",
		phone : 8525697432,
		department : "Science"
	},
	{
		id : 3,
		first_name : "Adityarup",
		last_name : "Datta",
		email : "adityarupdatta@gmail.com",
		phone : 9735940289,
		department : "Science"
	}
	];

	constructor() {
		localStorage.setItem('students', JSON.stringify(this.studentsList));
	}
}

