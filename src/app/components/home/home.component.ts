import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentListComponent } from '../student/list/student-list.component';
import { StudentDetailsComponent } from '../student/details/student-details.component';
import { StudentAddComponent } from '../student/add/student-add.component';

import { routerTransition } from '../../services/config/config.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})


export class HomeComponent implements OnInit {
	active: string;
	constructor(private router: Router, private toastr: ToastrService) {
		this.active = '';
		this.router.events.subscribe((val) => {
			this.routeChanged(val);
		});
	}

	ngOnInit() {
	}

	routeChanged(val: any) {
		this.active = val.url;
	}


	logOut() {
		this.toastr.success('Login Successful', "Logged Out Successfully");
		localStorage.removeItem('userData');
		this.router.navigate(['/login']);
	}
}


export const homeChildRoutes: Routes = [
	{
		path: '',
		component: StudentListComponent
	},
	{
		path: 'add',
		component: StudentAddComponent
	},
	{
		path: 'update/:id',
		component: StudentAddComponent
	},
	{
		path: 'detail/:id',
		component: StudentDetailsComponent
	}
];

