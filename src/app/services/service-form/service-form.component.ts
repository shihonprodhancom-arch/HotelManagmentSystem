import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

import Swal from 'sweetalert2';
import { ExtraService } from 'src/app/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
})
export class ServiceFormComponent implements OnInit {
  service: ExtraService = { name: '', description: '', price: 0 };

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  saveService() {
    this.serviceService.add(this.service).subscribe({
      next: () => {
        Swal.fire('✅ Success', 'Service added successfully', 'success');
        this.router.navigate(['/sidebar/services']); // redirect to list
      },
      error: () => Swal.fire('❌ Error', 'Something went wrong', 'error')
    });
  }
}
