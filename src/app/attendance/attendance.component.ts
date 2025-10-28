import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AttendanceService } from '../services/attendance.service';

import { StaffService } from '../staff.service';
import { Attendance } from '../attendance.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {

  attendanceList: Attendance[] = [];
  staffList: any[] = [];
  form: Attendance = { date: new Date().toISOString().split('T')[0], staffId: 0, status: 'Present' };

  constructor(
    private attendanceService: AttendanceService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.loadStaff();
    this.loadAttendance();
  }

  loadStaff() {
    this.staffService.getAll().subscribe(data => {
      this.staffList = data;
    });
  }

  loadAttendance() {
    this.attendanceService.getAll().subscribe(data => {
      this.attendanceList = data;
    });
  }

  viewByStaff(staffId: string) {
    const id = Number(staffId);
    if (id === 0) {
      this.loadAttendance();
    } else {
      this.attendanceService.getByStaff(id).subscribe(data => {
        this.attendanceList = data;
      });
    }
  }

  saveAttendance() {
    this.attendanceService.addAttendance(this.form).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'Attendance has been recorded successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        this.form = { date: new Date().toISOString().split('T')[0], staffId: 0, status: 'Present' };
        this.loadAttendance();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Could not save attendance!'
        });
      }
    });
  }
}
