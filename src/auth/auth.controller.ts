import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Unprotected } from 'nest-keycloak-connect';
import * as passport from 'passport';
import { Strategy } from 'passport-keycloak-oauth2-oidc';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.initializePassport();
  }

  private initializePassport() {
    const strategyOptions = {
      authServerURL: 'https://keycloak-staging.stunited.vn',
      realm: 'quy',
      clientID: 'digieye',
      clientSecret: 'S7TcVrXwtBShNcQjX5bUKOamNDacIMv1',
      callbackURL: 'http://localhost:3000/auth/callback',
      authorizationURL:
        'https://keycloak.example.com/auth/realms/my-realm/protocol/openid-connect/auth',
      tokenURL:
        'https://keycloak.example.com/auth/realms/my-realm/protocol/openid-connect/token',
      userInfoURL:
        'https://keycloak.example.com/auth/realms/my-realm/protocol/openid-connect/userinfo',
    };

    passport.use(
      'keycloak',
      new Strategy(strategyOptions, (tokenset, done) => {
        // Verify tokenset and call `done()` with user information
        // ...
      }),
    );
  }

  // @Post('/login')
  // @Unprotected()
  // getUser(@Body() user: { username: string; password: string }): Promise<any> {
  //   console.log('username: ' + user);

  //   return this.authService.login(user.username, user.password);
  // }
  @Get('login')
  @Unprotected()
  @UseGuards(AuthGuard('keycloak'))
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  callback(@Req() req: any) {
    const { session_state, code } = req.user.tokenset.claims;

    // TODO: save session_state and code to session or database

    return { status: 'success' };
  }
}
