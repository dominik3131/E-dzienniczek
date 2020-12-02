## Requirements:

node 14.15.0
yarn 1.22.10
python 3.9
pip 20.2.4
Poetry  1.1.4

## Front

### `yarn add react-scripts`
before first start run

### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.


## Backend

### `poetry shell`
Enters virtual enviroment

### All below commands need to be used in virtual enviroment

### `pip install -r requirement.txt`
Installs required dependencies from requirements.txt for virtual enviroment
Run every time after `git pull` if file `requirement.txt` changed

### `pip install <package_name>`
Installs new package

### `pip freeze > requirements.txt`
Saves dependencies from virtual enviroment to requirements.txt
Run always after `pip install <package_name>`

### `python manage.py runserver`
Starts backend
If some changes were made to frontend run `yarn build` before running this
server starts at port 8000
Open [http://localhost:8000](http://localhost:8000) to view site builded using `yarn build`
Open [http://localhost:8000/admin/](http://localhost:8000/admin/) to access django admin page

### `exit`
Leave virtual enviroment
