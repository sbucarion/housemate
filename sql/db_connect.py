import pymysql as sql

db = sql.connect(host="server-db.cidiojll3pvh.us-east-1.rds.amazonaws.com", password="12345678", user="admin", port=3306)
# sql_file = open('show_dbs.sql','r')
# commands = sql_file.read()

cursor = db.cursor()
cursor.execute("""USE user_db""")
#cursor.execute("CREATE DATABASE user_db")
#cursor.execute("""UPDATE auth_user SET is_superuser = 1, is_staff = 1 WHERE id = 8""")
db.commit()
cursor.close()
db.close()