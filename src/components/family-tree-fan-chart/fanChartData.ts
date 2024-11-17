export const fanChartData = [
  // Generation 1: Main person
  [{ name: "John Doe", birth: "1980" }],

  // Generation 2: Parents
  [
    { name: "Jane Doe", birth: "1955" }, // Mother
    { name: "Richard Doe", birth: "1950" }, // Father
  ],

  // Generation 3: Grandparents
  [
    { name: "Alice Smith", birth: "1930" }, // Maternal grandmother
    { name: "Bob Smith", birth: "1928" }, // Maternal grandfather
    { name: "Clara Doe", birth: "1932" }, // Paternal grandmother
    { name: "George Doe", birth: "1925" }, // Paternal grandfather
  ],

  // Generation 4: Great-grandparents
  [
    { name: "Mary Brown", birth: "1905" }, // Maternal great-grandmother (Alice's mother)
    { name: "Paul Brown", birth: "1900" }, // Maternal great-grandfather (Alice's father)
    { name: "Eve Taylor", birth: "1903" }, // Maternal great-grandmother (Bob's mother)
    { name: "Henry Taylor", birth: "1901" }, // Maternal great-grandfather (Bob's father)
    { name: "Sophia White", birth: "1907" }, // Paternal great-grandmother (Clara's mother)
    { name: "Charles White", birth: "1902" }, // Paternal great-grandfather (Clara's father)
    { name: "Isabelle Black", birth: "1906" }, // Paternal great-grandmother (George's mother)
    { name: "Edward Black", birth: "1904" }, // Paternal great-grandfather (George's father)
  ],
];
