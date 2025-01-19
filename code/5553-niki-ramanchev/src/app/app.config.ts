import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Ensure routes is exported in app.routes.ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables zone-less change detection with event coalescing
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Provides the router with the configured routes
    provideRouter(routes),
    // Provides the HTTP client with fetch-based HTTP backend
    provideHttpClient(withFetch()),
  ],
};
