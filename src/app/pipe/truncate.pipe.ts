import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number = 50, completeWords: boolean = false): string {
        if(!value){
            return '';
        }

        if(completeWords){
            limit = value.substring(0, limit).lastIndexOf('');
        }      
        return value.length > limit ? value.substring(0, limit) + '...' : value;  
    }
}