# Outdoor.sy

## How to run
- Add the separately provided `firebase.json` file under `server/`
- Navigate to the `server` directory by running `cd server`
- Run `npm start` to begin the installation and build process
  - Initial install might take a few minutes
- If your browser does not open automatically, navigate to `http://localhost:3000`

### Stack
- React front-end (no Redux, app not large enough/not necessary)
- Express Node.js backend
- Firebase Firestore database
  - Firestore SDK is robust and great to use
  - Solid free offering great for prototypes and experiments

### Configs
- Node.js version: `v14.18.3`
- NPM version: `6.14.15`
### Next Steps
As a proof of concept, this application does function as a CRM service. However, If I were to make more improvements, I would start by adding more actionability to the Customer Detail page. Things such as a notes section or the ability to edit/remove a customer.

Furthermore, I would like to add user authentication through Firebase and enable some kind of access controls to prevent non-administrative users from adding/removing customers.

Also, more robust error checking and of course testing would be necessary for this to ever be deployed into production. There are definitely still some minor edge cases left in this code base, but there is only so much time to get everything perfect.

Enjoy!