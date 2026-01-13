# srn-spaceships

Pasos para montar backend
1) cd backend
2) docker compose up

Pasos para montar app
1) cd app
2) npm install
3) npx expo prebuild
4) Tener un emulador abierto o un dispositivo con las herramientas de desarrollo activas
5) npx expo run:android


○ Respuestas a las siguientes preguntas técnicas:
■ EAS Build: Describe los pasos y configuración necesaria en eas.json para generar .apk e .ipa de producción.
R:
1) Crear una cuenta en: expo.dev
2) Instalar eas globalmente: npm i -g eas-cli
3) Iniciar sesión en cuenta de expo: eas login
4) Generar archivo de configuración: eas build:configure
5) Para generar un apk e ipa se usa la siguiente configuración:

"app-release": {
  "distribution": "internal",
  "channel": "preview",
  "android": {
    "gradleCommand": ":app:assembleRelease",
    "buildType": "apk"
  }
  "ios_export": {
    "buildType": "export",
    "distribution": "internal"
  }
},


■ Offline First: Si la app debiera funcionar sin internet, ¿qué estrategia de BD local usarías (SQLite, Realm, etc.) y por qué?

R: Debido a la naturaleza de la aplicación es conveniente usar una base de datos simple y rapida, por ello, usuaria SQLite, ya que es una base de datos de facil montaje local, sencilla y eficiente en cuanto a la rapidez con la que se pueden hacer consultas sobre ella

■ Apple Guideline 4.2: Si Apple rechaza la app por "Minimum Functionality", ¿qué solución técnica o de producto propondrías?

R: A nivel de producto lo extenderia para que cuente con al menos 6 secciones de contenido. A nivel tecnico realizaria el desarrollo de dichas secciones usando la mayor cantidad de componentes nativos posible.
