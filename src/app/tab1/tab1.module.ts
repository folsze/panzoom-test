import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        NgOptimizedImage,
        InlineSVGModule,
      HttpClientModule
    ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
