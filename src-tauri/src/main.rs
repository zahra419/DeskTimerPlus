#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]



/*#[tauri::command]
fn time(hr: &str,min:&str,sec:&str) -> String {
    format!(" {}:{}:{}", hr,min,sec)
}*/

fn main() {
  
  tauri::Builder::default() 
  

        
       /* .invoke_handler(tauri::generate_handler![time])*/
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
