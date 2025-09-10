import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admins: any[] = [];
  admin: any = {};
  editingIndex: number | null = null;

  roles = ['Admin', 'Manager', 'Staff'];

  // Add or Update Admin
  addOrUpdateAdmin(data: any) {
    if (!data.name || !data.email || !data.role || !data.password) {
      alert('All fields are required!');
      return;
    }

    if (this.editingIndex !== null) {
      this.admins[this.editingIndex] = { ...data };
      this.editingIndex = null;
    } else {
      this.admins.push({ ...data });
    }

    this.admin = {};
  }

  // Edit
  editAdmin(index: number) {
    this.editingIndex = index;
    this.admin = { ...this.admins[index] };
  }

  // Delete
  deleteAdmin(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.admins.splice(index, 1);
      if (this.editingIndex === index) {
        this.admin = {};
        this.editingIndex = null;
      }
    }
  }
}
