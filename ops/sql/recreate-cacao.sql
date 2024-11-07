-- Connect to the PostgreSQL server
\c postgres

-- Forcefully disconnect all other users from the database
REVOKE CONNECT ON DATABASE cacao FROM PUBLIC;
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'cacao'
AND pid <> pg_backend_pid();

-- Drop the existing database
DROP DATABASE IF EXISTS cacao;

-- Create the database
CREATE DATABASE cacao;

-- Grant all privileges to the user 'cacao'
GRANT ALL PRIVILEGES ON DATABASE cacao TO cacao;

-- Connect to the new database
\c cacao

-- Grant all privileges on all tables, sequences, and functions in the public schema to the user 'cacao'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cacao;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cacao;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO cacao;

-- Ensure future tables, sequences, and functions also get the correct privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO cacao;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO cacao;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO cacao;

GRANT ALL ON DATABASE cacao TO cacao;
ALTER DATABASE cacao OWNER TO cacao;


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
GRANT ALL PRIVILEGES ON DATABASE cacao TO backup;
GRANT ALL ON DATABASE cacao TO backup;

-- Grant all privileges on all tables, sequences, and functions in the public schema to the user 'cacaodev'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO backup;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO backup;

-- Ensure future tables, sequences, and functions also get the correct privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO backup;