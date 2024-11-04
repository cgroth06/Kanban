import { JwtPayload, jwtDecode } from 'jwt-decode';

//12-26 activity
class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.exp ? Date.now() >= decodedToken.exp * 1000 : false;
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');

  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
