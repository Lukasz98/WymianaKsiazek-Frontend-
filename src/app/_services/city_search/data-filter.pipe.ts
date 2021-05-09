import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "cityFilter"
})

export class CityFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        console.log(query);
        if (query) {
            //return _.filter(array, row=>row.name.indexOf(query) > -1);
            return _.filter(array, row => {
                let rn = row.name.toLowerCase();
                let que = query.toLowerCase();
                for (let i = 0; i < que.length; i++) {
                    if (i > rn.length) {
                        return 0;
                    }
                    if (rn[i] != que[i])
                        return 0;

                }
                return 1;
            });
        }
        return array;
    }
}
