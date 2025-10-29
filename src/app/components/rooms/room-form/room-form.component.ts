import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, Room, RoomGroup } from '../../../services/room.service';

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  roomForm: FormGroup;
  roomGroups: RoomGroup[] = [];
  isEditMode = false;
  roomId: number | null = null;
  isLoading = false;
  currentStep = 1;
  
  availableServices: string[] = [
    'WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Private Pool',
    'Room Service', 'Sea View', 'Balcony', 'Coffee Maker'
  ];

  // File upload properties
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isFileSelected = false;
  isDragOver = false;
  uploadProgress = 0;
  isUploading = false;

  // Toast notifications
  toasts: Toast[] = [];
  private toastId = 0;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadRoomGroups();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.roomId = +params['id'];
        this.loadRoom(this.roomId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      number: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      roomGroupId: ['', Validators.required],
      services: this.fb.array([]),
    });
  }

  get servicesArray(): FormArray {
    return this.roomForm.get('services') as FormArray;
  }

  // Step Navigation
  nextStep(): void {
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    this.currentStep--;
  }

  isStepValid(step: number): any {
    switch (step) {
      case 1:
        return this.roomForm.get('number')?.valid &&
               this.roomForm.get('price')?.valid &&
               this.roomForm.get('capacity')?.valid &&
               this.roomForm.get('roomGroupId')?.valid;
      case 2:
        return this.isFileSelected || this.isEditMode;
      case 3:
        return true; // Services are optional
      default:
        return false;
    }
  }

  // Service Methods
  toggleService(service: string): void {
    const servicesArray = this.servicesArray;
    const index = servicesArray.controls.findIndex(control => control.value === service);
    
    if (index > -1) {
      servicesArray.removeAt(index);
    } else {
      servicesArray.push(this.fb.control(service));
    }
  }

  isServiceSelected(service: string): boolean {
    return this.servicesArray.controls.some(control => control.value === service);
  }

  getServiceIcon(service: string): string {
    const icons: { [key: string]: string } = {
      'WiFi': 'fas fa-wifi',
      'AC': 'fas fa-snowflake',
      'TV': 'fas fa-tv',
      'Mini Bar': 'fas fa-wine-bottle',
      'Jacuzzi': 'fas fa-hot-tub',
      'Private Pool': 'fas fa-swimming-pool',
      'Room Service': 'fas fa-concierge-bell',
      'Sea View': 'fas fa-water',
      'Balcony': 'fas fa-door-open',
      'Coffee Maker': 'fas fa-coffee'
    };
    return icons[service] || 'fas fa-star';
  }

  getServiceDescription(service: string): string {
    const descriptions: { [key: string]: string } = {
      'WiFi': 'High-speed internet access',
      'AC': 'Air conditioning system',
      'TV': 'Flat-screen television',
      'Mini Bar': 'Stocked refrigerator',
      'Jacuzzi': 'Private jacuzzi tub',
      'Private Pool': 'Exclusive swimming pool',
      'Room Service': '24/7 room service',
      'Sea View': 'Beautiful ocean view',
      'Balcony': 'Private balcony area',
      'Coffee Maker': 'Coffee and tea facilities'
    };
    return descriptions[service] || 'Premium service';
  }

  // File Upload Methods
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.handleFileSelection(file);
    }
  }

  private handleFileSelection(file: File): void {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.showToast('Invalid File Type', 'Please select a valid image file (JPEG, PNG, GIF, WebP)', 'error');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.showToast('File Too Large', 'File size should be less than 5MB', 'error');
      return;
    }

    this.selectedFile = file;
    this.isFileSelected = true;
    this.simulateUploadProgress();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    this.showToast('Image Selected', 'Image ready for upload', 'success');
  }

  private simulateUploadProgress(): void {
    this.isUploading = true;
    this.uploadProgress = 0;
    
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
      }
    }, 100);
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.isFileSelected = false;
    this.uploadProgress = 0;
    this.showToast('Image Removed', 'You can select another image', 'info');
  }

  // Toast Methods
  showToast(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    const toast: Toast = {
      id: this.toastId++,
      type,
      title,
      message
    };
    this.toasts.push(toast);
    
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  getToastIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'success': 'fas fa-check-circle text-success',
      'error': 'fas fa-exclamation-circle text-danger',
      'warning': 'fas fa-exclamation-triangle text-warning',
      'info': 'fas fa-info-circle text-info'
    };
    return icons[type] || 'fas fa-bell';
  }

  // Data Methods
  loadRoomGroups(): void {
    this.roomService.getAllRoomGroups().subscribe({
      next: (groups) => {
        this.roomGroups = groups;
      },
      error: (error) => {
        console.error('Error loading room groups:', error);
        this.showToast('Error', 'Failed to load room types', 'error');
      }
    });
  }

  loadRoom(id: number): void {
    this.isLoading = true;
    this.roomService.getRoomById(id).subscribe({
      next: (room) => {
        this.populateForm(room);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading room:', error);
        this.isLoading = false;
        this.showToast('Error', 'Failed to load room details', 'error');
      }
    });
  }

  populateForm(room: Room): void {
    this.roomForm.patchValue({
      number: room.number,
      price: room.price,
      capacity: room.capacity,
      roomGroupId: room.roomGroup?.id
    });

    while (this.servicesArray.length !== 0) {
      this.servicesArray.removeAt(0);
    }

    room.services?.forEach(service => {
      this.servicesArray.push(this.fb.control(service));
    });

    if (room.image) {
      this.imagePreview = `http://localhost:9092/uploads/${room.image}`;
      this.isFileSelected = true;
    }
  }

  onSubmit(): void {
    if (this.roomForm.valid && (this.isFileSelected || this.isEditMode)) {
      this.isLoading = true;
      const formValue = this.roomForm.value;
      
      const roomData: Room = {
        number: formValue.number,
        price: formValue.price,
        capacity: formValue.capacity,
        services: formValue.services,
        roomGroup: { id: formValue.roomGroupId },
        image: ''
      };

      if (this.isEditMode && this.roomId) {
        roomData.id = this.roomId;
      }

      const request = this.isEditMode && this.roomId
        ? this.roomService.updateRoom(this.roomId, roomData, this.selectedFile || undefined)
        : this.roomService.createRoom(roomData, this.selectedFile || undefined);

      request.subscribe({
        next: (room) => {
          this.isLoading = false;
          this.showToast(
            'Success', 
            `Room ${this.isEditMode ? 'updated' : 'created'} successfully!`, 
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['sidebar/rooms']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error saving room:', error);
          this.isLoading = false;
          this.showToast('Error', 'Failed to save room. Please try again.', 'error');
        }
      });
    } else {
      this.markFormGroupTouched();
      if (!this.isFileSelected && !this.isEditMode) {
        this.showToast('Image Required', 'Please select a room image', 'error');
      }
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.roomForm.controls).forEach(key => {
      const control = this.roomForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  }
}