import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Guest, GuestService } from '../services/guest.service';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  guests: Guest[] = [];
  guest: Guest = { name: '', phone: '', email: '' };
  editingIndex: number | null = null;
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.loadGuests();
  }

  // Load all guests from API
  loadGuests() {
    this.guestService.getAllGuests().subscribe({
      next: (data) => this.guests = data,
      error: (err) => Swal.fire('Error', 'Failed to load guests!', 'error')
    });
  }

  // Add or Update Guest (API call)
  addOrUpdateGuest(data: Guest) {
    if (!data.name || !data.phone || !data.email) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(data.phone)) {
      Swal.fire('Error', 'Phone number must be 11 digits!', 'error');
      return;
    }

    if (this.editingIndex !== null && data.id) {
      // Update existing guest
      this.guestService.updateGuest(data.id, data).subscribe({
        next: (updated) => {
          this.guests[this.editingIndex!] = updated;
          Swal.fire('Updated!', 'Guest updated successfully.', 'success');
          this.editingIndex = null;
          this.guest = { name: '', phone: '', email: '' };
        },
        error: () => Swal.fire('Error', 'Failed to update guest!', 'error')
      });
    } else {
      // Add new guest
      this.guestService.addGuest(data).subscribe({
        next: (newGuest) => {
          this.guests.push(newGuest);
          Swal.fire('Added!', `${newGuest.name} has been added successfully.`, 'success');
          this.guest = { name: '', phone: '', email: '' };
        },
        error: () => Swal.fire('Error', 'Failed to add guest!', 'error')
      });
    }
  }

  // Edit Guest (load into form)
  editGuest(index: number) {
    this.editingIndex = index;
    this.guest = { ...this.guests[index] };
  }

  // Delete Guest (API call)
  deleteGuest(index: number) {
    const guest = this.guests[index];
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${guest.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed && guest.id) {
        this.guestService.deleteGuest(guest.id).subscribe({
          next: () => {
            this.guests.splice(index, 1);
            Swal.fire('Deleted!', 'Guest has been removed.', 'success');
            if (this.currentPage > this.totalPages()) this.currentPage = this.totalPages();
            if (this.editingIndex === index) {
              this.guest = { name: '', phone: '', email: '' };
              this.editingIndex = null;
            }
          },
          error: () => Swal.fire('Error', 'Failed to delete guest!', 'error')
        });
      }
    });
  }

  // Filter Guests
  get filteredGuests(): Guest[] {
    return this.guests.filter(g =>
      g.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      g.phone.includes(this.searchTerm) ||
      g.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Pagination helpers
  get pagedGuests(): Guest[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredGuests.slice(start, start + this.pageSize);
  }

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
