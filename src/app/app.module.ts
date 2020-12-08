import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewItemListComponent } from './items/view-item-list/view-item-list.component';
import { AddEditItemComponent } from './items/item-modal/add-edit-item/add-edit-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewItemComponent } from './items/item-modal/view-item/view-item.component';
import { ItemModalComponent } from './items/item-modal/item-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ViewItemListComponent,
    AddEditItemComponent,
    ViewItemComponent,
    ItemModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
