import os
import subprocess
from utils.logger import log

def run(path, info):
    entry = info.get("entry", "tool.js")
    script_path = os.path.join(path, entry)

    if not os.path.exists(script_path):
        log(f"[x] Script not found: {script_path}")
        return

    log(f"[*] Running Node.js tool: {entry}")

    try:
        # Запускаем через Node.js прямо из каталога инструмента
        subprocess.run(["node", entry], cwd=path, check=True)
    except FileNotFoundError:
        log("[x] Node.js not found! Please install it and add to PATH.")
    except subprocess.CalledProcessError as e:
        log(f"[x] Error executing {entry}: {e}")
