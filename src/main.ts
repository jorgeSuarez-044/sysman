import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppConfig } from './app/app.config'; // Importa AppConfig

// Crear una instancia de AppConfig
const appConfig = new AppConfig();

// Pasar AppConfig a la configuración del módulo (esto puede no ser necesario, dependiendo de tu configuración)
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
