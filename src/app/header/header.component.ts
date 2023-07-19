import { Component, OnInit } from '@angular/core';
import { PositionEnum } from '../model/PositionEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
