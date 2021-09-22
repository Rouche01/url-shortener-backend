# Guideline for running the project

1. Create a `.env` file in the root folder of the project. 
2. Add the following variables to the `.env` file:
    ```
    MONGO_URI=[This should be a link to a mongoDB database]
    PORT=4000
    BASE_URL=http://localhost:4000
    ```
3. Run `yarn install` to install required packages to run the app.
4. Finally, run `yarn serve` to startup the app.
