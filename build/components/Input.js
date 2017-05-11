var Input = (function () { 'use strict';

var template = (function () {
return {
    methods: {
        get_value() {
            return this.refs.input.value;
        }
    }
}
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-682483858-style";
	style.textContent = "\nlabel[svelte-682483858], [svelte-682483858] label {\n    display: block;\n    white-space: nowrap;\n}\n\nspan[svelte-682483858], [svelte-682483858] span {\n    display: inline-block;\n    min-width: 85px;\n    padding: 10px 30px 10px 10px;\n    text-align: right;\n}\n\nspan[svelte-682483858], [svelte-682483858] span,\ninput[svelte-682483858], [svelte-682483858] input  {\n    color: #8898AA;\n    letter-spacing: 1px;\n    font-family: \"Helvetica Neue\", Helvetica;\n    font-weight: 200;\n}\n\ninput[svelte-682483858], [svelte-682483858] input {\n    border: 0;\n    outline: 0;\n    width: 300px;\n}\n\ninput[svelte-682483858]::placeholder, [svelte-682483858] input::placeholder {\n    color: #e0e0e0;\n    font-weight: lighter;\n}\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var text_value, input_value_value, input_placeholder_value;

	var label = createElement( 'label' );
	setAttribute( label, 'svelte-682483858', '' );
	var span = createElement( 'span' );
	appendNode( span, label );
	var text = createText( text_value = state.label );
	appendNode( text, span );
	appendNode( createText( "\n    " ), label );
	var input = createElement( 'input' );
	appendNode( input, label );
	input.value = input_value_value = state.value || '';
	input.placeholder = input_placeholder_value = state.placeholder;
	component.refs.input = input;

	return {
		mount: function ( target, anchor ) {
			insertNode( label, target, anchor );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.label ) ) {
				text.data = text_value;
			}

			if ( input_value_value !== ( input_value_value = state.value || '' ) ) {
				input.value = input_value_value;
			}

			if ( input_placeholder_value !== ( input_placeholder_value = state.placeholder ) ) {
				input.placeholder = input_placeholder_value;
			}
		},

		destroy: function ( detach ) {
			if ( component.refs.input === input ) component.refs.input = null;

			if ( detach ) {
				detachNode( label );
			}
		}
	};
}

function Input ( options ) {
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
	if ( !document.getElementById( "svelte-682483858-style" ) ) add_css();

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

assign( Input.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

Input.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Input.prototype.teardown = Input.prototype.destroy = function destroy ( detach ) {
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

function appendNode ( node, target ) {
	target.appendChild( node );
}

function createText ( data ) {
	return document.createTextNode( data );
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

return Input;

}());