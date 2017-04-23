# Marsala Business lunch assistant


Steps of work:
1. The restaurant sends the menu as a "docx" or "xlsx" file for the next few days to the organization's mailbox
2. The application parses the file and loads the list of available dishes into the database
3. Users authorize on the site and order their own lunch
4. After all users have made an order, the application will send a general order to the restaurant's mail.


Technologies:

- WPF (MVVM Catel) - old offline parser
- ASP.NET Core (Web API + SignalR) - backend
- Angular 2 - frontend
