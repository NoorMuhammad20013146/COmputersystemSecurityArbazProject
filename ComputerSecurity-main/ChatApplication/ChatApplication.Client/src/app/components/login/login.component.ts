import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from '../../services/auth/auth.service';
import { BehaviorSubject, last, Observable } from 'rxjs';
import { SessionService } from '../../services/session/session.service';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import { KeyStorageService } from '../../services/keyStorage/key-storage.service';
import { EncryptionService } from '../../services/encryption/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  public loginValid = true;
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  public user$ = this.userSubject.asObservable();
  publicKey$!: Observable<any>;
  allowLogin: boolean = false;
  aliceKeyPair!: CryptoKeyPair;
  bobKeyPair!: CryptoKeyPair;
  catyKeyPair!: CryptoKeyPair;
  enrcryptedMessage!: string;

  // private _destroySub$ = new Subject<void>();
  // private readonly returnUrl: string;

  constructor(private fb :FormBuilder,
    private _router: Router,
    private service: AuthService,
    private _ngZone: NgZone,
    private sessionService: SessionService,
    private dbService: KeyStorageService,
    private encryption: EncryptionService
  ) {
  }
  ngAfterViewInit(): void {
    this.checkForAllowLogin();
  }

  public ngOnInit(): void {
    this.checkForAllowLogin();
  }

  public ngOnDestroy(): void {
  }

  login(){
    if(this.allowLogin)
      this.service.loginWithGitHub();
  }

  checkForAllowLogin(){
    const githubToken = this.service.getToken();
    const jwtToken = this.service.getJWTToken();
    if(githubToken != null && jwtToken != null && !this.service.isTokenExpired()){
      this._router.navigate(['/home']);
    }
    else{
      this.service.logout();
      this.allowLogin = true;
    }
  }
}