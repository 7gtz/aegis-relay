# Analysis core

This Python service owns the security conclusions displayed in the Aegis Relay workspace. It validates observations, reconstructs graphs, evaluates PS-001 and PS-002, compares registered controls, and verifies simulated responses.

## Start locally

```bash
uv sync --group dev --locked
uv run uvicorn aegis_relay_core.main:app --host 127.0.0.1 --port 8000
```

The generated API reference is at <http://127.0.0.1:8000/docs>. Fixtures are fictional; the service does not call a model or contact the systems named by those fixtures.

## Check and regenerate

```bash
uv run ruff format --check src tests
uv run ruff check src tests
uv run mypy
uv run pytest -q
uv run python -m aegis_relay_core.contract
uv run python -m aegis_relay_core.snapshot
```

The suite has 195 tests covering unit guarantees, HTTP integration, generated contracts, and property-based invariants. CI checks generated artifacts for drift.

Read [Architecture](../../docs/ARCHITECTURE.md) for module ownership, graph direction, planning, and verification. The [operator guide](../../docs/OPERATOR_GUIDE.md) explains how the console presents these results.
