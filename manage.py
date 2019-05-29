import os
import re
import json
import hashlib
from datetime import datetime

from flask import Flask, g, jsonify, make_response, request
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from flask_sqlalchemy import SQLAlchemy
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import BadSignature, SignatureExpired
from passlib.apps import custom_app_context

basedir = os.path.abspath(os.path.dirname(__file__))

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='(%',
        block_end_string='%)',
        variable_start_string='((',
        variable_end_string='))',
        comment_start_string='(#',
        comment_end_string='#)',
    ))

app = CustomFlask(__name__)

# r'/*' 是通配符，让本服务器所有的 URL 都允许跨域请求
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'data.sqlite')

db = SQLAlchemy(app)
auth = HTTPBasicAuth()
CSRF_ENABLED = True
app.debug = True

class JoinInfos(db.Model):
    __tablename__ = 'joininfos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)
    phone = db.Column(db.String(30))
    email = db.Column(db.String(120), index=True)
    addr = db.Column(db.String(120))
    pub_date = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        columns = self.__table__.columns.keys()
        result = {}
        for key in columns:
            if key == 'pub_date':
                value = getattr(self, key).strftime("%Y-%m-%d %H:%M:%S")
            else:
                value = getattr(self, key)
            result[key] = value
        return result

@app.route('/api/users/login', methods=['POST'])
def api_users_login():
    result = {}
    username = request.form.get("username")
    password = request.form.get('password')
    print(password)
    if username == "admin":
        if password == hashlib.md5(b"123456").hexdigest():
            result['code'] = 200
            result['msg'] = '登陆成功!'  
        else:
            result['code'] = 202
            result['msg'] = '用户密码错误!'              
    else:
        result['code'] = 201
        result['msg'] = '用户名错误!'         
    return jsonify(result)
    
@app.route('/api/users/listpage', methods=['GET'])
def api_users_listpage():
    page_size = 4
    page = request.args.get('page', 1, type=int)
    name = request.args.get('name', '')
    query = db.session.query
    if name:
        Infos = query(JoinInfos).filter(
            JoinInfos.name.like('%{}%'.format(name)))
    else:
        Infos = query(JoinInfos)
    total = Infos.count()
    if not page:
        Infos = Infos.all()
    else:
        Infos = Infos.offset((page - 1) * page_size).limit(page_size).all()
    return jsonify({
        'code': 200,
        'total': total,
        'page_size': page_size,
        'infos': [u.to_dict() for u in Infos]
    })        

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0')