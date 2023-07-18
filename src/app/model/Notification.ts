export class Notification{
    id?: string;
    type ?: AlertType;
    message ?: string;
    autoclose ?: boolean;
    timeout ?: number;
    keepAfterRouteChange ?: boolean;
    fade ?: boolean;
    constructor(init?:Partial<Notification>){
        Object.assign(this,init);
    }
}

export enum AlertType{
    Success,
    Error,
    Info,
}

export class AlertOptions{
    id?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}
