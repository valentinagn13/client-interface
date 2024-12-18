import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User()); //cuando se crea esa clase se crea este parametro y tiene un comportamineto
  constructor(private http: HttpClient) {
    this.verifyActualSession();
  }

  githubLogin(): void {
    // Redirige al endpoint del backend que inicia el proceso de autenticación con GitHub
    window.location.href = `${environment.url_ms_security}/auth/github`;
  }

  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma
   * @param infoUsuario JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(user: User): Observable<any> {
    return this.http.post<any>(
      `${environment.url_ms_security}/security/login`,
      user
    );
  }
  /*
  Guardar la información de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    let data: User = {
      //aqui guarda la informacion del usuario logeado
      _id: dataSesion["user"]["_id"],
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password: "",
      //role:dataSesion["user"]["role"],
      token: dataSesion["token"],
    };
    //importante, localstorage es una base de datos en el navegator osea una cache
    localStorage.setItem("sesion", JSON.stringify(data));
    this.setUser(data);
  }
  /**
   * Permite actualizar la información del usuario
   * que acabó de validarse correctamente
   * @param user información del usuario logueado
   */
  setUser(user: User) {
    //nesecita que le llegue un usuario
    this.theUser.next(user); //variable famosa notifique al todo el munndo que llego un nuevo usuario, asi se guaardo la sesion y notificamos a los componentes que hay un nuevo usuario
  }
  /**
   * Permite obtener la información del usuario
   * con datos tales como el identificador y el token
   * @returns
   */
  getUser() {
    //usuario y se lo tiene como un observavol por si el cambia todos loc componentes miren ese cambio
    return this.theUser.asObservable();
  }
  /**
   * Permite obtener la información de usuario
   * que tiene la función activa y servirá
   * para acceder a la información del token
   */
  public get activeUserSession(): User {
    //nos devuelve o captura el usuario, obtenemos los datos del usuario
    return this.theUser.value;
  }

  /**
   * Permite cerrar la sesión del usuario
   * que estaba previamente logueado
   */
  logout() {
    localStorage.removeItem("sesion");
    this.setUser(new User());
  }
  /**
   * Permite verificar si actualmente en el local storage
   * existe información de un usuario previamente logueado
   */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
   * Verifica si hay una sesion activa
   * @returns
   */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return sesionActual ? true : false;
  }
  /**
   * Permite obtener los dato de la sesión activa en el
   * local storage
   * @returns
   */
  getSessionData() {
    let sesionActual = localStorage.getItem("sesion");
    return sesionActual;
  }
}
