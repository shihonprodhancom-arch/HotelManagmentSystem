import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Guest {
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  guests: Guest[] = [];                     // Guest list
  guest: Guest = { name: '', phone: '', email: '' }; // Form model
  editingIndex: number | null = null;       // Track editing
  searchTerm: string = '';                  // Search input

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {}

  // Add or Update Guest
  addOrUpdateGuest(data: Guest) {
    if (!data.name || !data.phone || !data.email) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    // Phone validation: 10 digits
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(data.phone)) {
      Swal.fire('Error', 'Phone number must be 11 digits!', 'error');
      return;
    }

    if (this.editingIndex !== null) {
      this.guests[this.editingIndex] = { ...data };
      Swal.fire('Updated!', 'Guest updated successfully.', 'success');
      this.editingIndex = null;
    } else {
      this.guests.push({ ...data });
      Swal.fire('Added!', `${data.name} has been added successfully.`, 'success');
    }

    // Reset form
    this.guest = { name: '', phone: '', email: '' };
  }

  // Edit Guest
  editGuest(index: number) {
    this.editingIndex = index;
    this.guest = { ...this.guests[index] };
  }

  // Delete Guest
  deleteGuest(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${this.guests[index].name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.guests.splice(index, 1);
        Swal.fire('Deleted!', 'Guest has been removed.', 'success');

        // Adjust page if needed
        if (this.currentPage > this.totalPages()) this.currentPage = this.totalPages();
        if (this.editingIndex === index) {
          this.guest = { name: '', phone: '', email: '' };
          this.editingIndex = null;
        }
      }
    });
  }

  // Filter Guests by search term
  get filteredGuests(): Guest[] {
    return this.guests.filter(g =>
      g.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      g.phone.includes(this.searchTerm) ||
      g.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Get guests for current page
  get pagedGuests(): Guest[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredGuests.slice(start, start + this.pageSize);
  }

  // Pagination helpers
  totalPages(): number {
    return Math.ceil(this.filteredGuests.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }
}
