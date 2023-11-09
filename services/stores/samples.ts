// 'use server'

import moment from 'moment';
import { Post } from "@/types/Post"

export const samplePosts: Post[] = [
  // {
  //     id: "1f283a48-19d9-4021-8bb4-0323342f302a", //crypto.randomUUID(),
  //     postedBy: "POSTER1",
  //     postedAt: moment().startOf('day').valueOf(),
  //     content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.",
  // },
  {
    id: "7282d48f-6dd7-4b00-ac32-4bee12c6e732", //crypto.randomUUID(),
    position: 0,
    postedBy: "POSTER2",
    postedAt: moment().valueOf(),
    content: "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure.    ",
  },
  {
    id: "6ad38003-44cb-4b49-997d-5e65746a86d8", //crypto.randomUUID(),
    position: 3,
    postedBy: "POSTER3",
    postedAt: moment().subtract(30, 'days').valueOf(),
    content: "Good news everyone! With placeholder text from shows like Futurama, Doctor Who, Dexter, and Monty Python, Fillerama is the perfect Lorem Ipsum for the TV lover in all of us.",
  },
  {
    id: "10671469-3468-41c0-99b3-4e99527dd167", //crypto.randomUUID(),
    position: 2,
    postedBy: "POSTER4",
    postedAt: moment().subtract(3, 'days').valueOf(),
    content: "The most hipster lorem ipsum generator around, though you’ve probably never heard of it.",
  },
];

export const triviaQuestions: any[] = [
  {
    category: "popular culture",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of popular culture",
    text: `Certainly! Here are 10 popular culture trivia questions with multiple choice answers, and the correct answers are indicated:

1. Which artist is known for the album "Thriller" and the iconic song "Billie Jean"?
    a) Prince
    b) Michael Jackson (Correct Answer)
    c) Madonna
    d) David Bowie

2. Who played the character of Tony Stark (Iron Man) in the Marvel Cinematic Universe?
    a) Chris Hemsworth
    b) Robert Downey Jr. (Correct Answer)
    c) Chris Evans
    d) Mark Ruffalo

3. What is the name of the fictional wizarding school in the Harry Potter series?
    a) Elmsworth School
    b) Greenbrier Academy
    c) Hogwarts School of Witchcraft and Wizardry (Correct Answer)
    d) Merlin's Institute

4. In the TV series "Friends," what is the name of Ross and Monica's dog when they were kids?
    a) Buddy
    b) Fido
    c) Skipper
    d) Chi-Chi (Correct Answer)

5. Which animated film features a character named Simba and the song "Circle of Life"?
    a) Aladdin
    b) Mulan
    c) The Lion King (Correct Answer)
    d) Beauty and the Beast

6. Who is the lead singer of the rock band Queen?
    a) John Deacon
    b) Brian May
    c) Roger Taylor
    d) Freddie Mercury (Correct Answer)

7. What is the highest-grossing film of all time, as of my last update in January 2022?
    a) Avatar
    b) Avengers: Endgame (Correct Answer)
    c) Titanic
    d) Star Wars: The Force Awakens

8. Which Netflix series is based on a young adult novel series by Jenny Han and follows the character Lara Jean Covey?
    a) 13 Reasons Why
    b) The Witcher
    c) To All the Boys I've Loved Before (Correct Answer)
    d) Stranger Things

9. Who is the author of the "Harry Potter" book series?
    a) J.R.R. Tolkien
    b) J.K. Rowling (Correct Answer)
    c) George R.R. Martin
    d) Suzanne Collins

10. In the 1985 film "Back to the Future," what is the name of the time-traveling DeLorean's inventor?
    a) Doc Brown (Correct Answer)
    b) Marty McFly
    c) Biff Tannen
    d) George McFly

Enjoy your popular culture trivia quiz!`
  },
  {
    category: "geography",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of geography",
    text: `Certainly! Here are 10 geography trivia questions with multiple choice answers, and the correct answers are indicated:

1. Which of the following countries is the largest by land area?
    a) Russia
    b) China
    c) United States
    d) Canada (Correct Answer)

2. The Amazon River is primarily located in which continent?
    a) Africa
    b) Asia
    c) South America (Correct Answer)
    d) Europe

3. What is the capital city of Australia?
    a) Sydney
    b) Melbourne
    c) Canberra (Correct Answer)
    d) Brisbane

4. Which desert is the largest in the world?
    a) Sahara Desert
    b) Gobi Desert
    c) Kalahari Desert
    d) Antarctica (Correct Answer)

5. The Great Wall of China was primarily built to protect against invasions from which group?
    a) Mongols
    b) Huns
    c) Romans
    d) Xiongnu (Correct Answer)

6. Which mountain is the tallest on Earth above sea level?
    a) Mount Kilimanjaro
    b) Mount Everest (Correct Answer)
    c) Mount McKinley
    d) Mount Fuji

7. The Suez Canal connects the Mediterranean Sea to which body of water?
    a) Atlantic Ocean
    b) Red Sea (Correct Answer)
    c) Indian Ocean
    d) Black Sea

8. Which city is known as the "City of Canals" and is famous for its gondolas?
    a) Venice (Correct Answer)
    b) Amsterdam
    c) Paris
    d) Barcelona

9. What is the southernmost continent on Earth?
    a) Asia
    b) Africa
    c) Antarctica (Correct Answer)
    d) Australia

10. The capital city of South Korea is:
    a) Seoul (Correct Answer)
    b) Busan
    c) Tokyo
    d) Beijing

These questions come with the correct answers clearly indicated. Enjoy your geography trivia quiz!`
  },
  {
    category: "science",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of science",
    text: `Certainly! Here are 10 science trivia questions with multiple choice answers, and the correct answers are indicated:

1. What is the chemical symbol for iron?
  a) Fe (Correct Answer)
  b) Ir
  c) In
  d) Io

2. Which planet is known as the "Morning Star"?
  a) Venus (Correct Answer)
  b) Mars
  c) Mercury
  d) Jupiter

3. What is the largest mammal in the world?
  a) Elephant
  b) Blue whale (Correct Answer)
  c) Giraffe
  d) Dolphin

4. What is the process by which plants make their own food using sunlight?
  a) Respiration
  b) Digestion
  c) Photosynthesis (Correct Answer)
  d) Fermentation

5. Which gas do plants absorb from the atmosphere during photosynthesis?
  a) Oxygen
  b) Carbon dioxide (Correct Answer)
  c) Nitrogen
  d) Hydrogen

6. What is the chemical symbol for silver?
  a) Ag (Correct Answer)
  b) Si
  c) Sn
  d) Sr

7. Which gas is responsible for the Earth's ozone layer depletion?
  a) Oxygen
  b) Carbon dioxide
  c) Nitrogen
  d) Chlorofluorocarbons (Correct Answer)

8. In the pH scale, a pH of 7 is considered:
  a) Acidic
  b) Basic
  c) Neutral (Correct Answer)
  d) Alkaline

9. What is the smallest planet in our solar system?
  a) Earth
  b) Mars
  c) Jupiter
  d) Mercury (Correct Answer)

10. What is the process by which a liquid changes into a gas at the surface of the liquid?
  a) Condensation
  b) Evaporation (Correct Answer)
  c) Sublimation
  d) Precipitation

These questions come with the correct answers clearly indicated. Enjoy your science trivia quiz!`
  },

];
