#!/bin/bash
set -e

# Run migrations
echo "Running migrations..."
alembic upgrade head

# Create initial data
echo "Creating initial data..."
python -m app.initial_data

# Start application
echo "Starting application..."
host=${HOST:-0.0.0.0}
port=${PORT:-8000}
uvicorn app.main:app --host $host --port $port --reload
