---
name: create-implementation-plan
description: Создаёт план реализации по спецификации фичи. Запускает subagent create-implementation-plan. Требует Plan Mode. Использовать при «создай план», «plan implementation», «план по спецификации».
---

# План реализации по спецификации

## Требование: Plan Mode

**Перед любыми действиями:** если пользователь НЕ в Plan Mode — немедленно ответь:

```
Для создания плана реализации необходим Plan Mode.
Переключитесь в Plan Mode (выбор режима в Composer) и повторите вызов /create-implementation-plan.
```

Не выполняй создание плана. Не запускай subagent.

## Алгоритм (только если пользователь в Plan Mode)

1. **Определи файл спецификации:**
   - Если пользователь указал файл — используй его
   - Если открыт файл из `docs/features/*.md` — используй его
   - Иначе — возьми последний изменённый файл в `docs/features/` (кроме `_template.md`)

2. **Запусти subagent** `create-implementation-plan`:
   - Передай путь к файлу и его содержимое
   - Subagent сформирует пошаговый план

3. **Сохрани план** в `docs/plans/{X.Y}-{slug}.md` (то же имя, что у spec: для `docs/features/1.3-services.md` → `docs/plans/1.3-services.md`).

4. **Верни пользователю** сформированный план и путь к сохранённому файлу.

## Примеры вызова

- `/create-implementation-plan`
- «Создай план реализации по текущей спецификации»
- «Plan implementation for 1.3-services»
