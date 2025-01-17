import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provides RouterModule functionality
    provideHttpClient(), // Provides HttpClientModule functionality
    importProvidersFrom(ReactiveFormsModule), // Provides ReactiveFormsModule functionality
  ],
}).catch((err) => console.error(err));
