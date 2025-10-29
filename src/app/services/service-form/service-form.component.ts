import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from 'src/app/service.model';

import Swal from 'sweetalert2';
import { ExtraServiceService } from '../service.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html'
})
export class ServiceFormComponent {
  service: ExtraService = { name: '', description: '', price: 0 };

  constructor(private serviceService: ExtraServiceService, private router: Router) {}

  saveService() {
    this.serviceService.add(this.service).subscribe({
      next: () => {
        Swal.fire('✅ Success', 'Service added successfully', 'success');
        this.router.navigate(['sidebar/services']);
      },
      error: () => Swal.fire('❌ Error', 'Something went wrong', 'error')
    });
  }
}
