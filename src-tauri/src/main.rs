#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use autopilot::geometry::Point;

#[tauri::command]
fn move_mouse() -> Result<(), String> {
    autopilot::mouse::move_to(Point {
        x: autopilot::screen::size().width - 1.0,
        y: autopilot::screen::size().height - 1.0,
    })
    .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![move_mouse])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
