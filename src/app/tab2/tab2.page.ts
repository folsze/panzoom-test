import {Component, OnInit} from '@angular/core';
import Panzoom from '@panzoom/panzoom';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor() {}

  ngOnInit() {
    const svg = document.querySelector('#panzoom-element')! as HTMLElement;
    const step = 1;
    Panzoom(svg, {
      minScale: 1,
      maxScale: 10, // NOTE: see above. This depth is ok for mobile.
      contain: 'outside',
      step,
    });
  }
}
