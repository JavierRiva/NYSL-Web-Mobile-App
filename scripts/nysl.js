var app = new Vue({
  el: "#app",
  data: {
    matches: [],
    positions: [],
    players: [],
    map: "",
    place: "",
    showIndex: true,
    showGameInfo: false,
    showResults: false,
    showPositions: false,
    showTeam: false,
    showChat: false,
    showPageSplash: true,
    showPosts: false,
    matchId: null,
    messages: [],
    gamesRef: null,
    location: null,
    date: null,
    provider: [],
    user: null
  },
  methods: {
    toggleShowIndex: function() {
      this.showIndex = true;
      this.showGameInfo = false;
      this.showResults = false;
      this.showPositions = false;
      this.showTeam = false;
      this.showChat = false;
    },
    toggleShowGameInfo: function() {
      this.showIndex = false;
      this.showGameInfo = true;
      this.showResults = false;
      this.showPositions = false;
      this.showChat = false;
      this.showTeam = false;
    },
    toggleShowResults: function() {
      this.showIndex = false;
      this.showGameInfo = false;
      this.showResults = true;
      this.showPositions = false;
      this.showTeam = false;
      this.showChat = false;
    },
    toggleShowPositions: function() {
      this.showIndex = false;
      this.showGameInfo = false;
      this.showResults = false;
      this.showPositions = true;
      this.showTeam = false;
      this.showChat = false;
    },
    toggleShowTeam: function() {
      this.showIndex = false;
      this.showGameInfo = false;
      this.showResults = false;
      this.showPositions = false;
      this.showTeam = true;
      this.showChat = false;
    },
    toggleShowChat: function(matchId, date, location) {
      this.showIndex = false;
      this.showGameInfo = false;
      this.showResults = false;
      this.showPositions = false;
      this.showTeam = false;
      this.showChat = true;
      this.matchId = matchId;
      this.date = date;
      this.location = location;

      if (this.gamesRef != null) {
        this.gamesRef.off();
        this.messages = [];
      }

      this.gamesRef = firebase.database().ref("games/" + this.matchId);

      this.gamesRef.on("child_added", function(data) {
        app.messages.push(data.val());
      });
    },
    sendMail: function() {
      location.href = "mailto:nysl@chisoccer.org";
    },
    signIn: function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          app.user = result.user.displayName;
          if (app.user != null) {
            app.showPageSplash = false; 
            app.showPosts = true;
          }
        });
    },
    signOut: function () {
      firebase.auth().signOut();
      app.showPageSplash = true; 
      app.showPosts = false;
      app.user = null;
    },
    sendMessage: function() {
      var id = this.gamesRef.push().key;
      var message = {};
      message[id] = {
        author: app.user,
        text: this.$refs.messageText.value
      };
      this.$refs.messageText.value = "";
      this.gamesRef.update(message);
    }
  }
});

app.matches = gameInfo;
app.positions = positions;
app.players = players;
