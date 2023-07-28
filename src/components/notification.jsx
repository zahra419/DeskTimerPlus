import {  sendNotification } from '@tauri-apps/api/notification';
import { loadLocalStorageValues } from '../hooks/localStorage';


export   function sendingNotification({title,body}){
if (loadLocalStorageValues().notification) {
  sendNotification({ title, body});
}
}