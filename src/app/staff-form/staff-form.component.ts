import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService, Staff } from '../staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent {
  staff: Staff = { name: '', role: '', salary: 0, shift: '' };

  constructor(private staffService: StaffService, private router: Router) {}

  saveStaff() {
    this.staffService.add(this.staff).subscribe({
      next: () => {
        Swal.fire({
          title: '✅ Staff Added!',
          text: `${this.staff.name} has been added successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/sidebar/staff-management']);
        });
      },
      error: () => {
        Swal.fire({
          title: '❌ Failed!',
          text: 'Something went wrong while saving staff data.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
