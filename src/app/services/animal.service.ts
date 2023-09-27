import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private _url = 'http://localhost:3000/animals'; 

  constructor(private http: HttpClient) { }

  public getAnimalsX(): Observable<Animal[]>{
    return this.http.get<Animal[]>(this._url);
  }

  public postAnimals(data: Animal): Observable<Animal>{
    return this.http.post<Animal>(this._url, data);
  }
  public deleteAnimal(id: number): Observable<void> {
    const deleteUrl = `${this._url}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  public getOneAnimal(id: number): Observable<Animal> {
    const getUrl = `${this._url}/${id}`;
    return this.http.get<Animal>(getUrl);
  }
  public editAnimal(updatedAnimal: Animal): Observable<Animal> {
    const editUrl = `${this._url}/${updatedAnimal.id}`;
    return this.http.put<Animal>(editUrl, updatedAnimal);
  }
  
  
  
}
