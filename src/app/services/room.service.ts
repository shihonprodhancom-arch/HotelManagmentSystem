import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface Room {
//   number: number;
//   price: number;
//   capacity: number;
//   services: string[];
//   image: string;
// }

// export interface RoomGroup {
//   type: string;
//   rooms: Room[];
// }


export interface Room {
  id?: number;
  number: number;
  price: number;
  capacity: number;
  services: string[];
  image: string;
  roomGroup?: RoomGroup;
  type?: string;
  status?: string;
  available?: boolean;
  valid?: boolean;
  booked?: boolean;
  underMaintenance?: boolean;
}


export interface RoomGroup {
  id?: number;
  type?: string;
  rooms?: Room[];
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:9092/api';

  constructor(private http: HttpClient) { }

  // Room Groups


  createRoomGroup(roomGroup: RoomGroup): Observable<RoomGroup> {
    return this.http.post<RoomGroup>(`${this.apiUrl}/room-groups`, roomGroup);
  }
  getAllRoomGroups(): Observable<RoomGroup[]> {
    return this.http.get<RoomGroup[]>(`${this.apiUrl}/room-groups`);
  }

  getRoomGroupByType(type: string): Observable<RoomGroup> {
    return this.http.get<RoomGroup>(`${this.apiUrl}/room-groups/type/${type}`);
  }

  getRoomGroupById(id: number): Observable<RoomGroup> {
    return this.http.get<RoomGroup>(`${this.apiUrl}/room-groups/${id}`);
  }

  // Rooms
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/${id}`);
  }

  getRoomByNumber(number: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/number/${number}`);
  }

  getRoomsByGroupType(type: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms/group/${type}`);
  }
// Add these methods to your RoomService
updateRoomGroup(id: number, roomGroup: RoomGroup): Observable<RoomGroup> {
  return this.http.put<RoomGroup>(`${this.apiUrl}/room-groups/${id}`, roomGroup);
}

deleteRoomGroup(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/room-groups/${id}`);
}
  // searchRooms(maxPrice?: number, minCapacity?: number, services?: string[]): Observable<Room[]> {
  //   let params = new HttpParams();
  //   if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
  //   if (minCapacity) params = params.set('minCapacity', minCapacity.toString());
  //   if (services && services.length > 0) {
  //     services.forEach(service => params = params.append('services', service));
  //   }

  //   return this.http.get<Room[]>(`${this.apiUrl}/rooms/search`, { params });
  // }

createRoom(roomData: Room, file?: File): Observable<Room> {
    const formData = new FormData();
    
    // Convert room data to JSON string for the 'room' part
    const roomBlob = new Blob([JSON.stringify(roomData)], { type: 'application/json' });
    formData.append('room', roomBlob);
    
    // Append file if provided
    if (file) {
      formData.append('file', file, file.name);
    }
    
    return this.http.post<Room>(`${this.apiUrl}/rooms`, formData);
  }

  updateRoom(id: number, roomData: Room, file?: File): Observable<Room> {
    const formData = new FormData();
    
    // Convert room data to JSON string for the 'room' part
    const roomBlob = new Blob([JSON.stringify(roomData)], { type: 'application/json' });
    formData.append('room', roomBlob);
    
    // Append file if provided
    if (file) {
      formData.append('file', file, file.name);
    }
    
    return this.http.put<Room>(`${this.apiUrl}/rooms/${id}`, formData);
  }

  deleteRoom(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rooms/${id}`);
  }

  searchRooms(maxPrice?: number, minCapacity?: number, services?: string[]): Observable<Room[]> {
    let params = new HttpParams();
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    if (minCapacity) params = params.set('minCapacity', minCapacity.toString());
    if (services && services.length > 0) {
      services.forEach(service => params = params.append('services', service));
    }
    
    return this.http.get<Room[]>(`${this.apiUrl}/rooms/search`, { params });
  }





  // private apiUrl = 'http://localhost:8080/api/rooms';

  // constructor(private http: HttpClient) { }

  // getAllRoomGroups(): Observable<RoomGroup[]> {
  //   return this.http.get<RoomGroup[]>(`${this.apiUrl}/groups`);
  // }

  // getRoomsByType(type: string): Observable<RoomGroup[]> {
  //   return this.http.get<RoomGroup[]>(`${this.apiUrl}/groups/${type}`);
  // }

  // getRoomByNumber(roomNumber: number): Observable<Room> {
  //   return this.http.get<Room>(`${this.apiUrl}/${roomNumber}`);
  // }
}