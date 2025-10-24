import subprocess
import os
from utils.logger import log

def ensure_python_deps(path, deps):
    if not deps:
        return
    venv_path = os.path.join(path, "venv")
    if not os.path.exists(venv_path):
        log("Creating virtual environment...")
        subprocess.run(["python", "-m", "venv", venv_path])

    pip = os.path.join(venv_path, "Scripts", "pip.exe")
    for dep in deps:
        log(f"Checking {dep}...")
        subprocess.run([pip, "install", dep])
