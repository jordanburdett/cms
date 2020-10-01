import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onLinkClicked(link: string) {
    this.linkClicked.emit(link);
  }

}
