"""

File:app1.py
Author:wangduoyu
Date:2020-03-01
Connect:854429157@qq.com
Description:

"""
from flask import Flask, render_template, redirect, request, flash, session

app = Flask(__name__)
app.config["SECRET_KEY"]='westos'

users = [
    {
        'username':'root',
        'password':'root'
    }
]

@app.route('/')
def hello_world():
    return render_template('index1.html')


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        # 获取post提交的数据
        username = request.form.get('username')
        password = request.form.get('password')
        for user in users:
            if user['username'] == username and user['password'] == password:
                # session存储用户信息，可以将session理解为字典对象
                session['username'] = username
                print(session)
                flash('登录成功')
                return redirect('/')
            else:
                flash("登录失败")
                return render_template('login.html',errmessages='login fail')


@app.route('/logout/')
def logout():
    session.pop('username')
    flash('登出成功')
    return redirect('/login/')


@app.route('/register/', methods=['GET', 'POST'])
def register():
    """
    1). http请求的为GET方法，直接返回注册界面
    2). http请求的为POST方法，判断注册的用户名是否存在
        --如果不存在，保存用户信息到数据库中
        --如果存在，返回注册界面，重新注册
    :return:
    """
    if request.method == 'GET':
        return render_template('register.html')
    else:
        # 获取post提交的数据
        username = request.form.get('username')
        password = request.form.get('password')
        for user in users:
            if user['username'] == username:
                flash('用户名存在，请重新注册')
                return redirect('/register/')
        else:
            users.append(dict(username=username, password=password))
            flash("注册成功，请登录")
            return redirect('/login/')


# 用户信息分页查看
@app.route('/list/<int:page>/')
def list(page):
    return render_template('list1.html', users=users)


if __name__ == '__main__':
    app.run()
