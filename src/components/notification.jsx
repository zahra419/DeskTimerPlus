import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { loadLocalStorageValues } from '../hooks/localStorage';

export async function notification({title,body}){
let permissionGranted = await isPermissionGranted();
if (!permissionGranted) {
  const permission = await requestPermission();
  permissionGranted = permission === 'granted';
}
if (permissionGranted & loadLocalStorageValues().notification) {
  sendNotification({ title, body});
}
}