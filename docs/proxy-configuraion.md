# How to configure Proxy in angular project to prevent CORS error

- change API urls

  ```
  'https://localhost:5001/api/{items}' --> '/api/{items}'
  ```

- add `src/proxy.conf.json` with following contents

  ```
  {
      "/api": {
      "target": "https://localhost:5001/",
      "secure": false,
      "logLevel": "debug"
      }
  }
  ```

- include proxy settings in dev build, edit `angular.json`
  ```
  "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
          "browserTarget": "ui:build",
       -->"proxyConfig": "src/proxy.conf.json" <---
        },
        "configurations": {
          "production": {
            "browserTarget": "ui:build:production"
          }
        }
      },
  ```
