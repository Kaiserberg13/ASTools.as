import os
import json

# Загружаем данные от AST
data = json.loads(os.environ.get("AST_VARS", "{}"))

# Извлекаем переменные
num1 = data.get("Number1", 0)
num2 = data.get("Number2", 0)
operation = data.get("Operation", "+")
show_steps = data.get("ShowSteps", False)

# Вычисляем результат
result = None
try:
    if operation == "+":
        result = num1 + num2
    elif operation == "-":
        result = num1 - num2
    elif operation == "*":
        result = num1 * num2
    elif operation == "/":
        result = num1 / num2 if num2 != 0 else "Ошибка: деление на ноль!"
    else:
        result = "Неизвестная операция!"
except Exception as e:
    result = f"Ошибка: {e}"

# Вывод результата
if show_steps:
    print(f"Число 1: {num1}")
    print(f"Число 2: {num2}")
    print(f"Операция: {operation}")
    print("----------------------")

print(f"Результат: {result}")
