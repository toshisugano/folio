//**** INDEX MODEL ****
var IndexModel = Backbone.Model.extend({
   defaults: {}
});

//INDEX MODEL INSTANCES
var indexModel = new IndexModel({   
"image1" : "images/img-1.jpg",
"h1" : "Introduction",
"p1" : "Officially, India is a developing country, but the reality of existence for the underbelly of the population that lives below the poverty line is very much a third-world one. I wrote LEECHES to highlight the practice of contract marriages in communities so disadvantaged that they have allowed themselves to mask what is blatantly a sex-slave trade behind the veil of acceptable religious ritual.",
"p2" : "In Hyderabad’s old city, rich businessmen prey on the virginity of underage girls in an archaic practice that is still propagated under the auspices of Islamic marriage laws, which allow a man to have four wives at a time. These men take brides for short periods, sometimes just a night, with rates varying according to the duration of the marriage, leading to the nickname 'one-day bride'. An intricate web of opportunists facilitate this flesh trade, including many clerics, who work for clients with a predilection for teenage-virgin brides.",
"image2" : "images/img-2.jpg",
"p3" : "I came across this practice while living in the city two years ago, thereafter researching the facts through Shaheen, an NGO that helps girls who run away from such arrangements, forced upon them by desperate or greedy families.", 
"p4" : "I chose the character of Raisa as the protagonist because she represents the great courage of spirit possessed by girls who refuse to accept these sham marriages as their fate.  Regardless of Raisa’s fate in the film, her actions bring hope to a dark reality. With his film, it is my aim to capture the frenetic, terrifying energy of the old city & the desperation of its people, set against the timelessness of the Charminar, a metaphor for Raisa’s eternal sacrifice in the film."
});

//**** SYNOPSIS MODEL ****
var SynopsisModel = Backbone.Model.extend({
    defaults: {}

});
//SYNOPSIS MODEL INSTANCE
var synopsisModel = new SynopsisModel({
    "h1" : "2016 | INDIA | 27 MINS",
    "h2" : "DIRECTOR'S STATEMENT",
    "h3" : "FILMMAKER",
    "image1" : "images/payal_small.jpg",
    "p1" : "In the chaotic old city of Hyderabad, 18-year old Raisa hatches a dangerous and improbable plan to save her younger sister from becoming a one-day bride. ",
    "p2" : "Officially, India is a developing country, but the reality of existence for the underbelly of the population that lives below the poverty line is very much a third-world one.  This film portrays the practice of contract marriages in communities so disadvantaged that they have masked what is blatantly a sex-slave trade behind the veil of acceptable religious ritual. In Hyderabad’s old city, rich businessmen prey on the virginity of underage girls in an archaic tradition that is still propagated under the auspices of Islamic marriage laws. These men take brides for short periods, sometimes just a night. They call these girls one-day-brides. Contract marriage is a last resort for families in Muslim ghettos; a cleric draws up both marriage and divorce contracts simultaneously so that the businessman may end the ‘marriage’ whenever he is ready to leave the city. ",
    "p3" : "Payal Sethi graduated from Vassar College with a major in Film Production & History. She also studied 16mm film production at NYU's Tisch School of the Arts. After graduating, she worked at Mira Nair's Mirabai Films on the THE NAMESAKE, HYSTERICAL BLINDNESS and VANITY FAIR, and later at the Tribeca Film Festival as the Manager of the TFI Sloan Filmmaker Fund.<br><br>She has programmed screenplays and films, and managed industry relations at premier film festivals and markets in New York. She has worked with the Independent Feature Project - IFP Market, Hamptons International Film Festival, New York Indian Film Festival, Asian American International Film Festival & Bengaluru International Film Festival. In 2008, she co-founded the production and distribution company, FilmKaravan. She is presently the advisory board of the 1st Zero MM South Asia Youth Film Festival.<br><br>Payal made her directorial debut with the short film GRANT ST. SHAVING CO., which won the best film award at The Smalls Film Festival and Florence River to River Film Festival, and the Silver Palm Award at the Mexico International Film Festival. GRANT ST. SHAVING CO. was an official selection at over a dozen film festivals worldwide, and secured distribution in the US, UK, Turkey and Japan. Her latest short film, LEECHES won the Grand Prix Internationale at the Brussels Short Film Festival and the Audience Award at the Seoul International Women's Film Festival, in addition to numerous other awards all over the world. LEECHES has screened at 35 film festivals to date, including the Tampere Film Festival, Durban International Film Festival and the Palm Springs Shortfest, and will be released digital worldwide by 2017.<br><br>In 2012, Payal received the Asia Society's New Voices Fellowship for Screenwriters for PANTHER a wildlife crime thriller set in Ranthambore & Delhi. She has written an adaptation of  the Argentinean film, A BOYFRIEND FOR MY WIFE, for Azure Entertainment, and is currently working on her debut feature, MAYA DELUXE a dramatic thriller with a strong humanistic angle, while also developing three other feature scripts: OOTY QUEEN, OPERATION LAMBODAR  & PANTHER.<br><br>"
});

//**** NEWS MODEL CLASS ****
var NewsModel = Backbone.Model.extend({
    defaults: {}
});

//**** PREVIEW MODEL CLASS
var PreviewModel = Backbone.Model.extend({
    defaults: {}
});

//**** DIARY MODEL CLASS
var DiaryModel = Backbone.Model.extend({
        defaults: {}
    });
