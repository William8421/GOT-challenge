# GOT-challenge

## Installation

1. Clone the repository: `git@github.com:William8421/GOT-challenge.git`
2. Change to the project directory: `cd GOT-challenge/client`
3. Install dependencies: `npm install` or `yarn install`

## Running the Application

To start the application, run the following command:

bash

### ng serve

The application will be accessible at http://localhost:4200 in your web browser

# App description

as requested I created GOT single page application using Angular.
the app has a landing page (Home) nad three routes (Houses, Persons and Quotes).

### Houses

contains a searchable list of all houses from GOT, clicking on the
name of a house, all the members of that house are displayed on a sub page (House) with the sigil of that house as a background,
clicking on a member name displays that member's details (name, house and quotes),
clicking on the members's house takes the user to the House page.
Hovering over the house changes the background color to the house sigil's colors.

### Persons

contains a searchable list of all Characters from GOT, clicking on an character name,
displays that member's details (name, house and quotes),
clicking on the members's house takes the user to the House page.
Hovering over the character changes the background color to the sigil's colors of the character's house.

### Quotes

displays 5 random quotes with the character who said the quote and their house,
clicking on the name displays that member's details (name, house and quotes),
clicking on the house takes the user to the House page,
a button to replace this list with five other random quotes.

### styling

the styles used are bootstrap and scss for more control.

the app is responsive on (mobile, tablet, desktop and wide desktops).
