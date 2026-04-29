import sqlite3

DB_NAME = "app.db"


def get_conn():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS analysis_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        mode TEXT,
        name TEXT,
        gender TEXT,
        birthday TEXT,
        star_sign TEXT,
        topic TEXT,
        image_path TEXT,
        free_report TEXT,
        paid_report TEXT,
        is_paid INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS payment_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        session_id TEXT,
        paid INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

def save_payment_session(user_id: str, session_id: str):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO payment_logs (user_id, session_id, paid)
        VALUES (?, ?, 0)
    """, (user_id, session_id))
    conn.commit()
    conn.close()


def mark_payment_paid(session_id: str):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        UPDATE payment_logs
        SET paid = 1
        WHERE session_id = ?
    """, (session_id,))
    conn.commit()
    conn.close()


def is_user_paid(user_id: str) -> bool:
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT 1
        FROM payment_logs
        WHERE user_id = ? AND paid = 1
        ORDER BY id DESC
        LIMIT 1
    """, (user_id,))
    row = cur.fetchone()
    conn.close()
    return row is not None

def get_payment_by_session_id(session_id: str):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT *
        FROM payment_logs
        WHERE session_id = ?
        ORDER BY id DESC
        LIMIT 1
    """, (session_id,))
    row = cur.fetchone()
    conn.close()
    return row

def save_analysis_result(
    user_id: str,
    mode: str,
    name: str,
    gender: str,
    birthday: str,
    star_sign: str,
    topic: str,
    image_path: str,
    free_report: str,
    paid_report: str,
):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO analysis_logs (
            user_id, mode, name, gender, birthday, star_sign, topic,
            image_path, free_report, paid_report, is_paid
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    """, (
        user_id, mode, name, gender, birthday, star_sign, topic,
        image_path, free_report, paid_report
    ))
    conn.commit()
    conn.close()


def get_latest_analysis_by_user_id(user_id: str):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT *
        FROM analysis_logs
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1
    """, (user_id,))
    row = cur.fetchone()
    conn.close()
    return row

def get_recent_analysis_records(limit: int = 20):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, user_id, mode, name, gender, birthday, star_sign, topic, image_path, is_paid, created_at
        FROM analysis_logs
        ORDER BY id DESC
        LIMIT ?
    """, (limit,))
    rows = cur.fetchall()
    conn.close()
    return rows


def get_recent_payment_records(limit: int = 20):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, user_id, session_id, paid, created_at
        FROM payment_logs
        ORDER BY id DESC
        LIMIT ?
    """, (limit,))
    rows = cur.fetchall()
    conn.close()
    return rows


def get_basic_stats():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) AS cnt FROM analysis_logs")
    total_analyses = cur.fetchone()["cnt"]

    cur.execute("SELECT COUNT(*) AS cnt FROM payment_logs WHERE paid = 1")
    total_paid = cur.fetchone()["cnt"]

    cur.execute("SELECT COUNT(*) AS cnt FROM analysis_logs WHERE mode = 'profile'")
    profile_count = cur.fetchone()["cnt"]

    cur.execute("SELECT COUNT(*) AS cnt FROM analysis_logs WHERE mode = 'palm'")
    palm_count = cur.fetchone()["cnt"]

    cur.execute("""
        SELECT COUNT(DISTINCT user_id) AS cnt
        FROM analysis_logs
    """)
    unique_users = cur.fetchone()["cnt"]

    conn.close()

    conversion_rate = 0
    if total_analyses > 0:
        conversion_rate = round((total_paid / total_analyses) * 100, 2)

    return {
        "total_analyses": total_analyses,
        "total_paid": total_paid,
        "profile_count": profile_count,
        "palm_count": palm_count,
        "unique_users": unique_users,
        "conversion_rate_percent": conversion_rate,
    }