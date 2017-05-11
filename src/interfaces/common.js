/**
 * @param {Function} comp_class
 * @return {Function}
 */
const svelte_to_react = (comp_class) => React.createClass({
    component: null,

    componentWillMount() {
        console.debug('running Component.componentWillMount');
    },

    componentWillReceiveProps() {
        console.debug('running Component.componentWillReceiveProps');
    },

    shouldComponentUpdate(props) {
        console.debug('running Component.shouldComponentUpdate');
        this.component.set(props);
        return false;
    },

    render() {
        console.debug('running Component.render');

        return React.createElement('div', {ref: (node) => {
            console.debug('rendering svelte component from react component');
            this.component = new comp_class({ target: node, data: this.props });
        }});
    },
});

/**
 * @return {object}
 */
const randomize_payment_form_data = () => ({
    name: Math.random(),
    phone: Math.random(),
    card: Math.random(),
    exp: Math.random(),
    cvc: Math.random(),
});
