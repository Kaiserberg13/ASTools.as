import os
import subprocess
from utils.logger import log

def run(path, info):
    entry = info.get("entry", "Tool.java")
    script_path = os.path.join(path, entry)

    if not os.path.exists(script_path):
        log(f"[x] Java source not found: {script_path}")
        return

    log(f"[*] Compiling and running Java tool: {entry}")

    try:
        # Компиляция
        subprocess.run(["javac", entry], cwd=path, check=True)
        # Определяем имя класса без .java
        class_name = os.path.splitext(entry)[0]
        # Запуск класса
        subprocess.run(["java", class_name], cwd=path, check=True)
    except FileNotFoundError:
        log("[x] Java not found! Please install JDK and add to PATH.")
    except subprocess.CalledProcessError as e:
        log(f"[x] Error executing {entry}: {e}")
