const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const writeFileAsync = util.promisify(fs.writeFile);

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
        type: "number",
        message: "Manager: Enter your id.",
        name: "id"
    },
    {
        type: "input",
        message: "Manager: Enter your email",
        name: "email"
    },
    {
        type: "number",
        message: "Manager: Enter your office number.",
        name: "officeNum"
    },
    {
        type: "number",
        message: "How many engineers do you want to add?",
        name: "engineers"
    },
    {
        type: "number",
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
                type: "number",
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
                    type: "number",
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
