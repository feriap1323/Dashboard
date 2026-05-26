// console.log("Hello world")

// const country = {
//     country_id: 1,
//     cname: "India",
//     capital: "New Delhi",
//     famous_cities: ["Ahmedabad", "Mumbai", "Delhi", "Jaipur"],
//     pm: "Narendra Modi",
//     cm: "Bhupendra Patel",
//     singh: "Tiger"
// };

// // Access data
// console.log("Country ID:", country.country_id);
// console.log("Country Name:", country.cname);
// console.log("Capital:", country.capital);
// console.log("Famous Cities:", country.famous_cities);
// console.log("Prime Minister:", country.pm);
// console.log("Chief Minister:", country.cm);
// console.log("National Animal:", country.singh);


// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });

fetch('https://dummyjson.com/recipes/1')
.then(res => res.json())
.then(console.log);


