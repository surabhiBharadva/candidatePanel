import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AlertOptions, AlertType , Notification} from "../model/Notification";
import { filter } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class NotificationService{

    private subject = new Subject<Notification>();
    private defaultId = 'defualt-notification';
    onNotification(id = this.defaultId) : Observable<Notification>{

    debugger
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    success(message:string,options?: AlertOptions, timeout = 3000){
        this.notification(new Notification({...options,type:AlertType.Success,message,timeout}))
    }

    error(message:string,options?: AlertOptions, timeout = 3000){
        
        this.notification(new Notification({...options,type:AlertType.Error,message,timeout}))
    }
    notification(notification : Notification){
        debugger
        notification.id = notification.id || this.defaultId;

        this.subject.next(notification);
    }
}