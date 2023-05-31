import {Component, OnInit} from '@angular/core';
import panzoom from 'panzoom';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor() {}

  setupPanzoom(event: any) {
    const panzoom1 = panzoom(document.querySelector('#panzoom-element')!);
  }

  ngOnInit(): void {}

}
