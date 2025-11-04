import os
import subprocess
from utils.logger import log

def run(path, info):
    entry = info.get("entry", "tool.cpp")
    src_path = os.path.join(path, entry)
    output_path = os.path.join(path, "tool_exec.exe")

    if not os.path.exists(src_path):
        log(f"[x] C++ source not found: {src_path}")
        return

    log(f"[*] Compiling and running C++ tool: {entry}")

    try:
        # Компиляция
        subprocess.run(["g++", entry, "-o", "tool_exec"], cwd=path, check=True)
        # Запуск исполняемого файла
        subprocess.run([os.path.join(path, "tool_exec")], cwd=path, check=True)
    except FileNotFoundError:
        log("[x] g++ not found! Please install GCC or MinGW and add to PATH.")
    except subprocess.CalledProcessError as e:
        log(f"[x] Error executing {entry}: {e}")
