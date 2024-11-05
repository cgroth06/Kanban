import { JwtPayload, jwtDecode } from 'jwt-decode';

//12-26 activity
class AuthService {
  getProfile() {

    const token = this.getToken();
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {

    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {

    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.exp ? Date.now() >= decodedToken.exp * 1000 : false;
  }

  getToken(): string {

    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser
  }

  login(idToken: string) {

    localStorage.setItem('token', idToken);

    window.location.assign('/');

  }

  logout() {

    localStorage.removeItem('token');

    window.location.assign('/');
  }
}

export default new AuthService();
