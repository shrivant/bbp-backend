from flask import Flask
from flask import request
import mysql.connector
import json

app = Flask(__name__)

@app.route("/register", methods=['POST'])
def register():
	data = json.loads(request.data)
	try:
		conn = getDbConnection()
		cur = conn.cursor()
		sql = "INSERT INTO bbp_db_username.Users (username, password) VALUES (%s, %s)"	
		vals = (data["username"], data["password"])
		cur.execute(sql, vals)
		conn.commit()
		conn.close()
		return json.dumps({'message': 'User created'})
	except Exception as e: 
		print("Error is: "+str(e))
		return json.dumps({'message': 'User not created'})

@app.route("/product")
def getProductByName():


def getProductById():
	try:
		conn = getDbConnection()
		cur = conn.cursor()
		sql = "SELECT * FROM bbp_db_username.Products WHERE name = %s"	
		vals = (data["username"], data["password"])
		cur.execute(sql, vals)
		conn.commit()
		conn.close()
		return json.dumps({'message': 'User created'})
	except Exception as e: 
		print("Error is: "+str(e))
		return json.dumps({'message': 'User not created'})


# get product by id 
# get all categories
# get all product by category
# buy product api 



def getDbConnection():
	return mysql.connector.connect(host="bbp-db.cguaowfnmopm.us-east-1.rds.amazonaws.com", port=3306, user="bbp_username", password="bbp_password") 


if __name__ == '__main__':
  app.run(debug=True)