Basic identity and cookie for React frontend and REST Api backend

Checklist:
- [ ] Make sure your Database Context inherits from IdentityDbContext<User>
- [ ] Make sure User inherits from IdentityUser
- [ ] In Startup.ConfigureServices, Look at lines 32 33 34 38 and 41:
- [ ] Make sure you have equivalent calls in your startup.cs
- [ ] In Startup.Configure, lok at lines 63 64 69 70 72 73 74 75
- [ ] Make sure you have equivalent calls in your startup.cs
- [ ] make sure you update the database
- [ ] Make sure you have an AccountController in Controllers folder.
- [ ] Make sure it inherits from Controller, uses the [ApiController] attribute
- [ ] and has the appropriate services injected and look at the methods and attributes.
- [ ] [IgnoreAntiforgeryToken] is very important for login and register methods to work.
- [ ] After this, you should be able to put [Authorize] and [ValidateAntiForgeryToken]
 attributes should work on methods in other ApiControllers.

# React client
- [ ] Look at ClientApp/src/components/NavMenu.js and specifically the login method.
Look at the properties for the headers, method, credentials and body for the
fetch request. These are all important.
