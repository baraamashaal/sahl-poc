# Core Module

The core module contains singleton services and application-wide functionality that should be initialized once when the application starts.

## What Goes Here?

### Authentication & Authorization
- Authentication services
- Auth guards
- Token interceptors
- User session management

### Error Handling
- Global error handlers
- Error interceptors
- Error logging services

### API Communication
- Base HTTP client services
- API configuration
- Request/response interceptors

### App Configuration
- Environment configuration
- Feature flags
- Application settings

## What Doesn't Go Here?

- Domain-specific services (use domain/services instead)
- Feature-specific logic (use features/services instead)
- UI components (use shared/ui or features/ui instead)

## Directory Structure

```
core/
├── auth/
│   ├── services/
│   │   └── auth.service.ts
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── role.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   └── models/
│       └── user.model.ts
├── error-handling/
│   ├── services/
│   │   └── error.service.ts
│   └── interceptors/
│       └── error.interceptor.ts
├── config/
│   ├── app.config.ts
│   └── environment.service.ts
└── api/
    ├── api-client.service.ts
    └── api.config.ts
```

## Example: Auth Service

```typescript
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUser = signal<User | null>(null);

  // Expose as readonly
  user = this.currentUser.asReadonly();
  isAuthenticated = computed(() => this.currentUser() !== null);

  async login(email: string, password: string) {
    const user = await this.http.post<User>('/api/auth/login', { email, password });
    this.currentUser.set(user);
    return user;
  }

  logout() {
    this.currentUser.set(null);
  }
}
```

## Example: Auth Guard

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```

## Example: HTTP Interceptor

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.user();

  if (user?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};
```

## Registration

Register core services and interceptors in `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { errorInterceptor } from './core/error-handling/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};
```

## Best Practices

1. **Single Responsibility**: Each service should have one clear purpose
2. **Singleton Pattern**: All core services use `providedIn: 'root'`
3. **Use Signals**: For reactive state management
4. **Functional Guards**: Use `CanActivateFn` instead of class-based guards
5. **Functional Interceptors**: Use `HttpInterceptorFn` instead of class-based
6. **Dependency Injection**: Use `inject()` function instead of constructor
7. **Error Handling**: Centralize error handling logic
8. **Type Safety**: Use strict TypeScript types

## Common Core Services

### AuthService
Manages authentication state and operations

### ErrorService
Handles global error logging and display

### ApiClientService
Base HTTP client with common configuration

### ConfigService
Application configuration management

### NotificationService
Global notifications/toasts

### LoadingService
Global loading indicators

### LocalStorageService
Safe localStorage wrapper with typing
