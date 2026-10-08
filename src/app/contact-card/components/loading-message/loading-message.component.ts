import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  standalone: false,
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
