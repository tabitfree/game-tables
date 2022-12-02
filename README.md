# game-tables

App is still in progress. Most of the backend parts are implemented, i'm still not implementing most of the frontend parts. But it is functional.

### Description

pages available: /, /game-creator, /profile

App in which user can build tables for their games (darts, chess, etc.). Tables are used for real time records of the game/tournament and easily managable. User can view his history of games in his profile. User can create reusable team that will have it's own statistics.

## Local setup

You need to setup google client id and google client secret for oauth in your **.env** file with your database url as well as api auth url.

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

DATABASE_URL

NEXTAUTH_URL='http://localhost:3000/api/auth'

## Technologies

**FE** nextjs (animations-GSAP [green sock])

**DB** postgreSQL

**DB query tool** Prisma

**hosting** heroku (to be done)

## What is done so far

I've done signup + signin functionlaity.

I've done the functionality of creating a group of people that is assignable to a one game at a time.

You can play darts and save your progress. I have to implement to save the player that is on turn in the time of the save.

## Games

In this section I will try to write the description how the games are being processed by app.

### Darts

User can play 301, 501 and 701 darts with ending on single, double or triple! User can input the points in number input as well as clicking on dart table

#### Darts flow

input = gameData

1. Put current state of the game to the state of Darts component
   1. Game already played before
      1. Indicate who is on turn
      2. Once user is ready, he can start it
   2. Game is being played for the first time
      1. Choose options for the game of Darts (301, 501, etc..)
      2. User can make order of the players on his own
      3. Once user is ready, he can start the game (game will be saved to the database)
2. Render table with all the players and their current score.
3. User can put in points current player threw
4. Points in input will substract current players points
5. Player after current player will be on turn.
6. If this was the last player of round, go to step 7 otherwise repeat from 3.
7. End of turn procedure:
   1. save current player points to gameHistory,
   2. save gameHistory to database,
   3. go to step 3.
