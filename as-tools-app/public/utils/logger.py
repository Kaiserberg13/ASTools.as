import datetime
import os

def log(msg):
    print(msg)
    os.makedirs("logs", exist_ok=True)
    with open("logs/ast.log", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.datetime.now()}] {msg}\n")
