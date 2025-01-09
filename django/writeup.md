
```sh
python --version
python3 --version
whereis python3
brew update
brew upgrade
pip3 install pipenv
cd django
code ~/.zshrc
export PATH=$PATH:/Users/luispuhl/Library/Python/3.9/bin
zsh
pip3 install pipenv
python3 -m pip install --upgrade pip
pipenv install django
pipenv shell
source /Users/luispuhl/.local/share/virtualenvs/django-k_0WCN1F/bin/activate
django-admin startproject chatroom
django-admin startproject chatroom .
rm -rf chatroom
django-admin startproject chatroom .
rm manage.py
django-admin startproject chatroom .
python3 manage.py
python3 manage.py  runserver
pipenv --venv
/usr/bin/python3 /Users/luispuhl/.vscode/extensions/ms-python.python-2024.22.0-darwin-arm64/python_files/printEnvVariablesToFile.py /Users/luispuhl/.vscode/extensions/ms-python.python-2024.22.0-darwin-arm64/python_files/deactivate/zsh/envVars.txt
ls /Users/luispuhl/.local/share/virtualenvs/django-k_0WCN1F/bin/python3
python3 manage.py startapp rhyme
python3 manage.py
python3 manage.py
python3 manage.py runserver

curl "http://127.0.0.1:8000/"
# Page not found (404)
# 1. admin/
# 2. rhyme/
curl "http://127.0.0.1:8000/rhyme/"
# Page not found (404)
# 1. admin/
# 2. rhyme/ hello/
curl "http://127.0.0.1:8000/rhyme/hello"
# empty
curl "http://127.0.0.1:8000/rhyme/hello/"
# <h1>Hello world</h1>
curl "http://127.0.0.1:8000/rhyme/hello/?q=dave"
# <h1>Hello dave</h1>
```
