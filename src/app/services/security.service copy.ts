import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User()); //* CUANDO LA PAGINA SE CARGA  ARRANCA VACIA
  constructor(private http: HttpClient) {
    this.verifyActualSession(); //* CAUDNO SE INICIALIZA EL SERVICIO SE VERIFICA LA SESSION ACTUAL
  }

  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma
   * @param infoUsuario JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(user: User): Observable<any> {
    // *LLAMADO AL MICROSERVICIO DE SEGURIDAD, SE LE MANDA EL USER = EL BODY DE ESA PETICIÓN
    return this.http.post<any>(
      `${environment.url_ms_security}/security/login1`,
      user
    );
  }
  /*
  Guardar la información de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    let data: User = {
      //* REARMAR EL USER
      _id: dataSesion["user"]["_id"], //* COJE EL USUARIO Y TOMA EL ID DE ESE USER EN EL DICCIONARIO
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password: "",
      //  role: dataSesion["user"]["role"],
      token: dataSesion["token"],
    };
    //* GUARDA EN EL LOCAL STORAGE EL DATA - SE RESTAURA EL TOKEN SI SE APAGA EL PC SI EL TOKEN DURA
    localStorage.setItem("sesion", JSON.stringify(data)); //* SE GUARDA EN EL LOCAL STORAGE LA INFO
    this.setUser(data); //como un observador
  }
  /**
   * Permite actualizar la información del usuario
   * que acabó de validarse correctamente
   * @param user información del usuario logueado
   */
  setUser(user: User) {
    this.theUser.next(user); //* COGE LA VARIABLE Y NOTIFICA QUE HAT UN USER  NOTIFICA A TODO EL MUNDO QUE HAY UN USER LOGUEADO
  }
  /**
   * Permite obtener la información del usuario
   * con datos tales como el identificador y el token
   * @returns
   */
  getUser() {
    //* si hay un cambio notifica a todos
    return this.theUser.asObservable();
  }
  /**
   * Permite obtener la información de usuario
   * que tiene la función activa y servirá
   * para acceder a la información del token
   */
  public get activeUserSession(): User {
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
    let actualSesion = this.getSessionData(); //* MIRA EN EL LOCAR STORAGE SI HAY UNA SESSION
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
   * Verifica si hay una sesion activa
   * @returns
   */
  // PARA SABER WSI HAY ALGUIEN LOGUEADO
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
    let sesionActual = localStorage.getItem("sesion"); //* VERIDICA SI HAY ALGO EN EL LOCAL STOREGE
    return sesionActual;
  }
}
