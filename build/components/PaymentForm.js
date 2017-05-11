var PaymentForm = (function ( Input, Button ) { 'use strict';

Input = ( Input && Input.__esModule ) ? Input['default'] : Input;
Button = ( Button && Button.__esModule ) ? Button['default'] : Button;

var template = (function () {
return {
    methods: {
        is_valid() {
            const { name, phone, card, exp, cvc } = this.refs;

            return !!name.get_value() &&
                !!phone.get_value() &&
                !!card.get_value() &&
                !!exp.get_value() &&
                !!cvc.get_value();
        },

        submit(event) {
            if (!this.is_valid()) {
                event.preventDefault();
                alert('Invalid payment information!');
            }
        }
    }
}
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-4250341688-style";
	style.textContent = "\nform[svelte-4250341688], [svelte-4250341688] form {\n    border: 0;\n    box-shadow: 0px 0px 5px #c7c7c7;\n    display: inline-block;\n    margin: 20px;\n    padding: 10px;\n}\n\nButton[svelte-4250341688], [svelte-4250341688] Button {\n    display: block;\n    margin: 30px auto 10px auto;\n}\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var form = createElement( 'form' );
	setAttribute( form, 'svelte-4250341688', '' );

	function submit_handler ( event ) {
		component.submit(event);
	}

	addEventListener( form, 'submit', submit_handler );

	var input = new Input({
		target: form,
		_root: component._root,
		data: {
			label: "Name",
			placeholder: "Jane Dow",
			value: state.name
		}
	});

	component.refs.name = input;

	appendNode( createText( "\n    " ), form );

	var input_1 = new Input({
		target: form,
		_root: component._root,
		data: {
			label: "Phone",
			placeholder: "(123) 456-7890",
			value: state.phone
		}
	});

	component.refs.phone = input_1;

	appendNode( createText( "\n    " ), form );

	var input_2 = new Input({
		target: form,
		_root: component._root,
		data: {
			label: "Card",
			placeholder: 4242,
			value: state.card
		}
	});

	component.refs.card = input_2;

	appendNode( createText( "\n    " ), form );

	var input_3 = new Input({
		target: form,
		_root: component._root,
		data: {
			label: "Exp.",
			placeholder: "MM/YY",
			value: state.exp
		}
	});

	component.refs.exp = input_3;

	appendNode( createText( "\n    " ), form );

	var input_4 = new Input({
		target: form,
		_root: component._root,
		data: {
			label: "CVC",
			placeholder: "CVC",
			value: state.cvc
		}
	});

	component.refs.cvc = input_4;

	appendNode( createText( "\n\n    " ), form );

	var button = new Button({
		target: form,
		_root: component._root,
		data: { label: "Pay" }
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( form, target, anchor );
		},

		update: function ( changed, state ) {
			var input_changes = {};

			if ( 'name' in changed ) input_changes.value = state.name;

			if ( Object.keys( input_changes ).length ) input.set( input_changes );

			var input_1_changes = {};

			if ( 'phone' in changed ) input_1_changes.value = state.phone;

			if ( Object.keys( input_1_changes ).length ) input_1.set( input_1_changes );

			var input_2_changes = {};

			if ( 'card' in changed ) input_2_changes.value = state.card;

			if ( Object.keys( input_2_changes ).length ) input_2.set( input_2_changes );

			var input_3_changes = {};

			if ( 'exp' in changed ) input_3_changes.value = state.exp;

			if ( Object.keys( input_3_changes ).length ) input_3.set( input_3_changes );

			var input_4_changes = {};

			if ( 'cvc' in changed ) input_4_changes.value = state.cvc;

			if ( Object.keys( input_4_changes ).length ) input_4.set( input_4_changes );
		},

		destroy: function ( detach ) {
			removeEventListener( form, 'submit', submit_handler );
			if ( component.refs.name === input ) component.refs.name = null;
			input.destroy( false );
			if ( component.refs.phone === input_1 ) component.refs.phone = null;
			input_1.destroy( false );
			if ( component.refs.card === input_2 ) component.refs.card = null;
			input_2.destroy( false );
			if ( component.refs.exp === input_3 ) component.refs.exp = null;
			input_3.destroy( false );
			if ( component.refs.cvc === input_4 ) component.refs.cvc = null;
			input_4.destroy( false );
			button.destroy( false );

			if ( detach ) {
				detachNode( form );
			}
		}
	};
}

function PaymentForm ( options ) {
	options = options || {};
	this.refs = {};
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( "svelte-4250341688-style" ) ) add_css();
	this._renderHooks = [];

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	this._flush();
}

assign( PaymentForm.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

PaymentForm.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	this._flush();
};

PaymentForm.prototype.teardown = PaymentForm.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.destroy( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement ( name ) {
	return document.createElement( name );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute( attribute, value );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function addEventListener ( node, event, handler ) {
	node.addEventListener( event, handler, false );
}

function removeEventListener ( node, event, handler ) {
	node.removeEventListener( event, handler, false );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function assign ( target ) {
	for ( var i = 1; i < arguments.length; i += 1 ) {
		var source = arguments[i];
		for ( var k in source ) target[k] = source[k];
	}

	return target;
}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( differs( newValue, oldValue ) ) {
			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.post : this._observers.pre;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on ( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set ( newState ) {
	this._set( assign( {}, newState ) );
	this._root._flush();
}

function _flush () {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		this._renderHooks.pop()();
	}
}

function differs ( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

return PaymentForm;

}(Input, Button));