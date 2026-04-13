import ReactDOM from "react-dom/client";
import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";

import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

// eslint-disable-next-line react-refresh/only-export-components
function Root() {
  const colorSchemeManager = localStorageColorSchemeManager();

  return (
    <MantineProvider
      defaultColorScheme="light"
      colorSchemeManager={colorSchemeManager}
      theme={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <App />
    </MantineProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
