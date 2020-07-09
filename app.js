const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer
.prompt([
    {
        type: "input",
        message: "Manager: Enter your name.",
        name: "name"
    },
    {
        type: "input",
        message: "Manager: Enter your id.",
        name: "id"
    },
    {
        type: "input",
        message: "Manager: Enter your email",
        name: "email"
    },
    {
        type: "input",
        message: "Manager: Enter your office number.",
        name: "officeNum"
    },
    {
        type: "input",
        message: "How many engineers do you want to add?",
        name: "engineers"
    },
    {
        type: "input",
        message: "How many interns do you want to add?",
        name: "interns"
    }
])
.then(async function(response) {
    const employees = [];
    const newManager = new Manager(response.name, response.id, response.email, response.officeNum);
    employees.push(newManager);

    for (let i = 0; i < response.engineers; i++) {
        let num = i+1;
        await inquirer
        .prompt([
            {
                type: "input",
                message: `Engineer ${num}: Enter name.`,
                name: "name"
            },
            {
                type: "input",
                message: `Engineer ${num}: Enter id.`,
                name: "id"
            },
            {
                type: "input",
                message: `Engineer ${num}: Enter email.`,
                name: "email"
            },
            {
                type: "input",
                message: `Engineer ${num}: Enter GitHub username.`,
                name: "github"
            }
        ])
        .then(function(input){
            const newEngineer = new Engineer(input.name, input.id, input.email, input.github)
            employees.push(newEngineer)
        })
    }

        for (let i = 0; i < response.interns; i++) {
            let num = i+1;
            await inquirer
            .prompt([
                {
                    type: "input",
                    message: `Intern ${num}: Enter name.`,
                    name: "name"
                },
                {
                    type: "input",
                    message: `Intern ${num}: Enter id.`,
                    name: "id"
                },
                {
                    type: "input",
                    message: `Intern ${num}: Enter email.`,
                    name: "email"
                },
                {
                    type: "input",
                    message: `Intern ${num}: Enter school.`,
                    name: "school"
                }
            ])
            .then(function(input){
                const newIntern = new Intern(input.name, input.id, input.email, input.school)
                employees.push(newIntern)
            })
        
    }

    // ---------------- fs.writeFile should be last

    fs.writeFile("./output/team.html", render(employees), function (err) {
        if (err) throw err;
    })



    
})

// function callRender(){
//     const employees = [];

    
//     const newManager = new Manager("Fred", "00", "aldfsb@jh.com", '2');
//     console.log(newManager);
//     employees.push(newManager);
//     console.log("Employees: "+ employees)

//     new Intern("George", "123", "aldfsb@jh.com", "school");

//     new Engineer("Jeff", "123", "aldfsb@jh.com", "github"); 

//     fs.writeFile("./output/team.html", render(employees), function (err) {
//         if (err) throw err;
//     })

    

// }

// callRender()



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
