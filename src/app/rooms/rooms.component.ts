import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedGroup: any = null;

  roomGroups = [
    {
      type: 'Single',
      rooms: [
        { number: 101, price: 2000, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (1).jpg' },
        { number: 102, price: 2100, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (2).jpg' },
        { number: 103, price: 2200, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (3).jpg' },
        { number: 104, price: 2300, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (5).jpg' },
      ]
    },
    {
      type: 'Double',
      rooms: [
        { number: 201, price: 3000, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/markus-spiske-g5ZIXjzRGds-unsplash.jpg' },
        { number: 202, price: 3100, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg' },
        { number: 203, price: 3200, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-1390233984-612x612.jpg' },
        { number: 204, price: 3300, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/download (4).jpg' },
        { number: 205, price: 3400, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-154945734-612x612.jpg' },
      ]
    },
    {
      type: 'Suite',
      rooms: [
        { number: 301, price: 5000, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1148452746-612x612.jpg' },
        { number: 302, price: 5100, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1266155634-612x612.jpg' },
        { number: 303, price: 5200, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1300135335-612x612.jpg' },
      ]
    },
    {
      type: 'Honeymoon',
      rooms: [
        { number: 401, price: 6000, capacity: 2, services: ['WiFi', 'AC', 'TV', 'Jacuzzi'], image: 'assets/img/download (6).jpg' },
        { number: 402, price: 6200, capacity: 2, services: ['WiFi', 'AC', 'TV', 'Jacuzzi'], image: 'assets/img/gettyimages-1334117383-612x612.jpg' },
      ]
    },
    {
      type: 'Family',
      rooms: [
        { number: 501, price: 7000, capacity: 5, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-1148452746-612x612.jpg' },
        { number: 502, price: 7100, capacity: 5, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg' },
      ]
    },
    {
      type: 'VIP',
      rooms: [
        { number: 601, price: 12000, capacity: 3, services: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Private Pool'], image: 'assets/img/gettyimages-1334117383-612x612.jpg' },
        { number: 602, price: 12500, capacity: 3, services: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Private Pool'], image: 'assets/img/gettyimages-1390233984-612x612.jpg' },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {}

  viewGroupDetails(group: any) {
    this.selectedGroup = group;
  }

  closeDetails() {
    this.selectedGroup = null;
  }
}
