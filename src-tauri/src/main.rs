#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
async fn open_settings_window(app:tauri::AppHandle) -> Result<(), String> {
    let result =tauri::WindowBuilder::new(&app, "settings", tauri::WindowUrl::App("setting.html".into()))
        .fullscreen(false)
        .resizable(true)
        .title("Settings")
        .center()
        .inner_size(300.0,400.0)
        .theme(Some(tauri::Theme::Dark))
        .build();
    match result {
        Ok(_) => {
            println!("Window Created Successfully!");
            Ok(())
        }
        Err(err) => {
            println!("Failed to Create Window {}", err);
            Err("Failed to create Window".to_string())
        }
    }
}



fn main() {
  
    let app= tauri::Builder::default() 
   .invoke_handler(tauri::generate_handler![open_settings_window])
   .run(tauri::generate_context!())
   .expect("error while running tauri application");

}
