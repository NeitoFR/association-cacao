#!/bin/bash
set -e

echo "Starting database backup..."

# Define variables
TIMESTAMP=$(date +"%F")
BACKUP_DIR="/$TIMESTAMP"
DBS_TO_BACKUP=$(echo $DB_TO_BACKUP | tr ',' ' ')
S3_BUCKET="your-s3-bucket-name"
GPG_PASSPHRASE="your-gpg-passphrase"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Loop through each database and perform the backup
for DB_NAME in $DBS_TO_BACKUP; do
    BACKUP_FILE="$BACKUP_DIR/$DB_NAME.sql"
    ENCRYPTED_BACKUP_FILE="$BACKUP_FILE.gpg"
    
    echo "Backing up database: $DB_NAME"
    PGPASSWORD=$DB_PASSWORD pg_dump -U $DB_USER -h $DB_HOST $DB_NAME > $BACKUP_FILE
    
    echo "Encrypting backup file: $BACKUP_FILE"
    gpg --batch --yes --passphrase $GPG_PASSPHRASE --symmetric --cipher-algo AES256 -o $ENCRYPTED_BACKUP_FILE $BACKUP_FILE
    
    # Remove the unencrypted backup file
    rm $BACKUP_FILE
done

echo "Uploading backup directory to S3..."
s3cmd put --recursive $BACKUP_DIR s3://$S3_BUCKET/

echo "Database backup and upload completed."