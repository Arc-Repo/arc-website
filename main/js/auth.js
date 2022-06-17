const firebaseConfig = {
    apiKey: "AIzaSyD_tRA8qSIVfvLRDqrHOW5IqHCVS4-blhU",
    authDomain: "a-r-c-tech.firebaseapp.com",
    projectId: "a-r-c-tech",
    storageBucket: "a-r-c-tech.appspot.com",
    messagingSenderId: "373644028797",
    appId: "1:373644028797:web:b5f354e9c57544ae023a14",
    measurementId: "G-Y7TZFDX21B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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