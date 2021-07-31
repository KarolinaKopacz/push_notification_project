import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import { store, persistor } from "./redux/User/store";

import { PersistGate } from "redux-persist/es/integration/react";
// import { storeNotification } from "./redux/Notification/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Provider store={storeNotification}> */}
        <App />
        {/* </Provider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
