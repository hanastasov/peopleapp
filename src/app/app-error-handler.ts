import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleErrorPlus(message: string, error: any): void {
        let jsonError: string;
        try {
            jsonError = JSON.stringify(error);
        } catch {
            jsonError = JSON.stringify(error.message);
        }
        const router = this.injector.get(Router);
        const navigationExtras: NavigationExtras = {
            queryParams: { error: message, errorObject: jsonError }
        };
        router.navigate(['/error'], navigationExtras);
    }

    handleError(error: any): void {
        this.handleErrorPlus('Unhandled error caught by ErrorHandler.', error);
    }
}
