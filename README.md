# SIMULATION OF ENCRYPTING/DECRYPTING DATA ON SERVER

This application is the solution for the task asked by Syook.

Problem is as follows.

> Develop a service to emit encrypted data.

> Develop a service to listen to encrypted data and decrypt it.

> Send the response to the client if and when data gets encrypted



# BASIC EMITTER

> A server is run seperately on a different process which acts as an emitter.

> This server connects with the main server and pipes the encrypted data to it.

> Main duty of this server is to create random objects.

> Make a hash of the random objects to check after delivery
 and
> Encrypt the payload



# BASIC LISTENER

> The main server is run connected to the emitter. 

> It receives encrypted strings which it is reponsible for handling, Decrypting,
> Checking the checksum of and piping a response to the client.

> Socket.io creates sockets between all parties so that on events of transmission and success.

> Correct events are handled.



# CLIENT

> Client has to sign in to view the above process. (Or sign up). 

> Once he succesfully signs in, The data is piped from the server to the client

> As in when it is received and decrypted. The client handles the sorting, Searching, 

> Converting timestamp to locale etc.




# TECHNOLOGY USED

> Node.JS for writing server logic. MongoDb/Mongoose is used for the db which is minimal in this application.

> Express.JS for abstracting the writing of server logic.

> Crypto for encryption/decryption

> Socket.io for creating connections between server-server and client-server

> AngularJS (1.6) used for creating the responsive web page along with HTML/ CSS / Bootstrap.

