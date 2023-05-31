import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        NgOptimizedImage,
        InlineSVGModule,
      HttpClientModule
    ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
