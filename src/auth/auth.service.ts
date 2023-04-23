import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async login(username: string, password: string): Promise<any> {
    const params = new URLSearchParams({
      client_id: 'digieye',
      response_type: 'code',
      username,
      password,
    });

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      // const response = await axios.post(
      //   'https://keycloak-staging.stunited.vn/realms/quy/protocol/openid-connect/auth',
      //   params,
      //   config,
      // );

      // console.log('response', response);

      // TODO: extract code from response

      const tokenResponse = await axios.post(
        'https://keycloak-staging.stunited.vn/realms/quy/protocol/openid-connect/token',
        params,
        config,
      );

      const { access_token, refresh_token } = tokenResponse.data;

      // TODO: save access token and refresh token to session or database

      return { access_token, refresh_token };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login');
    }
  }
}
