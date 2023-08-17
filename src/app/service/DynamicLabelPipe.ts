import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dynamicLabel',
    pure: false // This makes the pipe impure, allowing dynamic updates
  })
  export class DynamicLabelPipe implements PipeTransform {
    dynamicLabels!: { [key: string]: string };
  
    constructor(private http: HttpClient) {
      this.fetchDynamicLabels();
    }
  
    private fetchDynamicLabels(): void {
        
      this.http.get<{ [key: string]: string }>('http://localhost:8080/api/labels/dynamic').subscribe(labels => {
        this.dynamicLabels = labels;
      });
    }
  
    transform(key: string): string {
      if (this.dynamicLabels) {
        return this.dynamicLabels[key] || 'Label not found';
      }
      return '';
    }
  }