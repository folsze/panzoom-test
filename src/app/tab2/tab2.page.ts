import {Component, OnInit} from '@angular/core';
import Panzoom, {PanzoomObject} from '@panzoom/panzoom';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // @ts-ignore
  private panzoomController: PanzoomObject;
  // @ts-ignore
  private panzoomElement: SVGElement;

  // @ts-ignore
  private isPanning: boolean;
  // @ts-ignore
  private panStartX: number;
  // @ts-ignore
  private panStartY: number;

  constructor() {}

  ngOnInit() {}

  public onSvgLoaded = (svg: SVGElement): SVGElement => {
    setTimeout(() => {
      this.setupPanzoom(svg);
    }, 0); // take it back one tick, since it's about to enter. Had to do this...
    return svg;
  }


  setupPanzoom(svg: SVGElement) {
    const step = 1;
    this.panzoomElement = svg;
    this.panzoomController = Panzoom(svg, {
      minScale: 1,
      maxScale: 10, // NOTE: see above. This depth is ok for mobile.
      contain: 'outside',
      step,
    });

    this.setDesktopListeners();
    console.log('DONE');
  }

  private setDesktopListeners = () => {
    this.panzoomElement!.addEventListener('wheel', (event: any) => {
      this.panzoomController.zoomWithWheel(event)
    }, {passive: false});

    // prevent click event when panning:
    this.panzoomElement.addEventListener('panzoomstart', (e: any) => {
      this.isPanning = false;
      this.panStartX = e.detail.x; // source: GPT-4
      this.panStartY = e.detail.y;
    });

    this.panzoomElement.addEventListener('panzoomchange', () => {
      this.isPanning = true;
    });

    this.panzoomElement.addEventListener('panzoomend', (e: any) => {
      const panDistance = Math.hypot(this.panStartX - e.clientX, this.panStartY - e.clientY);
      if (panDistance < 5) {
        this.isPanning = false;
      }
    });
  }

  public zoomIn() {
    this.panzoomController.zoomIn({ animate: true });
  }

  public panToTarget() {
    // Get the SVG path element
    // @ts-ignore
    let svgPath = document.getElementById('Tirol')! as SVGPathElement;
// Get SVG path bounding box (position and dimensions)
    console.log(svgPath);
    let bbox = svgPath.getBBox();
// Get viewport dimensions
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
// Calculate x, y to center the SVG path in the viewport
    let x = (viewportWidth / 2) - (bbox.x + bbox.width / 2);
    let y = (viewportHeight / 2) - (bbox.y + bbox.height / 2);
// Pan to the calculated x, y
    console.log(
      'bbox', bbox,
      'viewportWidth', viewportWidth,
      'viewportHeight', viewportHeight,
      'x', x,
      'y', y
    );

    // this.panzoomController.zoomIn();
    // this.panzoomController.zoom(0.5, { animate: true });
    this.panzoomController.pan(-10, -10, {force: true});
  }

  reset() {
    this.panzoomController.reset();
  }

  zoomOut() {
    this.panzoomController.zoomOut({ animate: true });
  }
}
