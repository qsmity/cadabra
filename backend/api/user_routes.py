from flask import Blueprint, jsonify
from backend.models import User
from flask import request
from ..forms import SignUpForm, LoginForm
from ..models import User, db
from flask_login import current_user, login_user, logout_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {'users': [user.to_dict() for user in response]}


@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:  # noqa
        return {'user': current_user.to_dict()}
    signup_info = request.json
    form = LoginForm(email=signup_info['email'],
                     password=signup_info['password'],
                     csrf_token=request.headers['x-Csrftoken'])
    if form.validate_on_submit():
        user_email = form.email.data
        user = User.query.filter(User.email == user_email).first()
        if not user or not user.check_password(form.password.data):
            return {'error', 'no match found for email and password'}
        login_user(user)
        print('='*30, {'user': user.to_dict()})
        return {'user': user.to_dict()}
    print(form.errors)
    return form.errors, 401


@user_routes.route('/signup', methods=['POST'])
def signup():
    # current user saves the previous logged in user which will be authenticated so you need to check if the current user
    # and the inputed email in the signup forms match before return the current authenticated user if they already exist
    if current_user.is_authenticated and current_user.email == request.json['email']:
        return current_user.to_dict()
    signup_info = request.json
    # print(signup_info['password'], signup_info['confirmPassword'])
    form = SignUpForm(firstname=signup_info['firstName'],
                      lastname=signup_info['lastName'],
                      email=signup_info['email'],
                      password=signup_info['password'],
                      confirm_password=signup_info['confirmPassword'],
                      csrf_token=request.headers['X-Csrftoken'])
    if form.validate_on_submit():
        user = User(first_name=signup_info['firstName'],
                    last_name=signup_info['lastName'],
                    email=signup_info['email'],
                    password=signup_info['password'])
        db.session.add(user)
        db.session.commit()
        return {'user': user.to_dict()}
    print(form.errors)
    return form.errors, 401


@user_routes.route('/get_csrf')
def get_csrf_token():
    form = LoginForm()
    return {'csrfT': form.csrf_token._value()}


@user_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'successfully logged out'}
