const axios = require('axios');
require("dotenv").config();
var Spotify = require('node-spotify-api');
const fs = require('fs');

var spotify = new Spotify({
    id: "fd716eb64334426dbd3f3354ee69b67d",
    secret: "cb4983fafd334528a4cb13f017329603",
});

var args = process.argv.slice(0);
var cmd = args[2];
 
var concertURL = "https://rest.bandsintown.com/artists/" + args[3] + "/events?app_id=codingbootcamp";
var songQuery = args[3];
var movieInfo = null;

//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
if(!args[3]){
    movieInfo = "http://www.omdbapi.com/?apikey=trilogy&t=" + "Mr. Nobody";
} else {
    movieInfo = "http://www.omdbapi.com/?apikey=trilogy&t=" + args[3];
}

// function that read text file and calls getSong function
function spotifyFromTextFile(){
    fs.readFile('random.txt', 'utf8', (err, data) => {
        console.log(data);
        var ourStuff = data.split(",");
        console.log(ourStuff);
        getSong(ourStuff[1]);
    });
 }

 //function that makes request for movie info
 function getMovieInfo(urlString) {
    //console.log("Being Called");
    axios.get(urlString)
    .then(function (response) {
    //console.logs for each information
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Ratings);
      console.log(response.data.imdbRating);
      console.log(response.data.Country);
      console.log(response.data.Plot);
      console.log(response.data.Actors);


    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
 }


//function that makes request venue name,location,datatime
 function getConcert(urlString) {
    //console.log("Being Called");
    axios.get(urlString)
    .then(function (response) {
        for(var i = 0; i < response.data.length; i++) { 
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            console.log(response.data[i].datetime);
            console.log("");
        }
      // handle success
      //console.log(response.data[0].venue.name);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
 }

//function that makes request for album name, artist name,preview link from spotify
 function getSong(urlString) {
    spotify.search({ type: 'track', query: urlString }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        console.log("Song Name");
        console.log(urlString);
        console.log("");

       for(var i = 0; i < data.tracks.items.length; i++){

            for(var j = 0; j < data.tracks.items[i].album.artists.length; j++ ){
                //console.log for name of artist
                console.log(data.tracks.items[i].album.artists[j].name);
            }
            //console.log for album name,preview link from spotify
            console.log(data.tracks.items[i].album.name);
            console.log(data.tracks.items[i].external_urls.spotify);
            console.log("");
           //console.log(response.data[i].album.href);
           //console.log(response.data[i].)
       }

      //console.log(data.tracks.items[0]); 
      });
 }
 //console.log(args);

 switch (cmd) {
    case 'concert-this':
    getConcert(concertURL);
    console.log("Concert command");
    break

    case 'spotify-this-song':
        getSong(songQuery);
        console.log("Spotify this");
        break

    case 'movie-this':
        getMovieInfo(movieInfo);
        console.log("movie this");
        break

    case 'do-what-it-says':
        spotifyFromTextFile();
        console.log("do what to do");
        break
    
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }