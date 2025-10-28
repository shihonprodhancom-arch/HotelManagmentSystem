import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ExtraService } from 'src/app/service.model';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
})
export class ServiceListComponent implements OnInit {
  services: ExtraService[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error(err)
    });
  }
}
