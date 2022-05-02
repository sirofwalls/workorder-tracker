<div align="center"><h1>Beyond the Bit Work Order App</h1></div>

<h5>MySQL database schema is located in backend/models/mysqlSchema.sql </h5><i>You can use this in phpmyadmin to create the database and tables</i>
</br></br>
<b>Prerequisits:</b>
<ul>
<li>Node version 16.14.2</li>
<li>NPM version 8.5.0</li>
</ul>
<i>I recomend using NVM (node version manager) 
<a href="https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/">Guide found here</a></i>
</br></br>
<b>How to install:</b> <i>On a debian based linux (Like Ubuntu)</i>
<ul>
<li>Clone the repository and enter the directory with "cd" command <i><pre>cd btb-job</pre> (As an example)</i></li>
<li>Run the command <pre>npm i && cd frontend && npm i && npm run build && cd ..</pre></li>
<li>Rename the .env.example to .env</li>
<li>Change the values in the .env fileds. <i>(These are secrets... do not share them with anyone who does not need 100% access to the app)</i></li>
<ul>
<li>NODE_ENV should be set to 'production'</li>
<li>PORT set to '5000' </li>
<li>JWT_SECRET can be generated with the command "node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"" <i> with only the inner-most quotation marks</i></li>
<li>The other values are for the MySQL Database and Email Settings (coming soon)</li>
</ul>
</ul>
</br></br>
<b>How to deploy:</b> <i>(make sure you are in the project folder)</i>
<ul>
<li>Install the global package PM2 with the command with the command <pre>sudo npm install pm2@latest -g</pre> <i>PM2 will start and restart the app in case it crashes or if there is a system reboot</i></li>
<li>Then run the command <pre>pm2 start hello.js --name btb-workorders</pre> This will add the app to the PM2 process list and will auto start if a crash occurs. We can make it start with the system (in case of reboot) with the command <pre>pm2 startup systemd</pre> Which might give you another command to run from the output. <i>(Just copy and paste the command if it gives you an output)</i></li>
<li>Save all of the changes to the PM2 process with the command <pre>pm2 save</pre></li>
<li>In order to make sure that the system process for PM2 is running we will need to run the command <pre>sudo systemctl start pm2</pre> and confirm it is running with <pre>systemctl status pm2</pre></li>
<li>Confirm the app is running in PM2 with the comamnd <pre>pm2 list</pre> -or- <pre>pm2 info btb-workorder</pre>
The PM2 process monitor can be pulled up with the 'monit' subcommand. This displays the application status, CPU, and memory usage: <pre>pm2 monit</pre></li>
<li>Once that is done you will need to set a proxy_pass option in Nginx to the service with: <pre>proxy_pass http://localhost:5000;</pre></li>
</ul>
<b>You can then navigate to the domain/sub-domain outlined in Nginx</b>
<p>You will need to log in as the default user: <pre>email: admin@email.com
password: 12345678 <sub>(Super secure... I know)</sub></pre>
Then register your own user and edit your user in MySQL to give your self the techRole of "admin"  instead of the default or "user" <i>(only user or admin roles are allowed currently</i></p>