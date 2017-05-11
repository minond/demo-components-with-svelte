console.debug('rendering PaymentForm from vanilla code');

const vanilla_payment_form = new PaymentForm({
    target: document.querySelector('#vanilla_payment_form'),
    data: randomize_payment_form_data(),
});

setInterval(() => {
    console.debug('updating vanilla component state');
    vanilla_payment_form.set(randomize_payment_form_data())
}, 1000);
