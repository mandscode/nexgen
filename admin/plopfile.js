export default function (plop) {
    plop.setGenerator("component", {
      description: "this is a skeleton plopfile",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter component name:"
        },
      ],
      actions: [
        {
          type: "addMany",
          destination: "src/components/{{pascalCase name}}",
          templateFiles: "plop-templates/*.hbs",
          base: "plop-templates",
        },
      ]
    });
  };