"""
setup_database.py
-----------------
Automated database setup script for Jeseena J's Full-Stack Portfolio.
Checks MySQL connectivity on port 3307, creates the portfolio_db database,
applies Django migrations, and seeds the portfolio with initial projects & skills.
"""
import os
import sys
import subprocess

def run_cmd(cmd, cwd=None):
    print(f"--> Running: {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd)
    if result.returncode != 0:
        print(f"Error executing command: {cmd}")
        return False
    return True

def ensure_mysql_db():
    print("Step 1: Checking MySQL database on 127.0.0.1:3307...")
    try:
        import MySQLdb
        db = MySQLdb.connect(host='127.0.0.1', port=3307, user='root', passwd='')
        cursor = db.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        print("✓ MySQL database 'portfolio_db' ready!")
        db.close()
        return True
    except Exception as e:
        print(f"MySQL connection warning: {e}")
        print("Note: Django will fall back to local SQLite if MySQL is offline.")
        return False

def main():
    print("=" * 60)
    print(" JESEENA J - FULL STACK PORTFOLIO SETUP ")
    print("=" * 60)
    
    ensure_mysql_db()

    backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend')
    
    print("\nStep 2: Applying Django migrations...")
    run_cmd(f'"{sys.executable}" manage.py migrate', cwd=backend_dir)
    
    print("\nStep 3: Seeding portfolio projects, skills and admin account...")
    run_cmd(f'"{sys.executable}" manage.py seed_portfolio', cwd=backend_dir)
    
    print("\nStep 4: Generating official CV PDF from attached resume...")
    run_cmd(f'"{sys.executable}" generate_cv_pdf.py', cwd=os.path.dirname(os.path.abspath(__file__)))
    
    print("\n✓ Database & portfolio setup complete!")
    print("You can now run:")
    print("  run_backend.bat  (starts Django server on http://127.0.0.1:8000)")
    print("  run_frontend.bat (launches React portfolio on http://localhost:3000)")
    print("=" * 60)

if __name__ == '__main__':
    main()
