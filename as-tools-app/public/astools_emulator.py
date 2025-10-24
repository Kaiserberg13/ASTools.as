import os
import json
import sys
import subprocess
import argparse

# Добавляем корень проекта в sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from utils.logger import log
from interpreters import python_runner, node_runner, cpp_runner, java_runner


def load_info(tool_path):
    """Тут мы читаем info.json из папки инструмента, чтобы всякую инфу узнать"""
    info_file = os.path.join(tool_path, "info.json")
    if not os.path.exists(info_file):
        log(f"[!] info.json not found in {tool_path}")
        return None
    with open(info_file, "r", encoding="utf-8") as f:
        return json.load(f)


def run_tool(tool_name, tools_dir):
    """Запускает инструмент по имени"""
    tool_path = os.path.join(tools_dir, tool_name)
    info = load_info(tool_path)
    if not info:
        log(f"[x] Failed to load info.json for {tool_name}")
        return

    lang = info.get("language")
    entry_file = info.get("entry_file", "code.py")
    entry_path = os.path.join(tool_path, entry_file)
    timed_path = os.path.join(tool_path, "timed.json")

    if not os.path.exists(entry_path):
        log(f"[x] Entry file not found: {entry_path}")
        return
    if not os.path.exists(timed_path):
        log(f"[x] timed.json not found: {timed_path}")
        return

    log(f"→ Running {tool_name} ({lang})")

    try:
        if lang == "python":
            python_runner.run(entry_path, timed_path)
        elif lang == "node":
            node_runner.run(entry_path, timed_path)
        elif lang == "cpp":
            cpp_runner.run(entry_path, timed_path)
        elif lang == "java":
            java_runner.run(entry_path, timed_path)
        else:
            log(f"[x] Unknown language: {lang}")
    except Exception as e:
        log(f"[x] Failed to run {tool_name}: {e}")


def main():
    parser = argparse.ArgumentParser(description="ASTools Emulator")
    parser.add_argument("--tool", required=False, help="Название инструмента для запуска")
    parser.add_argument("--path", required=False, help="Абсолютный путь к папке Tools")

    args = parser.parse_args()

    # Определяем путь к инструментам
    tools_dir = args.path or os.path.join(ROOT_DIR, "tools")

    if not os.path.exists(tools_dir):
        log(f"[x] Tools path not found: {tools_dir}")
        sys.exit(1)

    # Если инструмент не указан, показываем список и просим выбрать (добавь в AST такую возможность. хотя хз, типо, либо выдавать ошибку, либо давай список инструментов, но это сложно и заяес)
    if not args.tool:
        tools = [d for d in os.listdir(tools_dir) if os.path.isdir(os.path.join(tools_dir, d))]
        print("Available tools:")
        for i, t in enumerate(tools, start=1):
            print(f"{i}. {t}")
        choice = int(input("Select tool: ")) - 1
        tool_name = tools[choice]
    else:
        tool_name = args.tool

    run_tool(tool_name, tools_dir)


if __name__ == "__main__":
    main()
