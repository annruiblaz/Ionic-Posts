import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.page.html',
  styleUrls: ['./popover-content.page.scss'],
})
export class PopoverContentPage implements OnInit {

  @Input() title!: string;
  @Input() message!: string;
  constructor() { }

  ngOnInit() {
  }

}
