import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'QKjxI8hz6HQESWVGAKzFdDfLQiCE0YEu';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  
  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {

    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                        .set('api_key', this._apiKey)
                        .set('limit', '10')
                        .set('q', query);
                        
    
    this.http.get<SearchGIFResponse>(`${this._servicioUrl}/search`,{params})
      .subscribe((resp) => {

        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
