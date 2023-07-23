# Vote-App
This is my Vote app

**Import user data**

'''
docker compose exec database sh
psql -U vote_admin -d vote_db -f /home/user_import.sql
'''