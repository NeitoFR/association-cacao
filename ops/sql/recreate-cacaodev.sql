-- Connect to the PostgreSQL server
\c postgres

-- Forcefully disconnect all other users from the database
REVOKE CONNECT ON DATABASE cacaodev FROM PUBLIC;
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'cacaodev'
AND pid <> pg_backend_pid();

-- Drop the existing database
DROP DATABASE IF EXISTS cacaodev;

-- Create the database
CREATE DATABASE cacaodev;

-- Grant all privileges to the user 'cacaodev'
GRANT ALL PRIVILEGES ON DATABASE cacaodev TO cacaodev;

-- Connect to the new database
\c cacaodev

-- Grant all privileges on all tables, sequences, and functions in the public schema to the user 'cacaodev'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cacaodev;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cacaodev;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO cacaodev;

-- Ensure future tables, sequences, and functions also get the correct privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO cacaodev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO cacaodev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO cacaodev;

GRANT ALL ON DATABASE cacaodev TO cacaodev;
ALTER DATABASE cacaodev OWNER TO cacaodev;


-- Grant all privileges to the user 'backup'
GRANT ALL PRIVILEGES ON DATABASE cacao TO backup;
GRANT ALL ON DATABASE cacao TO backup;

-- Grant all privileges on all tables, sequences, and functions in the public schema to the user 'backup'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO backup;

-- Ensure future tables, sequences, and functions also get the correct privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO backup;

-- Grant all privileges to the user 'backup'
GRANT ALL PRIVILEGES ON DATABASE cacaodev TO backup;
GRANT ALL ON DATABASE cacaodev TO backup;

-- Grant all privileges on all tables, sequences, and functions in the public schema to the user 'cacaodev'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO backup;

-- Ensure future tables, sequences, and functions also get the correct privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO backup;