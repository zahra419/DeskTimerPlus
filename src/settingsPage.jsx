import FontsList from './components/fontList';
import VolumeHandler from './components/volumeHandler';
import NotificationHandler from './components/notificationHandler';
import BackgroundColorsList from './components/backgroundColorsList';
function SettingsPage(){
  
    return (
       <div className='settings_container'>
        <BackgroundColorsList />
        <VolumeHandler />
        <FontsList/>
        <NotificationHandler/>
       </div>
    )
}
export default SettingsPage;
