import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p *ngIf="name$ | async as name">
        Hello {{name}}!
    </p>
    <h4>Profile Details</h4>
    <textarea rows="10" cols="50">{{ user | json }}</textarea>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;
  user: any; // Variable to store user details

  constructor(private _oktaAuthStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    this.logOktaUserDetails();

  }
  async logOktaUserDetails(): Promise<void> {
    try {
      this.user = await this._oktaAuth.getUser();
    } catch (error) {
      console.error('Error fetching user details from Okta:', error);
    }
  }
}