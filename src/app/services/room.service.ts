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
  id: number;
  number: number;
  price: number;
  capacity: number;
  services: string[];
  image: string;
}

export interface RoomGroup {
  id: number;
  type: string;
  rooms: Room[];
}
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:9092/api';

  constructor(private http: HttpClient) { }

  // Room Groups
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

  searchRooms(maxPrice?: number, minCapacity?: number, services?: string[]): Observable<Room[]> {
    let params = new HttpParams();
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    if (minCapacity) params = params.set('minCapacity', minCapacity.toString());
    if (services && services.length > 0) {
      services.forEach(service => params = params.append('services', service));
    }
    
    return this.http.get<Room[]>(`${this.apiUrl}/rooms/search`, { params });
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/rooms`, room);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/rooms/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rooms/${id}`);
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