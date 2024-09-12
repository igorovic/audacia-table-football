#!/bin/sh

# This script is used to initialize the database and start the backend
# in a Docker container.
# It is used to ensure the database is initialized before starting the backend.
# Since the db initialization use child_process, it has some side effects
# when running in development mode with turbo. Hence this separate script to
# keep DX (developer experience) good.

# Initialize the database
npx tsx scripts/initdb.ts

# Start the backend
npm run start
