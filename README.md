![LTO github readme](https://user-images.githubusercontent.com/100821/196711741-96cd4ba5-932a-4e95-b420-42d4d61c21fd.png)

# Web Wallet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This will also run a mock server (with [json-server](https://www.npmjs.com/package/json-server)) for local development. Currently it mocks the data from LTO bridge, because that is not maintained on testnet environment. See the `mock-data` folder to change the data from this server.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `:testnet` or `:mainnet` to build for different environment