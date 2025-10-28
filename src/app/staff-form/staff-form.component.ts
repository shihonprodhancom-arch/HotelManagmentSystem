import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService, Staff } from '../staff.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html'
})
export class StaffFormComponent {
  staff: Staff = { name: '', role: '', salary: 0, shift: '' };

  constructor(private staffService: StaffService, private router: Router) {}

  saveStaff() {
    this.staffService.add(this.staff).subscribe(() => {
      // alert('✅ Staff added successfully!');
this.router.navigate(['/sidebar/staff-management']);
    });
  }
}
