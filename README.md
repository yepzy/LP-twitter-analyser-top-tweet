```
   _______  ____   _____    _______ __          __ ______  ______  _______ 
  |__   __|/ __ \ |  __ \   |__   __|\ \        / /|  ____||  ____||__   __|
     | |  | |  | || |__) |     | |    \ \  /\  / / | |__   | |__      | |   
     | |  | |  | ||  ___/      | |     \ \/  \/ /  |  __|  |  __|     | |   
     | |  | |__| || |          | |      \  /\  /   | |____ | |____    | |   
     |_|   \____/ |_|          |_|       \/  \/    |______||______|   |_|   
```

  ---

  List the {NB_MAX_TOP_TWEET} tweets most retweeted and the most favorited, in a elapsed time {MAX_TIME_ELAPSED}.

  You will have to configure the environnement variables :
  *	RABBITMQ_URL
  >	URL of the RabbitMQ server
  *	NB_MAX_TOP_TWEET
  >	Number of tweet in the top tweets 
  **(default : 10)**
  *	MAX_TIME_ELAPSED
  > Time maximum elapsed before remove from ranking the tweet from the top tweets 
  **(default : 1h)**
  *	LOG_FILE
  >	Path of the log file 
  **(default : "top-tweet.log")**


  ---
  Project realised by the **Mandarine Team**