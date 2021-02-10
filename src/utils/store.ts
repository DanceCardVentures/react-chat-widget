import { LOCAL_STORAGE_KEY } from "../constants";
import { getDataFromLocalStorage } from "./localStorage";

export function createPreloadedState() {
  const { dialogConfig, widgetParameters } = getDataFromLocalStorage(
    LOCAL_STORAGE_KEY
  );

  return {
    dialogConfig: {
      config: dialogConfig,
      parameters: widgetParameters,
    },
  };
}
