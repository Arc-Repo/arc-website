var firebaseConfig = {
    apiKey: "AIzaSyCwe9R5yfvegvQKWedHm5Rw7oYR-EDXnGo",
    authDomain: "mustechinc.firebaseapp.com",
    databaseURL: "https://mustechinc-default-rtdb.firebaseio.com",
    projectId: "mustechinc",
    storageBucket: "mustechinc.appspot.com",
    messagingSenderId: "977253448529",
    appId: "1:977253448529:web:96cd8a550bd7324fbf7170",
    measurementId: "G-03NH7C9MKG"
};
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var data = null;
var anonyomousUser = firebase.auth().curentUser;

var uiConfig = {
    callbacks: {
        signInFailure: function(error) {
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
              return Promise.resolve();
            }
            var cred = error.credential;
            return firebase.auth().signInWithCredential(cred);
        },
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
        },
        uiShown: function() {
            document.getElementById('loader').style.display = 'none';
        }
    },
    autoUpgradeAnonyomousUsers: true, 
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [{
            provider : firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName : true
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account',
                login_hint: 'ironman999@gmail.com'
            }
        },
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: [
                'public_profile',
                'email',
                'user_likes',
                'user_friends'
            ],
            customParameters: {
                auth_type: 'reauthenticate'
            }
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image',
              size: 'normal', 
              badge: 'bottomleft' 
            },
            defaultCountry: 'US',
            defaultNationalNumber: '9005380846',
            loginHint: '+19005380846'
        }
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

ui.start('#firebaseui-auth-container', uiConfig);