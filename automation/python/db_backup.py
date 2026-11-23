#!/usr/bin/env python3
"""
PostgreSQL Backup Automation for etalase.online
- Runs pg_dump with gzip compression
- Implements 7-day automated backup retention
"""
import os
import subprocess
import datetime
import glob

BACKUP_DIR = os.getenv("BACKUP_DIR", "/opt/etalase/backups")
DB_CONTAINER = os.getenv("DB_CONTAINER", "etalase_postgres")
DB_USER = os.getenv("DB_USER", "postgres")
DB_NAME = os.getenv("DB_NAME", "etalase_online")
RETENTION_DAYS = 7

def backup():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"{DB_NAME}_{timestamp}.sql.gz")

    print(f"--> Starting backup for {DB_NAME} to {backup_file}...")
    cmd = f"docker exec {DB_CONTAINER} pg_dump -U {DB_USER} -d {DB_NAME} | gzip > {backup_file}"
    res = subprocess.run(cmd, shell=True)

    if res.returncode == 0:
        size_mb = round(os.path.getsize(backup_file) / (1024 * 1024), 2)
        print(f"✓ Backup completed successfully ({size_mb} MB)")
    else:
        print(f"✗ Backup failed with code {res.returncode}")
        return

    # Cleanup backups older than RETENTION_DAYS
    now = datetime.datetime.now()
    for f in glob.glob(os.path.join(BACKUP_DIR, f"{DB_NAME}_*.sql.gz")):
        mtime = datetime.datetime.fromtimestamp(os.path.getmtime(f))
        if (now - mtime).days > RETENTION_DAYS:
            print(f"Removing old backup: {f}")
            os.remove(f)

if __name__ == "__main__":
    backup()
