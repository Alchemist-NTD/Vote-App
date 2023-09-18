# Vote-App
This is my Vote app

# Following these below steps to deploy application

**Run Server**
```
Docker compose build
Docker compose up
```

**Migrate Django Posgresql**
```
Docker compose exec backend bash
cd vote
python manage.py migrate vote
exit
```

**Import user data**
```
docker compose exec database sh
psql -U vote_admin -d vote_db -f /home/user_import.sql
```

**For Any Error occurs with Frontend**
```
Docker compose exec frontend sh
npm install
exit
```

**For Any Error occurs with Permission**

Run this command at root directory of Project

```
sudo chown $USER:$USER -R .
```

**For Any One want to access admin site (Optional)**

But note that these command have to execute after the step importing database was success.

```
Docker compose exec backend bash
cd vote
python manage.py createsuperuser
<type email>
<type password>
```

after that, you can login by created username and password to <a href='http://localhost:8000/admin'>admin site</a>

**Access Web App**
- Enter the site <a href='http://localhost:8000/admin'>Admin</a> to access administrator site
- Enter the site <a href='http://localhost:3000/'>Application</a> to access web app


**AWS deployed**