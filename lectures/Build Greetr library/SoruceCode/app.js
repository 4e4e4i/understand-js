$('#login').click(function () {

    const loginGrtr = G$('John', 'Doe');

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});