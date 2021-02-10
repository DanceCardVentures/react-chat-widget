import isEqual from "lodash/isEqual";

export function getDataFromLocalStorage(key: string) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : {};
}

export function setDataToLocalStorage<T>(body: T, key: string) {
  if (body && !(body instanceof Array) && !Object.keys(body).length) return "";
  const raw = JSON.stringify(body);

  localStorage.setItem(key, raw);
}

export function encodeData<T>(body: T) {
  if (body && !(body instanceof Array) && !Object.keys(body).length) return "";
  return JSON.stringify(body);
}

export function makeLocalStorageSync<T>({
  dataToSync,
  key,
}: {
  dataToSync: T;
  key: string;
}) {
  const rawData = localStorage.getItem(key);

  let localStorageDataIsEmptyOrOutdated = false;

  if (!rawData) localStorageDataIsEmptyOrOutdated = true;

  if (rawData) {
    const parsedData = JSON.parse(rawData);
    if (!isEqual(parsedData, dataToSync)) {
      localStorageDataIsEmptyOrOutdated = true;
    }
  }

  if (localStorageDataIsEmptyOrOutdated) {
    setDataToLocalStorage<T>(dataToSync, key);
  }
}
