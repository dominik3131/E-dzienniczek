release: python manage.py makemigrations && python manage.py migrate --fake-initial
web: gunicorn backend.wsgi --log-file -