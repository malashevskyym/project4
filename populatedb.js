#! /usr/bin/env node

console.log('This script populates some test albums, groups, genres and comments to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Group = require('./models/group');
var Album = require('./models/album');
var Comment = require('./models/comment');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var groups = [];
var genres = [];
var albums = [];
var comments = [];


const beatlesBio =
  'So much has been said and written about the Beatles&mdashand thei' +
  'r story is so mythic in its sweep&mdash;that itâ€™s difficult to sum' +
  'marize their career without restating clichÃ©s that have alre' +
  'ady been digested by tens of millions of rock fans. To start' +
  ' with the obvious, they were the greatest and most influenti' +
  'al act of the rock era, and they introduced more innovations' +
  ' into popular music than any other group of their time. More' +
  'over, they were among the few artists of any discipline that' +
  ' were simultaneously the best at what they did and the most ' +
  'popular at what they did. Relentlessly imaginative and exper' +
  'imental, the Beatles grabbed hold of the international mass ' +
  'consciousness in 1964 and never let go for the next six year' +
  's, always staying ahead of the pack in terms of creativity a' +
  'nd never losing the ability to communicate their increasingl' +
  'y sophisticated ideas to a mass audience. Their supremacy as' +
  ' rock icons remains unchallenged to this day, decades after ' +
  'their breakup in 1970.';

chicagoBio =
  'According to Billboard chart statistics, Chicago is second o' +
  'nly to the Beach Boys as the most successful American rock b' +
  'and of all time, in terms of both albums and singles. If tha' +
  't factâ€™s surprising, itâ€™s because Chicago has been singularl' +
  'y underrated since the beginning of their long career, both ' +
  'because of their musical ambitions (to the musicians, rock i' +
  's only one of several styles of music to be used and blended' +
  ', along with classical, jazz, R&amp;B, and pop) and because ' +
  'of their refusal to emphasize celebrity over the music. By t' +
  'hose standards, Chicago has succeeded in the ways they inten' +
  'ded to. From the beginning of their emergence as a national ' +
  'act, theyâ€™ve been able to fill arenas with satisfied fans. A' +
  'nd beyond the impressive sales and chart statistics, their m' +
  'usic has endured, played constantly on the radio and instant' +
  'ly familiar to tens of millions.'

fifthDimensionBio =
  'The Fifth Dimensionâ€™s unique sound lay somewhere between smo' +
  'oth, elegant soul and straightforward, adult-oriented pop, o' +
  'ften with a distinct flower-power vibe. Although they appeal' +
  'ed more to mainstream listeners than to a hip, hardcore R&am' +
  'p;B audience, they had a definite ear for contemporary trend' +
  's; their selection of material helped kickstart the notable ' +
  'songwriting careers of Jimmy Webb and Laura Nyro, and their ' +
  'biggest hit was a medley from the hippie musical Hair, â€œAqua' +
  'rius/Let the Sunshine In.â€ The groupâ€™s soaring, seamless har' +
  'monies were given appropriately sweeping, orchestrated perio' +
  'd production by Bones Howe, which often placed their records' +
  ' closer to California-style sunshine pop. Thatâ€™s actually pa' +
  'rt of the reason why the best singles from the Fifth Dimensi' +
  'onâ€™s heyday of the late â€™60s and early â€™70s still evoke thei' +
  'r era with uncanny precision.'

testGroup1Bio = 'Test Group biography.'

function groupCreate(name, bio, cb) {
  groupdetail = {
    name: name
  };
  if (bio != false) groupdetail.bio = bio;

  var group = new Group(groupdetail);

  group.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Group: ' + group);
    groups.push(group);
    cb(null, group);
  });
}

// function genreCreate(name, cb) {
//   var genre = new Genre({
//     name: name
//   });
//
//   genre.save(function(err) {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     console.log('New Genre: ' + genre);
//     genres.push(genre);
//     cb(null, genre);
//   });
// }

function albumCreate(title, year, description, groupId, cb) {
  albumdetail = {
    title: title,
    year: year,
    group: groupId,
  };
  if (description != false) albumdetail.description = description;

  var album = new Album(albumdetail);
  album.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Album: ' + album);
    albums.push(album);
    cb(null, album);
  });
}


function commentCreate(timedate, albumId, text, name, email, cb) {
  commentdetail = {
    timedate: timedate,
    album: albumId,
    text: text,
    name: name,
    email: email
  };

  var comment = new Comment(commentdetail);
  comment.save(function(err) {
    if (err) {
      console.log('ERROR CREATING Comment: ' + comment);
      cb(err, null);
      return;
    }
    console.log('New Comment: ' + comment);
    comments.push(comment);
    cb(null, comment);
  });
}


function createGroups(cb) {
  async.series([
      function(callback) {
        groupCreate('The Beatles', beatlesBio, callback);
      },
      function(callback) {
        groupCreate('Chicago', chicagoBio, callback);
      },
      function(callback) {
        groupCreate('The Fifth Dimension', fifthDimensionBio, callback);
      },
      function(callback) {
        groupCreate('Test Group 1', testGroup1Bio, callback);
      },
      function(callback) {
        groupCreate('Test Group 2', false, callback);
      },
    ],
    // optional callback
    cb);
}


