import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraServiceService } from '../service.service'; // নাম ঠিক হলো
import { ExtraService } from 'src/app/service.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  serviceList: ExtraService[] = [];

  constructor(private serviceService: ExtraServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data: ExtraService[]) => this.serviceList = data,
      error: (err: any) => console.error('Error loading services:', err)
    });
  }

  editService(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/sidebar/services/edit', id]);
    }
  }

  deleteService(id: number | undefined): void {
    if (!id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Service has been deleted.', 'success');
            this.loadServices();
          },
          error: () => Swal.fire('Error!', 'Failed to delete service.', 'error')
        });
      }
    });
  }
}
