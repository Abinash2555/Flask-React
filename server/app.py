# this is main page of server page all requests and responds are given to client and take from client from this file 
from flask import Flask, render_template, session, redirect
from functools import wraps
from flask_cors import CORS, cross_origin
from model import User
from QuesApi import QueApi


app = Flask(__name__)
CORS(app) # CORS is an HTTP header-based mechanism that allows a server to designate any other origins (domain, scheme, or port) from which a browser should allow resources to be loaded.

app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5' # a secret key here is used to protection from cooki data tampering during use of sign session cookies.



# Routes
@app.route('/api') # it routes to api page 
@cross_origin()
def home():
   return QueApi().questionList() # retrive that data from QueApi

# this used to signup user 
@app.route('/signup', methods=['POST'])
# @cross_origin()
def signup():
  return User().signup() 

#this used for logout the login user
@app.route('/signout')
@cross_origin()
def signout():
  return User().signout() 

#this is used for login user
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  return User().login()




if __name__ == '__main__':
    app.run(debug=True)