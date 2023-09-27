import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarjetaElement, Animal } from '../models/tarjeta'; 
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private _url = 'http://localhost:3000'; // Adjust the URL to match your server endpoint
	

  constructor(private http: HttpClient) { }

  public getTarjetas(): Observable<TarjetaElement[]> {
    return this.http.get<TarjetaElement[]>(`${this._url}/tarjetas`);
  }
  
  public getTarjeta(id: number): Observable<TarjetaElement> {
    return this.http.get<TarjetaElement>(`${this._url}/tarjetas/${id}`);}

  public postTarjeta(tarjeta: TarjetaElement): Observable<TarjetaElement> {
    return this.http.post<TarjetaElement>(`${this._url}/tarjetas`, tarjeta);
  }

  public editTarjeta(id: number, tarjeta: TarjetaElement): Observable<TarjetaElement> {
    return this.http.put<TarjetaElement>(`${this._url}/tarjetas/${id}`, tarjeta);
  }

  public deleteTarjeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this._url}/tarjetas/${id}`);
  }

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this._url}/animals`);
  }
  
}
