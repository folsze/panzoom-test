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
  public x: number = 500;
  public y: number = 500;

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
    let bbox = svgPath.getBBox();

    // Get the SVG element's dimensions and position
    let svgRect = this.panzoomElement.getBoundingClientRect();
    let svgWidth = svgRect.width;
    let svgHeight = svgRect.height;

    // Calculate x, y to center the SVG path in the SVG
    let x = (svgWidth / 2) - (bbox.x + bbox.width / 2);
    let y = (svgHeight / 2) - (bbox.y + bbox.height / 2);

    // Calculate center point of the SVG path, relative to the SVG's top-left corner
    let centerX = bbox.x + bbox.width / 2 + svgRect.left;
    let centerY = bbox.y + bbox.height / 2 + svgRect.top;

    // Adjust for panzoom's coordinate system (origin in the middle)
    let panzoomCenterX = centerX - svgWidth / 2;
    let panzoomCenterY = centerY - svgHeight / 2;

    // Convert SVG's coordinate system to panzoom's
    let panzoomCenterXAdjusted = panzoomCenterX - svgWidth / 2;
    let panzoomCenterYAdjusted = panzoomCenterY - svgHeight / 2;

    // Log calculated values
    console.log(
      'bbox', bbox,
      'svgWidth', svgWidth,
      'svgHeight', svgHeight,
      'x', x,
      'y', y,
      'centerX', centerX,
      'centerY', centerY,
      'panzoomCenterX', panzoomCenterX,
      'panzoomCenterY', panzoomCenterY,
      'panzoomCenterXAdjusted', panzoomCenterXAdjusted,
      'panzoomCenterYAdjusted', panzoomCenterYAdjusted
    );

    // Zoom to the center of the SVG path using panzoom's adjusted coordinate system
    this.panzoomController.zoom(2, {animate: true, focal: {x: panzoomCenterXAdjusted, y: panzoomCenterYAdjusted}});
  }


  reset() {
    this.panzoomController.reset();
  }

  zoomOut() {
    this.panzoomController.zoomOut({ animate: true });
  }

  pan() {
    this.panzoomController.pan(0,0);
  }

  zoom() {
    console.log(this.x, this.y);
    this.panzoomController.zoom(1.5, {animate: true, focal: {x: this.x, y: this.y}});
  }
}
