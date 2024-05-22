import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient,) { }
  post(data:object,URL:any){
    const url = `${environment.userBaseURL}${URL}`;
    return this.http.post(url,data);
  }
}
