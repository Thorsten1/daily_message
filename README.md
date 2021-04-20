# daily_message
This project provides a small Express based REST API to run on [repl.it](https://replit.com).

## Local testing
To test or debug this project locally you need to provide the environment variable <code>REPLIT_DB_URL</code>

### ToDos
- Add authorization Tokens for destructive and maybe also non-destructive operations
- Add Daily check so only one message will be prompted per day (always the same)
- Maybe add edit endpoint
- Make use of morgan's extended logging