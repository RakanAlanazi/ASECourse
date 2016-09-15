/**
 * Created by Rakan on 9/12/2016.
 */
var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '1057627513073-01gmmq1t0ivba1cc2a5oivqh33t9gel2.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('customBtn'));

    });
};

function attachSignin(element) {

    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            alert(document.getElementById('name').innerText = "Hello " +
                googleUser.getBasicProfile().getName() + ".  You will be redirect to the home page");

            window.location.href = 'home.html';
        }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}
