$('#login').click(function () {
    const firstName = $('#firstname').val();
    const lastName = $('#lastname').val();
    const language = $('#lang').val();
    const loginGrtr = G$(firstName, lastName);

    loginGrtr.setLang(language).HTMLGreeting('#greeting', true);

});