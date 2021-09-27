# Web-Based-GIS-Tool-For-Progress-Monitoring
Instructions:

Data for demonstration:
For the purpose of illustrating the working of this tool, a data collection form should be created on ODK Build Application to collect the route details. Next, ODK Collect Application should be installed on mobile phones to access these forms and record the data. For direct demonstration of this tool, an already created data file (from ODK Collect Application) is included in the 'Tool_Demo' folder with the name 'demo.csv'.

Installation Requirements:
1. node.js
2. PostgreSQL - pgAdmin Application

Steps for Monitoring Progress using Web-Based GIS Interface:
1. Download and install node.js and PostgreSQL.
2. Create a database 'demo' on PostgreSQL using the code in the file 'PostgreSQL Code.txt'.
3. Import the .csv file 'demo.csv' into this database.
4. Navigate to the folder 'Tool_Demo' folder in command prompt.
5. Run node.js in command prompt using 'npm start' command and open 'http://localhost:3000/map' in your Web Browser to access the tool interface.
6. Use 'Ctrl+C' in the command prompt to terminate the process.

NOTE: The application was successfully found to be working on Microsoft Windows OS.

![cmd](https://user-images.githubusercontent.com/53266112/134956177-056246bb-14ca-44c2-82c8-215d20d811e1.PNG)

