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
  {
    category: "hydrology",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of hydrology",
    text: `Certainly! Here are 10 hydrology trivia questions with multiple choice answers, and the correct answers are indicated:

1. What is the term for the study of the distribution, movement, and quality of water in the Earth's atmosphere and on its surface?
    a) Hydrogenology
    b) Oceanography
    c) Hydrodynamics
    d) Hydrology (Correct Answer)

2. What is the largest source of Earth's freshwater supply?
    a) Lakes
    b) Groundwater
    c) Oceans
    d) Glaciers and ice caps (Correct Answer)

3. Which river is the longest in the world?
    a) Amazon
    b) Mississippi
    c) Nile (Correct Answer)
    d) Yangtze

4. What is the term for the process by which water in the form of vapor rises into the atmosphere from surfaces like lakes, rivers, and oceans?
    a) Precipitation
    b) Evaporation (Correct Answer)
    c) Condensation
    d) Infiltration

5. The water cycle involves the continuous movement of water through various stages. What is the correct sequence of these stages?
    a) Evaporation, Condensation, Precipitation
    b) Precipitation, Evaporation, Condensation
    c) Condensation, Precipitation, Evaporation (Correct Answer)
    d) Evaporation, Precipitation, Condensation

6. What is the term for the underground layer of water-bearing rock from which groundwater can be extracted?
    a) Watershed
    b) Aquifer (Correct Answer)
    c) Permafrost
    d) Reservoir

7. Which of the following is a measure of the acidity or alkalinity of water on a scale of 0 to 14, with 7 being neutral?
    a) Salinity
    b) Turbidity
    c) pH (Correct Answer)
    d) Alkalinity

8. What is the term for the slow downhill movement of soil and rock material saturated with water?
    a) Erosion
    b) Leaching
    c) Percolation
    d) Landslide (Correct Answer)

9. Which ocean current is responsible for the mild climate in Western Europe, particularly in the United Kingdom and Ireland?
    a) Gulf Stream (Correct Answer)
    b) Kuroshio Current
    c) Humboldt Current
    d) Labrador Current

10. What is the term for the process of melting and breaking apart of icebergs or glaciers due to the absorption of sunlight or warmer temperatures?
    a) Calving (Correct Answer)
    b) Melting
    c) Sublimation
    d) Freezing

These questions come with the correct answers clearly indicated. Enjoy your hydrology trivia quiz!`,
  },
  {
    category: "world history",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of world history",
    text: `Certainly! Here are 10 world history trivia questions with multiple choice answers, and the correct answers are indicated:

1. In which year did Christopher Columbus first reach the Americas?
    a) 1492 (Correct Answer)
    b) 1517
    c) 1607
    d) 1776

2. Who was the first President of the United States?
    a) Thomas Jefferson
    b) John Adams
    c) George Washington (Correct Answer)
    d) Benjamin Franklin

3. The Industrial Revolution began in which country?
    a) France
    b) England (Correct Answer)
    c) Germany
    d) China

4. The Magna Carta, signed in 1215, is often considered a cornerstone of modern constitutional government. In which country was it signed?
    a) France
    b) England (Correct Answer)
    c) Italy
    d) Spain

5. Which ancient civilization built the Great Wall of China?
    a) Roman Empire
    b) Persian Empire
    c) Qin Dynasty (Correct Answer)
    d) Ottoman Empire

6. The Renaissance period originated in which city?
    a) Paris
    b) Florence (Correct Answer)
    c) Rome
    d) Athens

7. Who was the leader of the Soviet Union during World War II?
    a) Vladimir Lenin
    b) Joseph Stalin (Correct Answer)
    c) Nikita Khrushchev
    d) Mikhail Gorbachev

8. The Treaty of Versailles, signed in 1919, officially ended which war?
    a) World War I (Correct Answer)
    b) World War II
    c) Korean War
    d) Vietnam War

9. The ancient city of Babylon was located in present-day:
    a) Egypt
    b) Iraq (Correct Answer)
    c) Greece
    d) Turkey

10. Who was the first female monarch of England?
    a) Elizabeth I (Correct Answer)
    b) Mary, Queen of Scots
    c) Anne Boleyn
    d) Victoria

These questions come with the correct answers clearly indicated. Enjoy your world history trivia quiz!`,
  },
  {
    category: "canadiana",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of canadiana",
    text: `Certainly! Here are 10 Canadiana trivia questions with multiple choice answers, and the correct answers are indicated:

1. What is the national symbol of Canada?
    a) Moose
    b) Beaver (Correct Answer)
    c) Maple Leaf
    d) Polar Bear

2. In which year did Canada officially become a country?
    a) 1776
    b) 1867 (Correct Answer)
    c) 1901
    d) 1921

3. What is the capital city of Canada?
    a) Vancouver
    b) Toronto
    c) Ottawa (Correct Answer)
    d) Montreal

4. Which Canadian province is known for having the highest percentage of French speakers?
    a) British Columbia
    b) Alberta
    c) Quebec (Correct Answer)
    d) Ontario

5. Which iconic waterfall is located on the border between Canada and the United States?
    a) Niagara Falls (Correct Answer)
    b) Athabasca Falls
    c) Horseshoe Falls
    d) Victoria Falls

6. What is the name of the national anthem of Canada?
    a) O Canada (Correct Answer)
    b) God Save the Queen
    c) The Maple Leaf Forever
    d) Home for a Rest

7. Which province is known for its distinctive and colorful row houses in the city of St. John's?
    a) Nova Scotia
    b) Prince Edward Island
    c) Newfoundland and Labrador (Correct Answer)
    d) New Brunswick

8. What is the Canadian term for a one-dollar coin?
    a) Nickel
    b) Loonie (Correct Answer)
    c) Toonie
    d) Twonie

9. Which Canadian province is the largest by land area?
    a) Ontario
    b) Quebec
    c) British Columbia (Correct Answer)
    d) Alberta

10. What is the name of the famous annual music awards show in Canada?
    a) Juno Awards (Correct Answer)
    b) Maple Music Awards
    c) Canadian Music Excellence
    d) Great White North Music Awards

These questions come with the correct answers clearly indicated. Enjoy your Canadiana trivia quiz!`,
  },
  {
    category: "americana",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of americana",
    text: `Certainly! Here are 10 Americana trivia questions with multiple choice answers, and the correct answers are indicated:

    1. What is the national bird of the United States?
       a) Bald Eagle (Correct Answer)
       b) American Robin
       c) Wild Turkey
       d) Peregrine Falcon
    
    2. In which year did the United States declare its independence from Great Britain?
       a) 1765
       b) 1776 (Correct Answer)
       c) 1789
       d) 1812
    
    3. Which mountain range stretches from Canada to New Mexico in the United States?
       a) Rocky Mountains (Correct Answer)
       b) Appalachian Mountains
       c) Sierra Nevada
       d) Cascade Range
    
    4. What is the official nickname of Texas?
       a) The Sunshine State
       b) The Lone Star State (Correct Answer)
       c) The Empire State
       d) The Volunteer State
    
    5. Which river is the longest in the United States?
       a) Mississippi River
       b) Missouri River
       c) Ohio River
       d) Missouri-Mississippi system (Correct Answer)
    
    6. What iconic structure stands at the heart of the National Mall in Washington, D.C.?
       a) White House
       b) Washington Monument (Correct Answer)
       c) Lincoln Memorial
       d) United States Capitol
    
    7. Who was the third President of the United States and the principal author of the Declaration of Independence?
       a) John Adams
       b) Thomas Jefferson (Correct Answer)
       c) James Madison
       d) Benjamin Franklin
    
    8. In what year did Alaska and Hawaii become the 49th and 50th states, respectively?
       a) 1945
       b) 1959 (Correct Answer)
       c) 1964
       d) 1976
    
    9. Which American author wrote the classic novels "The Adventures of Tom Sawyer" and "Adventures of Huckleberry Finn"?
       a) Nathaniel Hawthorne
       b) Mark Twain (Correct Answer)
       c) Edgar Allan Poe
       d) F. Scott Fitzgerald
    
    10. What is the name of the iconic road that stretches from Chicago to Santa Monica, passing through numerous states?
        a) Route 66 (Correct Answer)
        b) Pacific Coast Highway
        c) Blue Ridge Parkway
        d) Great River Road
    
    These questions come with the correct answers clearly indicated. Enjoy your Americana trivia quiz!`,
  },
  {
    category: "americana",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of americana",
    text: `Certainly! Here are 10 Americana trivia questions with multiple choice answers, and the correct answers are indicated:

1. What is the national bird of the United States?
    a) Bald Eagle (Correct Answer)
    b) American Robin
    c) Wild Turkey
    d) Peregrine Falcon

2. In which year did the United States declare its independence from Great Britain?
    a) 1765
    b) 1776 (Correct Answer)
    c) 1789
    d) 1812

3. Which mountain range stretches from Canada to New Mexico in the United States?
    a) Rocky Mountains (Correct Answer)
    b) Appalachian Mountains
    c) Sierra Nevada
    d) Cascade Range

4. What is the official nickname of Texas?
    a) The Sunshine State
    b) The Lone Star State (Correct Answer)
    c) The Empire State
    d) The Volunteer State

5. Which river is the longest in the United States?
    a) Mississippi River
    b) Missouri River
    c) Ohio River
    d) Missouri-Mississippi system (Correct Answer)

6. What iconic structure stands at the heart of the National Mall in Washington, D.C.?
    a) White House
    b) Washington Monument (Correct Answer)
    c) Lincoln Memorial
    d) United States Capitol

7. Who was the third President of the United States and the principal author of the Declaration of Independence?
    a) John Adams
    b) Thomas Jefferson (Correct Answer)
    c) James Madison
    d) Benjamin Franklin

8. In what year did Alaska and Hawaii become the 49th and 50th states, respectively?
    a) 1945
    b) 1959 (Correct Answer)
    c) 1964
    d) 1976

9. Which American author wrote the classic novels "The Adventures of Tom Sawyer" and "Adventures of Huckleberry Finn"?
    a) Nathaniel Hawthorne
    b) Mark Twain (Correct Answer)
    c) Edgar Allan Poe
    d) F. Scott Fitzgerald

10. What is the name of the iconic road that stretches from Chicago to Santa Monica, passing through numerous states?
    a) Route 66 (Correct Answer)
    b) Pacific Coast Highway
    c) Blue Ridge Parkway
    d) Great River Road

These questions come with the correct answers clearly indicated. Enjoy your Americana trivia quiz!`,
  },
  {
    category: "american history",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of american history",
    text: `Certainly! Here are 10 American history trivia questions with multiple choice answers, and the correct answers are indicated:

1. Who was the first President of the United States?
    a) Thomas Jefferson
    b) George Washington (Correct Answer)
    c) John Adams
    d) James Madison

2. In what year did the United States gain independence from Great Britain?
    a) 1765
    b) 1776 (Correct Answer)
    c) 1789
    d) 1801

3. What was the main cause of the American Civil War?
    a) Slavery (Correct Answer)
    b) Economic disparities
    c) States' rights
    d) Territorial expansion

4. Who delivered the famous "I Have a Dream" speech during the March on Washington in 1963?
    a) Malcolm X
    b) Martin Luther King Jr. (Correct Answer)
    c) John F. Kennedy
    d) Rosa Parks

5. Which document outlined the fundamental principles of the United States and was adopted in 1787?
    a) Bill of Rights
    b) Emancipation Proclamation
    c) Articles of Confederation
    d) United States Constitution (Correct Answer)

6. What event prompted the United States to enter World War II?
    a) Pearl Harbor attack (Correct Answer)
    b) Battle of the Bulge
    c) D-Day invasion
    d) Hiroshima bombing

7. Who was the 16th President of the United States, serving during the Civil War?
    a) Ulysses S. Grant
    b) Andrew Johnson
    c) Abraham Lincoln (Correct Answer)
    d) James Buchanan

8. Which amendment to the U.S. Constitution granted women the right to vote?
    a) 18th Amendment
    b) 19th Amendment (Correct Answer)
    c) 21st Amendment
    d) 26th Amendment

9. What was the name of the ship that transported the Pilgrims to the New World in 1620?
    a) Mayflower (Correct Answer)
    b) Nina
    c) Santa Maria
    d) Speedwell

10. Who was the primary author of the Declaration of Independence?
    a) John Adams
    b) Thomas Jefferson (Correct Answer)
    c) Benjamin Franklin
    d) John Hancock

These questions come with the correct answers clearly indicated. Enjoy your American history trivia quiz!`,
  },  
  {
    category: "canadian history",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of canadian history",
    text: `Certainly! Here are 10 Canadian history trivia questions with multiple choice answers, and the correct answers are indicated:

1. Which explorer is often credited with being the first European to reach Canada?
    a) Jacques Cartier
    b) John Cabot
    c) Samuel de Champlain
    d) Leif Erikson (Correct Answer)

2. What year did Canada officially become a self-governing dominion within the British Empire?
    a) 1783
    b) 1867 (Correct Answer)
    c) 1901
    d) 1931

3. Which indigenous group played a crucial role in assisting European settlers in Canada, particularly during the fur trade era?
    a) Haida
    b) Cree
    c) Iroquois
    d) Mi'kmaq (Correct Answer)

4. During which conflict did Canada experience its first significant military action as a nation?
    a) World War I
    b) Boer War
    c) War of 1812 (Correct Answer)
    d) Korean War

5. What event is considered a turning point in the history of French-English relations in Canada, resulting in the Quiet Revolution?
    a) Battle of Quebec
    b) Plains of Abraham
    c) October Crisis
    d) Quiet Revolution (Correct Answer)

6. Which Canadian province joined the Confederation most recently, in 1999?
    a) Newfoundland and Labrador (Correct Answer)
    b) Nunavut
    c) Alberta
    d) Yukon

7. What was the purpose of the Canadian Pacific Railway, completed in 1885?
    a) Connecting the Atlantic and Pacific Oceans
    b) Facilitating westward expansion (Correct Answer)
    c) Transporting goods to Europe
    d) Enabling Arctic exploration

8. Who was the first Prime Minister of Canada?
    a) Alexander Mackenzie
    b) Sir John A. Macdonald (Correct Answer)
    c) William Lyon Mackenzie King
    d) Sir Wilfrid Laurier

9. What was the outcome of the October Crisis in 1970?
    a) The Quebec independence referendum
    b) The repatriation of the Constitution
    c) The FLQ kidnapped government officials (Correct Answer)
    d) The Patriation of the Canadian Constitution

10. In 1965, Canada adopted a new national flag. What is it commonly known as?
    a) Union Jack
    b) Maple Leaf (Correct Answer)
    c) Red Ensign
    d) Fleur-de-lis

These questions come with the correct answers clearly indicated. Enjoy your Canadian history trivia quiz!`,
  },  
  {
    category: "biology",
    prompt: "Generate 10 trivia questions with multiple choice answers, correct one indicated, on the topic of biology",
    text: `Certainly! Here are 10 biology trivia questions with multiple choice answers, and the correct answers are indicated:

1. What is the powerhouse of the cell?
    a) Nucleus
    b) Mitochondria (Correct Answer)
    c) Ribosome
    d) Endoplasmic reticulum

2. Which molecule stores genetic information in cells?
    a) RNA
    b) DNA (Correct Answer)
    c) Protein
    d) Lipid

3. What is the process by which plants make their own food using sunlight?
    a) Respiration
    b) Photosynthesis (Correct Answer)
    c) Fermentation
    d) Transpiration

4. In the human body, where is the smallest bone located?
    a) Finger
    b) Ear (Correct Answer)
    c) Toe
    d) Nose

5. Which part of the brain is responsible for regulating basic bodily functions such as breathing and heart rate?
    a) Cerebrum
    b) Cerebellum
    c) Medulla oblongata (Correct Answer)
    d) Thalamus

6. What is the main function of red blood cells?
    a) Carrying oxygen (Correct Answer)
    b) Fighting infections
    c) Producing hormones
    d) Storing nutrients

7. Which organelle is responsible for breaking down and recycling cellular waste?
    a) Golgi apparatus
    b) Lysosome (Correct Answer)
    c) Endoplasmic reticulum
    d) Vacuole

8. What is the name of the process by which a cell divides into two identical daughter cells?
    a) Mitosis (Correct Answer)
    b) Meiosis
    c) Replication
    d) Transcription

9. What is the largest organ in the human body?
    a) Liver
    b) Skin (Correct Answer)
    c) Heart
    d) Lungs

10. Which gas is released during photosynthesis?
    a) Oxygen (Correct Answer)
    b) Carbon dioxide
    c) Nitrogen
    d) Hydrogen

These questions come with the correct answers clearly indicated. Enjoy your biology trivia quiz!`,
  },  
];
