import express from 'express'
import { db } from './firebaseConfig.js'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Dfining a route handler for a 'get' request on the '/plants' endpoint.
// When 'get' request being made to '/plants', this function is executed.
app.get('/plants', async (req, res) => {
    // Initialization of data: 
    // - variable data is initialized to null. 
    // - This variable will later hold the data fetched from the Firebase Realtime Database.
    let data = null

    // Reading Data from Firebase Realtime Database:
    // The 'ref' method is used to create a reference to the /plantDigiDb node in the database.
    // The 'once('value')' method is called on this reference to retrieve the current data stored at that location in the database.
   
    // await: Ensures that the code waits for the database read operation to complete before moving on to the next line.
    // then((snapshot) => {...}): Processes the result of the read operation. The snapshot object contains the data retrieved from the database.
    // snapshot.val(): Extracts the actual data from the snapshot. This data is assigned to the data variable.

    await db.ref('/plantDigiDb').once('value').then((snapshot) => {
        data = snapshot.val();
        console.log('Logs the retrieved data to the console: 1.', data);
    });

    console.log('Logging the Data After Retrieval: 2. ', data);

    // Sending the Data as a Response:
    res.send(data)
})

// Dfining a route handler for a 'post' request on the '/plants' endpoint.
// When 'post' request being made to '/plants', this function is executed.
app.post('/plants', async (req, res) => {
    // Extract plant data from the request body
    let newPlant = req.body   
    console.log('Request body is ', newPlant)

    // Create a reference to the '/plantDigiDb/plants' node in Firebase Realtime Database
    const ref = db.ref('/plantDigiDb/plants');
    // console.log('ref is ', ref)

    let allPlants = []
    // Read existing plant data from Firebase Realtime Database
    await ref.once('value').then((snapshot) => {
        allPlants = snapshot.val() || [];
        console.log('Existing plants are ', allPlants);
    });

    // Append the new plant data to the existing data
    allPlants.push(newPlant)

    // Write the updated travel data back to Firebase Realtime Database
    await ref.set(allPlants);

    console.log('data is ', allPlants);
 
    // Send the updated travel data as the response
    res.send(allPlants)
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
