import { Component, OnInit } from '@angular/core';
import { RoomGroup, RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-group-list',
  templateUrl: './room-group-list.component.html',
  styleUrls: ['./room-group-list.component.css']
})
export class RoomGroupListComponent implements OnInit {
  roomGroups: RoomGroup[] = [];
  newRoomGroup: RoomGroup = {
    type: '',
    rooms: []
  };
  isEditing = false;
  editingId?: number;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRoomGroups();
  }

  loadRoomGroups(): void {
    this.isLoading = true;
    this.roomService.getAllRoomGroups().subscribe({
      next: (data) => {
        this.roomGroups = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading room groups';
        this.isLoading = false;
        console.error('Error loading room groups:', error);
      }
    });
  }

  onSubmit(): void {
    if (!this.newRoomGroup.type) {
      this.errorMessage = 'Room group type is required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditing && this.editingId) {
      // Update existing room group
      const updateData = { ...this.newRoomGroup };
      this.roomService.updateRoomGroup(this.editingId, updateData).subscribe({
        next: (updatedGroup) => {
          const index = this.roomGroups.findIndex(g => g.id === this.editingId);
          if (index !== -1) {
            this.roomGroups[index] = updatedGroup;
          }
          this.resetForm();
          this.successMessage = 'Room group updated successfully';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error updating room group';
          this.isLoading = false;
          console.error('Error updating room group:', error);
        }
      });
    } else {
      // Create new room group
      this.roomService.createRoomGroup(this.newRoomGroup).subscribe({
        next: (createdGroup) => {
          this.roomGroups.push(createdGroup);
          this.resetForm();
          this.successMessage = 'Room group created successfully';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error creating room group';
          this.isLoading = false;
          console.error('Error creating room group:', error);
        }
      });
    }
  }

  editRoomGroup(roomGroup: RoomGroup): void {
    this.newRoomGroup = {
      type: roomGroup.type || '',
      rooms: roomGroup.rooms || []
    };
    this.isEditing = true;
    this.editingId = roomGroup.id;
    this.scrollToForm();
  }

  deleteRoomGroup(id: number): void {
    if (confirm('Are you sure you want to delete this room group?')) {
      this.isLoading = true;
      this.roomService.deleteRoomGroup(id).subscribe({
        next: () => {
          this.roomGroups = this.roomGroups.filter(group => group.id !== id);
          this.successMessage = 'Room group deleted successfully';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error deleting room group';
          this.isLoading = false;
          console.error('Error deleting room group:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.newRoomGroup = {
      type: '',
      rooms: []
    };
    this.isEditing = false;
    this.editingId = undefined;
    this.errorMessage = '';
  }

  private scrollToForm(): void {
    setTimeout(() => {
      const formElement = document.getElementById('room-group-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}