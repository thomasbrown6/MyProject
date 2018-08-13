import Rebase from 're-base';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAhe0ARd4dvWmnjqM9RI_BQCfL4o8xtKY8",
    authDomain: "project3-9321d.firebaseapp.com",
    databaseURL: "https://project3-9321d.firebaseio.com",
    projectId: "project3-9321d",
    storageBucket: "project3-9321d.appspot.com",
    messagingSenderId: "384066193108"
  };
 
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { app, base }