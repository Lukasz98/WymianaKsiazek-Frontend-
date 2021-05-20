import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IOption} from 'ng-select';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

class Address implements IOption {
value: any;
label: string;
id: any;
name: string;
wojewodztwo: string;
powiat: string;
gmina: string;
offers: number[];
}

@Injectable()
export class SelectCityService {
  public static PLAYER_ONE: Array<Address> = [
    //{value: '0', label: 'Alabama'},
    //{value: '1', label: 'Wyoming'},
    //{value: '2', label: 'Coming'},
    //{value: '3', label: 'Henry Die'},
    //{value: '4', label: 'John Doe'}
  ];
  public queryDone : boolean;
  //public urll = 'https://localhost:5001/address/'; 
  public urll = environment.apiUrl + 'address/';
  

  constructor(public http : HttpClient) {
    //this.doQuery();
  }

    getCharacters(): Array<IOption> {
        return this.cloneOptions(SelectCityService.PLAYER_ONE);
    }

    getString(id) {
        if (!id) {
            return " ";
        }
        let tmp = SelectCityService.PLAYER_ONE.find(s => s.id == id);
        return tmp.name + ', gm. ' + tmp.gmina + ', woj. ' + tmp.wojewodztwo;
    }

    //doQuery(input) : Observable<Address[]> {
    doQuery(input) {

      return this.http.get<Address[]>(this.urll + input);
      /*
      .subscribe(
        (response) => {
          console.log("response recv");
          console.log(response)
          this.queryDone = true;
          SelectCityService.PLAYER_ONE = response
          //this.cities = response
          //console.log(this.cities);
        });
    */
    }

    loadCharacters(): Observable<Array<IOption>> {
        console.log("load chars");

          //console.log("zwracam")
        return this.loadOptions(SelectCityService.PLAYER_ONE);
    }

    getCharactersWithDisabled(): Array<IOption> {
        const characters: Array<IOption> = this.cloneOptions(SelectCityService.PLAYER_ONE);
        characters[1].disabled = true;
        characters[4].disabled = true;
        return characters;
    }
/*
    getCountries(): Array<IOption> {
        return this.cloneOptions(SelectCityService.COUNTRIES);
    }

    loadCountries(): Observable<Array<IOption>> {
        return this.loadOptions(SelectCityService.COUNTRIES);
    }
*/
    private loadOptions(options: Array<Address>): Observable<Array<IOption>> {
        return new Observable((obs) => {
            setTimeout(() => {
                obs.next(this.cloneOptions(options));
                obs.complete();
            }, 5000);
        });
    }

    private cloneOptions(options: Array<Address>): Array<IOption> {
        //return null;
        return options.map(option => ({ value: option.id, label: option.name + ' gm. ' + option.gmina + ' pow. ' + option.powiat + ' woj. ' + option.wojewodztwo}));
        //return options.map(option => ({ value: option.id, label: option.name + ' id. ' + option.id + ' gm. ' + option.gmina + ' pow. ' + option.powiat + ' woj. ' + option.wojewodztwo}));
        //return options.map(option => ({ value: option.id, label: option.name }));//+ ' id. ' + option.id + ' gm. ' + option.gmina + ' pow. ' + option.powiat + ' woj. ' + option.wojewodztwo}));
    }
}
