new Vue({
  el: '#app',
  data:{
    healthP: 100,
    healthM: 100,
    game: false,
    turns: [],
  },
  methods: {
    startGame: function() {
      this.game = true;
      this.healthP = 100;
      this.healthM = 100;
      this.turns = [];
    },

    endGame: function() {
      this.game = false;
    },

    attack: function() {
      var hit = this.attackDamage(3,10);
      this.healthM -= hit;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hit Monster by " + hit
      });
      if(this.check()) {
        return;
      }
      this.monster();
    },

    specialAttack: function() {
      if(Math.random() > 0.5) {
        var hit = this.attackDamage(11,20);
        this.healthM -= hit
        this.turns.unshift({
          isPlayer: true,
          text: "Player hit Monster by " + hit
        });
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: "Player attack was dodget by Monster"
        });
      }
      if(this.check()) {
        return;
      }
      this.monster();
    },
    
    heal: function() {
      var healUp = 10;
      this.healthP += healUp;
      if(this.healthP >= 100) {
        healUp = this.healthP - 100;
        this.healthP = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player healed himself by " + healUp
      });
      if(this.check()) {
        return;
      }
      this.monster();
    },

    monster: function() {
      var hit = this.attackDamage(5,12);
      this.healthP -= hit;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hit Player by " + hit
      });
      this.check();
    },

    check: function() {
      if(this.healthP <= 0) {
        this.healthP = 0;
        if(confirm("You LOSE!!!")) {
          this.startGame();
        } else {
          this.game = false;
        }
        return true;
      }
      else if(this.healthM <= 0) {
        this.healthM = 0;
        if(confirm("You WIN!!!")) {
          this.startGame();
        } else {
          this.game = false;
        }
        return true;
      }
    },

    attackDamage: function(min, max) {
      return Math.max(Math.floor(Math.random()*max) + 1, min);
    }
  },
});
