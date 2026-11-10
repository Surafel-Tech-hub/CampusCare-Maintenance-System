# Campus Maintenance Request System
INSY3061 – Internet Programming I group project.

## Technology and scope
HTML5, CSS3, JavaScript and browser LocalStorage only. No backend or shared database. This is an academic prototype, not production-ready authentication.

## Implemented features
- Landing and About pages
- Student registration and login
- Demo administrator login
- Student dashboard with request counts
- Submit maintenance requests with validation
- Student request history and status filter
- Admin dashboard with summary counts
- Admin request search, status updates and deletion
- LocalStorage persistence in the current browser

## Run
1. Extract the ZIP and open this folder in VS Code.
2. Use Live Server to open `index.html`.
3. Register a student account, then sign in.
4. To test the administrator view, sign out and use:
   - Email: `admin@campus.edu`
   - Password: `Admin123`

## Important limitations
- LocalStorage data is local to the browser profile/device and is not shared across users or computers.
- Demo passwords are stored in plain text. Use fictional credentials only.
- This is not secure production authentication. Do not store real personal or sensitive data.
- If you previously used an older starter ZIP, extract this updated ZIP into a new folder to avoid missing files.

## Suggested team workflow
Use one shared GitHub repository, agree on file ownership, commit regularly and test the integrated application together.
