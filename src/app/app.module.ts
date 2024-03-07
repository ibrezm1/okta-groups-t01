import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ProfileComponent } from './profile/profile.component';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-9374136.okta.com/oauth2/default',
  clientId: '0oa7q1li0abG6jJKm5d7',
  redirectUri: window.location.origin + '/login/callback'
});


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule.forRoot({ oktaAuth }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


