var mocha = require("mocha");
var should  = require("should");
var help = require("./helpers");
var moment = require("moment");

describe('Super Script Resoning Interface', function(){

  before(help.before("reason"));

  // This is really just testing simple plugin called 'math'
  // The trick here is to match based on the question type ?:NUM:expression *
  describe('Math Reasoning', function(){

    xit("should not change the numbers", function(done) {
      bot.reply("user1", "what is one plus one", function(err, reply) {
        reply.should.eql("I think it is 2");
        done();
      });
    });

    xit("should evaluate math expressions - numeric add", function(done) {
      bot.reply("user1", "what is 1 + 1", function(err, reply) {
        reply.should.eql("I think it is 2");
        done();
      });
    });

    xit("should evaluate math expressions - multiply 1", function(done) {
      bot.reply("user1", "what is two times three", function(err, reply) {
        reply.should.eql("I think it is 6");
        done();
      });
    });

    xit("should evaluate math expressions - multiply 2", function(done) {
      bot.reply("user1", "what is 2 x 3", function(err, reply) {
        reply.should.eql("I think it is 6");
        done();
      });
    });


    xit("should evaluate math expressions - string to numeric add", function(done) {
      bot.reply("user1", "what is one of one", function(err, reply) {
        reply.should.eql("I think it is 1");
        done();
      });
    });

    xit("should evaluate math expressions - complex expression 1", function(done) {
      bot.reply("user1", "What is 4+2-1?", function(err, reply) {
        reply.should.eql("I think it is 5");
        done();
      });
    });

    xit("should evaluate math expressions - string with 'half of'", function(done) {
      bot.reply("user1", "what is half of two times 16", function(err, reply) {
        reply.should.eql("I think it is 16");
        done();
      });
    });

    xit("should evaluate math expressions - string long form", function(done) {
      bot.reply("user1", "What is seven multiplied by six?", function(err, reply) {
        reply.should.eql("I think it is 42");
        done();
      });
    });


    xit("should evaluate math expressions - string long form two", function(done) {
      bot.reply("user1", "what is two thousand and fifty plus one hundred and 5?", function(err, reply) {
        reply.should.eql("I think it is 2155");
        done();
      });
    });

    xit("should evaluate math expressions - Round 2 places", function(done) {
      bot.reply("user1", "what is 7/3?", function(err, reply) {
        reply.should.eql("I think it is 2.33");
        done();
      });
    });

    xit("should evaluate math expressions - Divide by Zero", function(done) {
      bot.reply("user1", "What is 7 divided by 0?", function(err, reply) {
        reply.should.eql("I think it is Infinity");
        done();
      });
    });

    xit("should evaluate math expressions - Percent expression 1", function(done) {
      bot.reply("user1", "what is 20% of 120", function(err, reply) {
        reply.should.eql("I think it is 24");
        done();
      });
    });

    xit("should evaluate math expressions - Percent expression 2", function(done) {
      bot.reply("user1", "What is 50 percent of 40?", function(err, reply) {
        reply.should.eql("I think it is 20");
        done();
      });
    });

    xit("should evaluate math expressions - square root", function(done) {
      bot.reply("user1", "what is the square root of 25?", function(err, reply) {
        reply.should.eql("I think it is 5");
        done();
      });
    });

    xit("should evaluate math expressions - Memory (half fact)", function(done) {
      bot.reply("user1", "what is ten plus ten", function(err, reply) {
        reply.should.eql("I think it is 20");

        bot.reply("user1", "plus ten more", function(err, reply) {
          reply.should.eql("I think it is 30");
          bot.reply("user1", "minus 5", function(err, reply) {
            reply.should.eql("I think it is 25");
            done();
          });
        });
      });
    });
  });

  describe('Create Facts', function(){


    it.skip("CF -1", function(done) {

      bot.reply("cfuser1", "make mad", function(err, reply) {
        bot.reply("cfuser1", "look", function(err, reply) {
          console.log(reply)
          done();
        });
      });
    });


    xit("CF 0", function(done) {

      bot.reply("cfuser1", "I'm hanging out with Heather.", function(err, reply) {
        reply.should.eql("Who is Heather?");

        bot.reply("cfuser1", "Heather is my wife.", function(err, reply) {
          bot.reply("cfuser1", "I'm hanging out with Heather.", function(err, reply) {
            reply.should.eql("Thats cool");
            done();
          });
        });
      });
    });



    // Bob isa brother
    // I hit brother
    // I hit bob
    xit("CF 2", function(done) {
      bot.reply("cfuser1", " I hit my brother Bob", function(err, reply) {
        bot.getUser("cfuser1", function(e, fact){
          fact.memory.db.get({ subject: "i"}, function(e,r){
            r[0].predicate.should.eql("hit");
            r[0].object.should.eql("bob");
            r[1].object.should.eql("brother");
            done();
          });
        });
      });
    });

    xit("CF 3", function(done) {
      bot.reply("cfuser1", "I hit my brother Bob", function(err, reply) {

        bot.getUser("cfuser1", function(err, fact){
          fact.memory.db.get({ subject: "i"}, function(e,r){
            r[0].predicate.should.eql("hit");
            r[0].object.should.eql("bob");
            r[1].object.should.eql("brother");
            done();
          });
        });

      });
    });

    xit("CF 4", function(done) {
      bot.reply("cfuser1", "Charlie is my dog.", function(err, reply) {

        bot.getUser("cfuser1", function(err, fact){
          fact.memory.db.get({ subject: "charlie"}, function(e,r){
            r[0].predicate.should.eql("isa");
            r[0].object.should.eql("dog");
            done();
          });
        });
      });
    });


    it("CF 5", function(done) {
      bot.reply("cfuser1", "My mother is Elizabeth", function(err, reply) {
        bot.getUser("cfuser1", function(err, fact){
          fact.memory.db.get({ subject: "elizabeth"}, function(e,r){
            r[0].predicate.should.eql("isa");
            r[0].object.should.eql("mother");
            done();
          });
        });
      });
    });

    it("CF 6", function(done) {
      bot.reply("cfuser1", "My cat is Freddy", function(err, reply) {
        bot.getUser("cfuser1", function(err, fact){
          fact.memory.db.get({ subject: "freddy"}, function(e,r){
            r[0].predicate.should.eql("isa");
            r[0].object.should.eql("cat");
            done();
          });
        });
      });
    });

    xit("CF 7", function(done) {
      bot.reply("cfuser1", "My father likes to play tennis", function(err, reply) {
        bot.getUser("cfuser1", function(err, fact){
          bot.reply("cfuser1", "my uncle likes to play basketball", function(err, reply) {
            fact.memory.db.get({ predicate: "play" }, function(e,r){
              r[0].subject.should.eql("uncle");
              r[1].subject.should.eql("father");
              done();
            });
          });
        });
      });
    });

    xit("CF 8", function(done) {
      bot.reply("cfuser1", "I have 2 kids", function(err, reply) {
        bot.getUser("cfuser1", function(err, fact){
          fact.memory.db.get({ object: 'kid'}, function(e,r){
            r[0].predicate.should.eql("have");
            done();
          });
        });
      });
    });

  });


  describe('Aquire Goods - Plugin', function(){
    it("Aquire goods", function(done) {
      bot.reply("user1", "Do you own a dog?", function(err, reply) {
        bot.reply("user1", "Do you own a dog?", function(err, reply) {
          console.log(reply);
          done();
        });
      });
    });
  });


  describe('Color Related - Plugin', function(){
    xit("should evaluate colors - world knowledge", function(done) {
      bot.reply("user1", "What color is the White House?", function(err, reply) {
        reply.should.eql("It is white.");
        done();
      });
    });

    xit("should evaluate colors - world knowledge 2", function(done) {
      bot.reply("user1", "What color is a tree?", function(err, reply) {
        reply.should.containEql("It is brown.");
        done();
      });
    });

    xit("should evaluate colors - world knowledge inverse", function(done) {
      bot.reply("user1", "What else is green?", function(err, reply) {
        reply.should.endWith("is green.");
        done();
      });
    });

    xit("should evaluate colors - bot facts", function(done) {
      bot.reply("user1", "what is your favorite color", function(err, reply) {
        reply.should.containEql("My favorite color is green.");
        done();
      });
    });

    xit("should evaluate colors - user facts 1", function(done) {
      bot.reply("user1", "what color is my car?", function(err, reply) {
        reply.should.containEql("You never told me what color your car is.");
        done();
      });
    });

    xit("should evaluate colors - user facts 2", function(done) {
      bot.reply("user1", "what is my favorite color", function(err, reply) {
        reply.should.containEql("You never told me what color your favorite is.");
        done();
      });
    });

    xit("should evaluate colors - user facts 3", function(done) {
      bot.reply("user1", "my favorite color is red.", function(err, reply) {
        bot.reply("user1", "what is my favorite color", function(err, reply) {
          reply.should.containEql("Your favorite color is red.");
          done();
        });
      });
    });

  });

  describe('Numeric Other', function(){

    xit("should evaluate special case - roman numeral", function(done) {
      bot.reply("user1", "What is the Roman Numeral for 100?", function(err, reply) {
        reply.should.eql("I think it is C");
        done();
      });
    });

    xit("should evaluate special case - binary", function(done) {
      bot.reply("user1", "What is 7 in binary?", function(err, reply) {
        reply.should.eql("I think it is 111");
        done();
      });
    });

    xit("should evaluate special case - hexd", function(done) {
      bot.reply("user1", "What is 255 in hex?", function(err, reply) {
        reply.should.eql("I think it is ff");
        done();
      });
    });

    xit("should evaluate special case - sequence simple", function(done) {
      bot.reply("user1", "What number is missing: 1 2 ? 4 5", function(err, reply) {
        reply.should.eql("I think it is 3");
        done();
      });
    });

    xit("should evaluate special case - sequence linear", function(done) {
      bot.reply("user1", "What comes next in the sequence: 2 4 6 8 10 12?", function(err, reply) {
        reply.should.eql("I think it is 14");
        done();
      });
    });

    xit("should evaluate special case - sequence geo", function(done) {
      bot.reply("user1", "What comes next in the sequence: 1 2 4 8 16?", function(err, reply) {
        reply.should.eql("I think it is 32");
        done();
      });
    });

  });

  describe("Reason 2 - Compare concepts", function(){

  // Tom is more tall than Mary
  // Tom is less tall than Mary
  // Tom is taller than Mary and Tom is shorter than Joan.
  // Tom is taller than harry but shorter than Joan.
  // If John is taller than Mary, who is the taller

    xit("should be able to match 1", function(done){
      bot.reply("ruser1", "Tom is more tall than Mary", function(err, reply) {
        var fs = bot.getUser("ruser1");
        fs.memory.db.get({ subject: "tom"}, function(e,r){
          r[0].predicate.should.eql("tall");
          r[0].object.should.eql("mary");
          done();
        });
      });
    });

    xit("should be able to match 2", function(done){
      bot.reply("user2", "Tom is taller than Mary and Tom is shorter than Joan.", function(err, reply) {
        reply.should.eql("");
        var fs = bot.getUser("user2");
        fs.memory.db.get({ subject: "tom", predicate: 'tall'}, function(e,r){
          r[0].object.should.eql("mary");
          done();
        });
      });
    });

    xit("should be able to match 3 - non opposite adjectives", function(done){
      bot.reply("user3", "If John is taller than Mary, who is the taller", function(err, reply) {
        reply.should.eql("John is taller than Mary.");
        done();
      });
    });

    xit("should be able to match 3b - non-opposite adjectives", function(done){
      bot.reply("user4", "If John is shorter than Mary, who is the shorter", function(err, reply) {
        reply.should.eql("John is shorter than Mary.");
        done();
      });
    });

    xit("should be able to match 4 - opposite adjectives", function(done){
      bot.reply("user5", "If Jerry is taller than Jenny, who is the shorter", function(err, reply) {
        reply.should.eql("Jenny is shorter than Jerry.");
        done();
      });
    });

    xit("should be able to match 4b - miss adjectives", function(done){
      bot.reply("user6", "If John is shorter than Mary, who is the fatter", function(err, reply) {
        reply.should.eql("Those things don't make sense to compare.");
        done();
      });
    });

    xit("should be able to match 5a - YN", function(done){
      bot.reply("user7", "Jim is shorter than Roger. Do you know who is shorter?", function(err, reply) {
        reply.should.eql("Yes, Jim is shorter.");
        done();
      });
    });

    xit("should be able to match 5b - YN", function(done){
      bot.reply("user8", "Jim is shorter than Roger. Do you know who is taller?", function(err, reply) {
        reply.should.eql("Yes, Roger is taller.");
        done();
      });
    });

    xit("should be able to match 6 - least tall", function(done){
      bot.reply("user9", "Tom is taller then Harry", function(err, reply) {
        bot.reply("user9", "Of Tom and Harry, who is least tall?", function(err, reply) {
          reply.should.eql("Harry is shorter.");
          done();
        });
      });
    });


    xit("should be able to match 6b - less tall", function(done){
      bot.reply("user10", "Tom is taller then Harry", function(err, reply) {
        bot.reply("user10", "Who is less tall?", function(err, reply) {
          reply.should.eql("Harry is shorter than Tom.");
          done();
        });
      });
    });


    xit("should evaluate compare concepts, no need to reply yet", function(done) {
      bot.reply("user11", "John is older than Mary, and Mary is older than Sarah.", function(err, reply) {
        reply.should.eql("");
        var udb = bot.getUser("user11").memory;
        udb.db.get({ subject: "john", predicate: 'old'}, function(e,r){
          r[0].object.should.eql("mary");

          bot.reply("user11", "Who is older Sarah or Mary?", function(err, reply) {
            reply.should.eql("Mary is older than Sarah.");
            bot.reply("user11", "Who is older John or Sarah?", function(err, reply) {
              reply.should.eql("John is older than Sarah.");
              done();
            });
          });
        });
      });
    });

    // Switching to user2 to sandbox db facts are bleeding.
    xit("should evaluate compare", function(done){
      bot.reply("user12", "Kerry is taller than Mike, and Mike is taller than Tim.", function(err, reply) {
        bot.reply("user12", "Which of them is the tallest?", function(err, reply) {
          reply.should.eql("Kerry is the tallest.");
          done();
        });
      });
    });

    xit("should evaluate compare 2a", function(done){
      bot.reply("user13", "James is younger than Brad, and Brad is older than Sarah.", function(err, reply) {
        bot.reply("user13", "Which of them is the oldest?", function(err, reply) {
          reply.should.eql("Brad is the oldest.");
          done();
        });
      });
    });

    xit("should evaluate compare 2", function(done){
      bot.reply("user14", "John is taller than Mary and Mary is taller than Sue.", function(err, reply) {
        bot.reply("user14", "Who is shorter, John or Sue?", function(err, reply) {
          reply.should.eql("Sue is shorter than John.");
          done();
        });
      });
    });

    xit("should evaluate compare 3", function(done) {
      bot.reply("user15", "Jane is older than Janet. Who is the youngest?", function(err, reply) {
        reply.should.eql("Janet is the youngest.");
        done();
      });
    });

  });

  describe("Reason 3 - Auto Reply", function(){

    // it.only("should handle pronoun subsitution", function(done) {
    //   bot.reply("user1", "My oldest daughter is 11", function(err, reply) {
    //     bot.reply("user1", "How old is she?", function(err, reply) {
    //       console.log(reply.string);
    //       done();
    //     });
    //   });
    // });

    // Money
    xit("should analize and reply", function(done) {
      bot.reply("user1", "A loaf of bread cost 4.50 now.", function(err, reply) {
        bot.reply("user1", "How much is a loaf of bread?", function(err, reply) {
          reply.should.eql("It would cost $4.50.");
          done();
        });
      });
    });

    // Date
    xit("should analize and reply with date", function(done) {
      bot.reply("user1", "My birthday is next month.", function(err, reply) {
        bot.reply("user1", "When is my birthday?", function(err, reply) {
          // DUMMY - you can't hard code this.
          var m = moment().add(1, 'M');
          reply.should.eql("It is in " + m.format("MMMM") + ".");
          done();
        });
      });
    });

    // date.parse("October 4") true
    // date.parse("October") false
    xit("should analize and reply with date 3", function(done) {
      bot.reply("user1", "My birthday is in Oct", function(err, reply) {
        bot.reply("user1", "When is my birthday?", function(err, reply) {
          reply.should.eql("It is in October.");
          done();
        });
      });
    });

    // Distance
    xit("should analize and reply 3", function(done) {
      bot.reply("user1", "It is 300 miles from here to Kamloops.", function(err, reply) {
        bot.reply("user1", "How far is it to Kamloops?", function(err, reply) {
          reply.should.eql("300");
          done();
        });
      });
    });

    // WHO (basic)
    xit("should analize and with HUM 1", function(done) {
      bot.reply("user1", "My daughters name is Sydney.", function(err, reply) {
        bot.reply("user1", "My brothers name is Dustin.", function(err, reply) {
          bot.reply("user1", "What is my daughters name?", function(err, reply) {
            reply.should.eql("Sydney");
            bot.reply("user1", "What is my brothers name?", function(err, reply1) {
              reply1.should.eql("Dustin");
              done();
            });
          });
        });
      });
    });

    xit("should analize and with HUM 2", function(done) {
      bot.reply("user1", "My friends names are Steve and Heather", function(err, reply) {
        bot.reply("user1", "Who is my best friend?", function(err, reply) {
          reply.should.eql("Steve?");
          done();
        });
      });
    });

    xit("should analize 2", function(done) {
      bot.reply("user1", "What is a car used for?", function(err, reply) {
        reply.should.not.eql("");
        done();
      });
    });

    xit("should analize 2 - isA", function(done) {
      bot.reply("user1", "What is snow?", function(err, reply) {
        reply.should.not.eql("");
        done();
      });
    });

    xit("Reason resolve adj => noun", function(done) {
      bot.reply("user1xx", "I have a friend named Harry who likes to play tennis.", function(err, reply) {
        // bot.reply("user1xx", "What is the name of the friend I just told you about?", function(err, reply) {
          bot.reply("user1xx", "Do you know what game Harry likes to play?", function(err, reply) {
            done();
          });
        // });
      });
    });

    xit("PutA", function(done) {
      bot.reply("user1xx", "where can i put a dead body?", function(err, reply) {
        console.log(reply);
        done();
      });
    });

    xit("Located At", function(done) {
      bot.reply("user1xx", "Name something you would find on a beach.", function(err, reply) {
        reply.should.not.be.empty;
        done();
      });
    });

    xit("should know how to replace pronouns", function(done) {
      bot.reply("user1", "My favorite car is a Tesla", function(err, reply) {
        bot.reply("user1", "What is it?", function(err, reply) {
          ["tesla","car"].should.containEql(reply)
          done();
        });
      });
    });

    xit("should know how to replace pronouns 2", function(done) {
      bot.reply("user1", "My brother is turning 30 next week", function(err, reply) {
        bot.reply("user1", "How old is he?", function(err, reply) {
          reply.should.eql("he is 30");
          bot.reply("user1", "who was he?", function(err, reply) {
            reply.should.eql("he was your brother");
            done();
          });
        });
      });
    });

    // We have more of these in unit/history
    xit("should resolve reason 1", function(done) {
      bot.reply("user1", "I have a brother called Stuart. Who is Stuart?", function(err, reply) {
        reply.should.containEql("brother");
        done();
      });
    });

    xit("should resolve reason 1a", function(done) {
      bot.reply("user1", "My mother is called Janet. What is her name?", function(err, reply) {
        reply.should.containEql("Janet");
        done();
      });
    });

    xit("should resolve reason 1a2", function(done) {
      bot.reply("user1", "My uncle is called George. Who is George?", function(err, reply) {
        reply.should.containEql("uncle");
        done();
      });
    });


    xit("should resolve reason 1b", function(done) {
      bot.reply("user1", "I like to play football. What do I like to do?", function(err, reply) {
        reply.should.containEql("football");
        done();
      });
    });

    xit("should resolve reason 1c", function(done) {
      bot.reply("user1", "I have a pear and an apple. What do I have?", function(err, reply) {
        reply.should.containEql("You have a pear and an apple.");
        done();
      });
    });

    xit("should resolve reason 1c", function(done) {
      bot.reply("user1", "I am wearing a green shirt. What am I wearing?", function(err, reply) {
        reply.should.containEql("a shirt.");
        done();
      });
    });

    xit("should resolve reason 1d", function(done) {
      bot.reply("user1", "I have a dog called Rover. What is my dog called?", function(err, reply) {
        reply.should.containEql("Rover");
        done();
      });
    });

    xit("should resolve reason 1e", function(done) {
      bot.reply("user1", "I am 42 years old. How old am I?", function(err, reply) {
        reply.should.containEql("42");
        done();
      });
    });

    xit("should analize mistake", function(done) {
      bot.reply("user1", "all good-o? ", function(err, reply) {
        reply.should.not.eql("");
        done();
      });
    });

  });

  describe("Loebner 2014 Screener", function(){
    xit("should save knowledge", function(done) {
      bot.reply("r1user1", "Hello, my name is Adam.", function(err, reply) {
        reply.should.containEql("Nice to meet you, Adam.");
        bot.reply("r1user1", "My name is Adam.", function(err, reply1) {
          reply1.should.containEql("I know, you already told me your name.");
          done();
        });
      });
    });

    // Slightly more complex
    xit("Loebner Q1.A", function(done) {
      bot.reply("r1user1", "What is your name?", function(err, reply) {
        reply.should.containEql("My name is Brit.");
        done();
      });
    });

    xit("Loebner Q1.B", function(done) {
      bot.reply("r1user1", "Hello, my name is Adam, what is your name?", function(err, reply) {
        reply.should.containEql("I know, you already told me your name. My name is Brit.");
        done();
      });
    });

    xit("Loebner Q2, Q9 followup", function(done) {
      bot.reply("user1", "I live in Exeter in the UK. Where do you live?", function(err, reply) {
        reply.should.endWith("Vancouver.");
        // Follow up Q9.
        bot.reply("user1", "Where do I live?", function(err, reply3) {
          reply3.should.containEql("In Exeter, UK");
          done();
        });
      });
    });

    xit("Loebner Q6", function(done) {
      bot.reply("user1", "The car couldn't fit into the parking space because it was too small. What was too small?", function(err, reply) {
        reply.should.endWith("The space was too small.")
        done();
      });
    });

    xit("Loebner Q16", function(done) {
      bot.reply("user1", "What would I do with a spade? ", function(err, reply) {
        reply.should.endWith("A spade can be used for digging.")
        done();
      });
    });

    xit("Loebner Q7 A", function(done) {
      bot.reply("user1", "Which drink do you prefer, coffee, tea or hot chocolate?", function(err, reply) {
        reply.should.match(/hot chocolate|coffee|tea/);
        done();
      });
    });

    // We need to filter out bad/silly choices.
    xit("Loebner Q7 B", function(done) {
      bot.reply("user1", "Which drink do you prefer, sand, tea or rocks?", function(err, reply) {
        reply.should.match(/tea/);
        done();
      });
    });

    xit("Loebner Q7 C", function(done) {
      bot.reply("user1", "What do you prefer, sand, tea or rocks?", function(err, reply) {
        reply.should.match(/sand|tea|rocks/);
        done();
      });
    });

    xit("Loebner Q7 D", function(done) {
      bot.reply("user1", "What do you prefer, hot chocolate or french fries?", function(err, reply) {
        reply.should.match(/hot chocolate|french fries/i);
        done();
      });
    });
    // TODO - Auto aquire favorites.
    xit("Loebner Q4", function(done) {
      bot.reply("user1", "What is your favourite television program? ", function(err, reply) {
        done();
      });
    });

    xit("Loebner Q18", function(done) {
      bot.reply("user1", "What is your favourite chocolate bar?", function(err, reply) {
        reply.should.containEql("I don't have a favorite chocolate bar.")
        done();
      });
    });

    xit("Loebner Q3", function(done) {
      bot.reply("user1", "I like to listen to music and play football. Do you have any hobbies?", function(err, reply) {
        reply.should.endWith("I like Running.")
        done();
      });
    });

  });

  describe("Concept Resolution", function(){
    // We need concepts
    xit("should resolve reason 1a - concept support", function(done) {
      bot.reply("user1", "My parents are John and Susan. What is my mother called?", function(err, reply) {
        reply.should.containEql("Susan");
        done();
      });
    });

    xit("should resolve reason 1b - concept support", function(done) {
      bot.reply("user1", "My kids names are Jack and Janice. Who is my daughter?", function(err, reply) {
        reply.should.containEql("Janice");
        done();
      });
    });

    xit("should resolve reason 1c - concept support", function(done) {
      bot.reply("user1", "My parents are John and Susan. What is my dads name?", function(err, reply) {
        reply.should.containEql("John");
        done();
      });
    });

    xit("should resolve reason 1d - concept support", function(done) {
      bot.reply("user1", "My parents are John and Susan. Who are my parents?", function(err, reply) {
        reply.should.containEql("John and Susan");
        done();
      });
    });

    // TODO - buy blows the call stack?!?
    xit("should resolve reason 1e - concept support", function(done) {
      bot.reply("user1", "Where would I find pants?", function(err, reply) {
        reply.should.containEql("department store");
        done();
      });
    });

  });

  after(help.after);

});