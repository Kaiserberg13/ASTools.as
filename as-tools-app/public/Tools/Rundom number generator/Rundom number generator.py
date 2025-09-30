import json
import os
import random

with open("timed_tool_name.json", "r", encoding="utf-8") as f:
    data = json.load(f)--

print("=== Генератор случайных чисел ===")
suuui = data.get("Uuui", 0)
print(f"Ваше первое число: {suuui}, идите назуй!")

unlimited = data.get("Unlimited", False)

if unlimited:
    result = random.randint(0, 1000000)
    print(f"Случайное число (без ограничений): {result}")
else:
    min_num = data.get("MinNum", 0)
    max_num = data.get("MaxNum", 100)

    if min_num > max_num:
        min_num, max_num = max_num, min_num

    result = random.randint(min_num, max_num)
    print(f"Случайное число в диапазоне от {min_num} до {max_num}: {result}")

os.remove("timed_tool_name.json")
print("Временный файл удалён.")