function createAlbums(cb) {
  async.parallel([
      function(callback) {
        albumCreate('Please Please Me', 1963, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('With the Beatles', 1963, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('A Hard Dayâ€™s Night', 1964, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Beatles for Sale', 1964, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Help!', 1965, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Rubber Soul', 1965, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Revolver', 1966, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Sgt. Pepperâ€™s Lonely Hearts Club Band', 1967, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Magical Mystery Tour', 1967, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('The Beatles (â€œThe White Albumâ€)', 1968, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Yellow Submarine', 1969, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Abbey Road', 1969, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Let It Be', 1970, false, groups[0], callback);
      },
      function(callback) {
        albumCreate('Chicago Transit Authority', 1969, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago II', 1970, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago III', 1971, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('At Carnegie Hall, Vols. 1-4 (Chicago IV)', 1971, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago V', 1972, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago VI', 1973, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago VII', 1974, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago VIII', 1975, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago X', 1976, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago XI', 1977, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Hot Streets', 1978, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 13', 1979, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago XIV', 1980, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 16', 1982, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 17', 1984, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 18', 1986, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 19', 1988, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago Twenty 1', 1991, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Night &amp; Day: Big Band', 1995, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago 25: The Christmas Album', 1998, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago XXVI -- The Live Album', 1999, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago Christmas: Whatâ€™s It Gonna Be Santa?', 2003, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago XXX', 2006, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Stone of Sisyphus: XXXII', 2008, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('O Christmas Three', 2011, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Now: Chicago XXXVI', 2014, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago @ Symphony Hall', 2015, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago II: Live on Soundstage', 2018, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Greatest Hits Live', 2018, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Chicago Christmas [2019]', 2019, false, groups[1], callback);
      },
      function(callback) {
        albumCreate('Up, Up and Away', 1967, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('The Magic Garden', 1967, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Stoned Soul Picnic', 1968, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('The Age of Aquarius', 1969, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Portrait', 1970, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Loveâ€™s Lines, Angles and Rhymes', 1971, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Live!!', 1971, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Individually &amp; Collectively', 1972, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Living Together, Growing Together', 1973, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Soul &amp; Inspiration', 1974, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Earthbound', 1975, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('High on Sunshine', 1978, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Star Dancing', 1978, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('In the House', 1995, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Respect: Live', 1995, false, groups[2], callback);
      },
      function(callback) {
        albumCreate('Test Group 1 Album 1', 1997, "First album description.",
          groups[3], callback);
      },
      function(callback) {
        albumCreate('Test Group 1 Album 2', 1998, "Second album description.",
          groups[3], callback);
      },
      function(callback) {
        albumCreate('Test Group 2 Album 1', 2001, false, groups[4], callback);
      },
    ],
    // optional callback
    cb);
}


function createComments(cb) {
  async.parallel([
      function(callback) {
        commentCreate('2020-12-04T08:04:00.000+00:00', albums[46], 'Absolutely the Dimensionâ€™s best album. In addition to the 2 chart-topping singles, they also do great cover versions of Cream&#x27;s â€œSunshine of Your Loveâ€ and Mary Hopkinâ€™s â€œThose Were the Days.â€ With terrific production by Bones Howe and members of the Wrecking Crew as the house band, this LP represents the best of late-60s pop music.', 'dave', 'dave@foo.com', callback);
      },
      function(callback) {
        commentCreate('2020-12-08T11:11:00.000+00:00', albums[46], 'I saw them in concert right after this album was released. Super!', 'TJS', 'tj@quux.io', callback);
      },
      function(callback) {
        commentCreate('2021-12-08T18:18:16.000+00:00', albums[46], 'I agree', 'doug', 'doug@bar.com', callback);
      },
      function(callback) {
        commentCreate('2020-01-15T10:10:00.000+00:00', albums[14], 'Chicago II is a more refined sound than their debut. Where the first record was a raw recording of bar band rock interspersed with moments of jazzy compositions, the music of the second record is more articulate and precise. The album is broken down into four parts, all intended to showcase each of the sides of the Chicago sound. The rock is more subtle, and the jazz is smooth. As for the statements on the times, they&#x27;re still here, especially on the fourth part of the album. Key tracks are Poem For The People, Make Me Smile, Colour My World, 25 Or 6 To 4, It Better End Soon (and all its movements), and Where Do We Go From Here.', 'dave', 'dave@foo.com', callback);
      },
      function(callback) {
        commentCreate('2021-01-16T11:11:00.000+00:00', albums[14], 'The Chicago album I listen to most (on vinyl!).', 'doug', 'doug@bar.com', callback);
      },
      function(callback) {
        commentCreate('2021-03-24T12:00:00.000+00:00', albums[58], 'Comment #1 on Test Group 1 Album 1', 'dave', 'dave@foo.com', callback);
      },
      function(callback) {
        commentCreate('2021-03-24T12:05:00.000+00:00', albums[58], 'Comment #2 on Test Group 1 Album 1', 'doug', 'doug@bar.com', callback);
      },
      function(callback) {
        commentCreate('2021-03-24T12:10:00.000+00:00', albums[58], 'Comment #3 on Test Group 1 Album 1', 'user', 'user@foobaz.com', callback);
      }
    ],
    // Optional callback
    cb);
}



async.series([
    createGroups,
    createAlbums,
    createComments
  ],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + comments);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });
