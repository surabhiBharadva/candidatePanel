import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
const usersKey = 'angular-14-registration-login-example-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                
                case url.endsWith('/candidate/add') && method === 'POST':
                    return register();
                
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        function register() {
            const user = body
            users.push(user);
            localStorage.setItem("hello", JSON.stringify(users));
            return ok();
        }
        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }
       
    }
}
export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};