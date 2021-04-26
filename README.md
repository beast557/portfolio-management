**How to run the project?**

To run the project, you need the following software / packages installed on your PC:
1.	MySQL workbench client and server
2.	Postman
3.	nodeJS
First step is to make the database. Go to your MySQL workbench and choose a connection and enter the follow SQL
 
Clone the above file . Go inside the folder and open command prompt and press the below command there,
> npm install
 
After the install is completed go to client folder with 
 > cd client
 
And press the same command
 > npm isntall
 
After completion of installation. Come back to main project folder with 
 > cd..
 
 And run this command
 
 >npm run dev
 
It should open both the frontend and backend server using concurrently. Also a webpage in your browser which is our application.

**How to add new stocks/ company?**

You can use postman to create new stocks via the backend route provided below:

>http://localhost:5000/api/v1/stock/create_stock

**If there is Error while running the server?**

If there is any error make sure to check the available ports in your device.
