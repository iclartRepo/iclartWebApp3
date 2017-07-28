﻿import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ManageLoginComponent } from './loginManagement/manageLogins.component';
import { ManageClientsComponent } from './clientManagement/manageClients.component';
import { ClientFormComponent } from './clientManagement/clientForm/clientForm.component';
import { CompetitorAdminComponent } from './competitorManagement/competitorAdmin.component';
import { ClientViewComponent } from './clientManagement/clientDetails/clientDetails.component';

import { AccountService } from './services/account.service';
import { ClientService } from './services/client.service';
import { CompetitorService } from './services/competitor.service';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [ManageLoginComponent, ManageClientsComponent, CompetitorAdminComponent, ClientFormComponent, ClientViewComponent],
    entryComponents: [ManageLoginComponent, ManageClientsComponent, CompetitorAdminComponent, ClientFormComponent, ClientViewComponent],
    providers: [AccountService, ClientService, CompetitorService]
})
export class AppModule {
    ngDoBootstrap(appRef: ApplicationRef)
    {
        try
        {
            appRef.bootstrap(ManageLoginComponent);
        }
        catch (e)
        {
            
        }   

        try {
            appRef.bootstrap(ManageClientsComponent);
        }
        catch (e) {
           
        }   

        try {
            appRef.bootstrap(CompetitorAdminComponent);
        }
        catch (e) {
         
        }   

        try {
            appRef.bootstrap(ClientFormComponent);
        }
        catch (e) {
            console.log(e);
        }  
        try {
            appRef.bootstrap(ClientViewComponent);
        }
        catch (e) {
            console.log(e);
        }          
      
    }
}