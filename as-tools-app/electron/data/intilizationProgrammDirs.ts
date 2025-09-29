import { theme_dir, tool_dir, VITE_DEV_SERVER_URL } from "../constains";
import Store from 'electron-store';

const store = new Store();

export function initProgrammDirs() {
    if(VITE_DEV_SERVER_URL){
      store.set("mode", "dev");
      if(store.has("incilizated")){
          store.delete("incilizated");
      }
    } else {
      store.set("mode", "production");
      if(!store.has("incilizated")){
          store.set("incilizated", false);
      }
    }

    if(store.has("incilizated")){
      if(!(store.get("incilizated") as boolean)){
          store.delete("tools-dir");
          store.delete("theme-dir");

          initDirInStore("tools", tool_dir);
          initDirInStore("theme", theme_dir);

          store.set("incilizated", true);
      }
    }
}

function initDirInStore(name: string, path: string){
    if(!store.has(`${name}-dir`)) {
        store.set(`${name}-dir`, path);
    }
}