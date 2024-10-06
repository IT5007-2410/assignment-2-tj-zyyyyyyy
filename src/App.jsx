/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
    {
        id: 1,
        name: 'Jack',
        phone: '88885555',
        bookingTime: new Date(),
        seatNumber: 'A1',  // seat no
    },
    {
        id: 2,
        name: 'Rose',
        phone: '88884444',
        bookingTime: new Date(),
        seatNumber: 'A2',
    },
];

var nextid = 3; // Variable to keep track of the traveller ID.


function TravellerRow(props) {
    {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
    return (
        <tr>
            {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
            <td>{props.traveller.id}</td>
            <td>{props.traveller.name}</td>
            <td>{props.traveller.phone}</td>
            <td>{props.traveller.bookingTime.toLocaleString()}</td>
            <td>{props.traveller.seatNumber}</td>
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
                </tr>
            </thead>
            <tbody>
                {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
                {props.travellers.map(traveller => (<TravellerRow key={traveller.id} traveller={traveller} />))}
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
            seatNumber: 'A1'  // default value set to the first option
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/

        if (this.props.seats[this.state.seatNumber]) {
            alert("Seat is already taken. Please choose another seat.");
        } else {
            this.props.bookTraveller(this.state);
            nextid++;
        }
        // Reset the form fields
        this.setState({
            id: nextid,
            name: '',
            phone: '',
            bookingTime: new Date(),
            seatNumber: 'A1'  // default value set to the first option
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
                <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required />
                <label>Phone:</label>
                <input type="tel" name="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} required />

                <label>Seat Number:</label>
                <select name="seatNumber" value={this.state.seatNumber} onChange={this.handleChange}>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B3">B3</option>
                    <option value="B4">B4</option>
                    <option value="B5">B5</option>
                </select>

                <button type="submit">Add</button>
            </form>
        );
    }
}


class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
        const passenger = this.props.travellers.find(traveller => traveller.id === parseInt(this.state.id));
        if (passenger) {
            this.props.deleteTraveller(this.state);
        } else {
            alert("Passenger ID not found.");
        }
        this.setState({ id: 0 }); // Reset the form fields
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); // Update the state variable based on the input value.
    }

    render() {
        return (
            <form name="deleteTraveller" onSubmit={this.handleSubmit}>
                {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
                <label>ID:</label>
                <input type="number" name="id" placeholder="id" value={this.state.id} onChange={this.handleChange} required />

                <button>Delete</button>
            </form>
        );
    }
}

class Homepage extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { seats } = this.props;
        const gridStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',  // 5 columns
            gap: '10px',  // gap between the columns
        }; // CSS for the grid layout
        const baseSeatStyle = {
            padding: '20px',
            color: 'white',
            textAlign: 'center',
            borderRadius: '4px',
            cursor: 'pointer',
        }; // CSS for the base seat style


        return (
            <div>
                {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
                <h2>Seat Availability</h2>
                <div style={gridStyle}>
                    {Object.keys(seats).map(seat => {
                        const seatStyle = {
                            ...baseSeatStyle,
                            backgroundColor: seats[seat] ? 'green' : 'grey'  // green for booked, grey for free
                        };

                        return (
                            <div key={seat} style={seatStyle}>
                                {seat}
                            </div>
                        );
                    })}
                </div>
            </div>);
    }
}

class TicketToRide extends React.Component {
    constructor() {
        super();
        this.state = {
            seats: {
                A1: true, A2: true, A3: false, A4: false, A5: false,
                B1: false, B2: false, B3: false, B4: false, B5: false,
            },
            travellers: [], selector: 1
        };
        this.bookTraveller = this.bookTraveller.bind(this);
        this.deleteTraveller = this.deleteTraveller.bind(this);
    }

    setSelector(value) {
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
        this.setState({ travellers: this.state.travellers.concat(passenger) });
        this.setState({ seats: { ...this.state.seats, [passenger.seatNumber]: true } }); // Update the seat status
    }

    deleteTraveller(passenger) {
        /*Q5. Write code to delete a passenger from the traveller state variable.*/
        this.setState({ travellers: this.state.travellers.filter(traveller => traveller.id !== parseInt(passenger.id)) });
        this.setState({ seats: { ...this.state.seats, [this.state.travellers.find(traveller => traveller.id === parseInt(passenger.id)).seatNumber]: false } }); // Update the seat status
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
                    <Homepage seats={this.state.seats} />
                    {/*Q3. Code to call component that Displays Travellers.*/}
                    <Display travellers={this.state.travellers} />
                    {/*Q4. Code to call the component that adds a traveller.*/}
                    <Add bookTraveller={this.bookTraveller} seats={this.state.seats} />
                    {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
                    <Delete deleteTraveller={this.deleteTraveller} travellers={this.state.travellers} seats={this.state.seats} />
                </div>
            </div>
        );
    }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));