import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent, NotfoundComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    FontAwesomeModule,
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
