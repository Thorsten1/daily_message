# daily_message
This project provides a small Express based REST API to run on [repl.it](https://replit.com).

## security
Because this is just a small project that shouldn't store sensitive information there is no authentication but just an 
authorisation. For this to work you need to export the following environment variables: <code> USER_TOKEN
</code> and <code>ADMIN_TOKEN</code>. The first one is needed when you want to restrict the User access, and the second 
one for all calls that edit the database.

## Local testing
To test or debug this project locally you need to provide the environment variable <code>REPLIT_DB_URL</code>
<br> This variable needs to be refreshed because the url token will expire. The respone would be something like <code>
invalid token: token is expired by ...</code>
### ToDos
- Add authorization Tokens for destructive and maybe also non-destructive operations
- Add Daily check so only one message will be prompted per day (always the same)
- Maybe add edit endpoint
- Make use of morgan's extended logging