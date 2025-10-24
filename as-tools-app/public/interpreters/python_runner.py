import os
import sys
import json
import subprocess
import importlib.util

# === Исправление путей ===
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.logger import log


def ensure_libs(requirements):
    """Проверяет наличие библиотек и устанавливает при необходимости."""
    if not requirements:
        return
    for lib in requirements:
        try:
            importlib.util.find_spec(lib)
            log(f"[✓] Library '{lib}' found")
        except ImportError:
            log(f"[↓] Installing missing library: {lib}")
            subprocess.check_call([sys.executable, "-m", "pip", "install", lib])


def run(entry_path, timed_json):
    """Запускает Python-инструмент с переменными из timed.json"""
    if not os.path.exists(entry_path):
        log(f"[x] Entry file not found: {entry_path}")
        return
    if not os.path.exists(timed_json):
        log(f"[x] timed.json not found: {timed_json}")
        return

    # Загружаем данные из timed.json
    with open(timed_json, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Передаём переменные в окружение
    env = os.environ.copy()
    env["AST_VARS"] = json.dumps(data, ensure_ascii=False)

    log(f"[*] Running Python script: {entry_path}")
    try:
        subprocess.run([sys.executable, entry_path], check=True, env=env)
    except subprocess.CalledProcessError as e:
        log(f"[x] Python script failed with code {e.returncode}")
    except Exception as e:
        log(f"[x] Unexpected error: {e}")
