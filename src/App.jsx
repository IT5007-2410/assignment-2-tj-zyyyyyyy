/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: '88885555',
    bookingTime: new Date(),
    seatNumber: 'A1',  // seat no
    departure: 'Singapore',  // start station
    destination: 'Bangkok',  // end station
    ticketPrice: 120,  // ticket price
    trainNumber: 'SG101'  // train no
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: '88884444',
    bookingTime: new Date(),
    seatNumber: 'A2',
    departure: 'Singapore',
    destination: 'Bangkok',
    ticketPrice: 120,
    trainNumber: 'SG101'
  },
];

var nextid = 3; // Variable to keep track of the traveller ID.


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{props.traveller.id}</td>
    <td>{props.traveller.name}</td>
    <td>{props.traveller.phone}</td>
    <td>{props.traveller.bookingTime.toLocaleString()}</td>
    <td>{props.traveller.seatNumber}</td>
    <td>{props.traveller.departure}</td>
    <td>{props.traveller.destination}</td>
    <td>{props.traveller.ticketPrice}</td>
    <td>{props.traveller.trainNumber}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Ticket Price</th>
          <th>Train Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => (<TravellerRow traveller={traveller} />))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      id: nextid,
      name: '',
      phone: '',
      bookingTime: new Date(),
      seatNumber: '',  // seat no
      departure: '',  // start station
      destination: '',  // end station
      ticketPrice: 0,  // ticket price
      trainNumber: ''  // train no
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/

    this.props.bookTraveller(this.state);
    nextid++;

    // Reset the form fields
    this.setState({
      id: nextid,
      name: '',
      phone: '',
      bookingTime: new Date(),
      seatNumber: '',  // seat no
      departure: '',  // start station
      destination: '',  // end station
      ticketPrice: 0,  // ticket price
      trainNumber: ''  // train no
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }); // Update the state variable based on the input value.
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <label>Name:</label>
        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
        <label>Phone:</label>
        <input type="tel" name="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} required/>

        <label>Seat Number:</label>
        <select name="seatNumber" value={this.state.seatNumber} onChange={this.handleChange}>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="D1">D1</option>
          <option value="D2">D2</option>
          <option value="D3">D3</option>
        </select>

        <label>Departure:</label>
        <select name="departure" value={this.state.departure} onChange={this.handleChange}>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Bangkok">Bangkok</option>
        </select>

        <label>Destination:</label>
        <select name="destination" value={this.state.destination} onChange={this.handleChange}>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Bangkok">Bangkok</option>
        </select>

        <label>Ticket Price:</label>
        <input type="number" name="ticketPrice" placeholder="Ticket Price" value={this.state.ticketPrice} onChange={this.handleChange} required/>
        <label>Train Number:</label>
        <input type="text" name="trainNumber" placeholder="Train Number" value={this.state.trainNumber} onChange={this.handleChange} required/>

        <button type="submit">Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState({travellers: this.state.travellers.concat(passenger)});
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <button onClick={() => this.setSelector(1)}>Display Travellers</button>
      <button onClick={() => this.setSelector(2)}>Add Traveller</button>
      <button onClick={() => this.setSelector(3)}>Delete Traveller</button>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		<Display travellers={this.state.travellers} />
		{/*Q4. Code to call the component that adds a traveller.*/}
    <Add bookTraveller={this.bookTraveller} />
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));