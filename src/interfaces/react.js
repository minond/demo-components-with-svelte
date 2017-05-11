const PaymentFormComponent = svelte_to_react(PaymentForm);

const HomeComponent = React.createClass({
    getInitialState() {
        return randomize_payment_form_data();
    },

    componentWillMount() {
        setInterval(() => {
            console.debug('updating react component state');
            this.setState(randomize_payment_form_data())
        }, 1000);
    },

    render() {
        return React.createElement(PaymentFormComponent, this.state);
    }
});

ReactDOM.render(React.createElement(HomeComponent),
    document.querySelector('#react_payment_form'));
