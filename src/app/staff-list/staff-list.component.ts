import { Component, OnInit } from '@angular/core';
import { Staff, StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit {
  staffList: any[] = [];

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.loadStaff();
  }

  loadStaff() {
    this.staffService.getAll().subscribe((data: Staff[]) => this.staffList = data);
  }

  deleteStaff(id: number) {
    if (confirm('Are you sure to delete this staff?')) {
      this.staffService.delete(id).subscribe(() => this.loadStaff());
    }
  }
}
