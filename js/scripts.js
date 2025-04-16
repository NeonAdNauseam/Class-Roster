// Scripting

// Data source
const url = "https://assets.codepen.io/16425/web-3-spring-2024-roster.json";

// Get data
fetch(url)
  .then( response  => response.json())
  .then( data  => {
    
    // check-check: is the data good?
    console.log(data);
    console.log(data.Name);
    console.log(data.Image);

    // get container for data
    const roster = document.querySelector(".roster");

    // loop through data
    data.forEach( student => {
      
      // template
      const template = `
          <figure>
            <figcaption> ${student.Name} </figcaption>
            <img src=" ${student.Image} " alt=" ${student.Name} ">
          </figure>
       `;

      // insert EACH `student` record into container
      roster.insertAdjacentHTML("afterbegin", template);
    });
  });
