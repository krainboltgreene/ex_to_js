function fillTemplate(title, description, elixir_code, js_code){
  let template = `<div class="translation">
        <div class="translation-description">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
        <div class="row translation-code">
          <div class="col-md-6">
            <h5>Elixir</h5> 
            <pre>
              <code class="elixir">
                ${elixir_code}
              </code>
            </pre>        
          </div>
          <div class="col-md-6">
            <h5>JavaScript</h5> 
            <pre>
              <code class="javascript">
                ${js_code}
              </code>
            </pre>        
          </div>
        </div>
      </div>
      <hr/>`;

      console.log(template);
     return template;
}

function main(){
  let container = document.getElementsByClassName('container')[0];
  let templates = [];

  let template = fillTemplate(
    "primatives", 
    "Here is how primatives are translated. String interpolation is not supported yet.", 
    `
    nil
    1
    -1.0
    "Hello"
    :atom
    [1,2,3]
    {1,2,3}`,
    `
    null
    1
    -1.0
    'Hello'
    Symbol('atom')
    [1,2,3]
    [1,2,3]`
  );
  templates.push(template);

  template = fillTemplate(
    "Assignment Patterns", 
    "Assignment patterns are translated into assignment statements.", 
    `
    a = 1
    {a,b} = {1,2}
    `,
    `
    let a = 1;
    [a,b] = [1,2]
    `
  );
  templates.push(template);

  template = fillTemplate(
    "def and defp", 
    "defs are translated to exported functions, defps are translated to non-exported functions", 
    `
    def something() do
    end

    defp something_else() do
    end
    `,
    `
    export function something(){}

    function something_else();
    `
  );
  templates.push(template);

  template = fillTemplate(
    "defmodule", 
    "defmodules are treated as es6 modules", 
    `
    defmodule Hello do
    end
    `,
    `
    //no visible representation
    `
  );
  templates.push(template);

  template = fillTemplate(
    "imports and aliases", 
    "imports and aliases are turned into import statements", 
    `
    defmodule Hello do
      import World
      import US, only: [la: 1]
      alias Super.Man
      alias Super.Man as Kent

    end
    `,
    `
    import * as World from 'world'
    import la from 'us'
    import * as Man from 'super/man'
    import * as Kent from 'super/man'
    `
  );
  templates.push(template);

  template = fillTemplate(
    "structs", 
    "Structs are tranlated into ES6 classes", 
    `
    defmodule User do
      defstruct name: "john", age: 27
    end

    defmodule User do
      defstruct :name, :age
    end
    `,
    `
    export class User{
      contructor(name = 'john', age = 27){
        this.name = name;
        this.age = age;
      }
    }

    export class User{
      contructor(name, age){
        this.name = name;
        this.age = age;
      }
    }
    `
  );
  templates.push(template);

  template = fillTemplate(
    "anonymous functions", 
    "Anonymous functions are translated into JS anonymous functions", 
    `
    fn(x) -> x * 2 end
    `,
    `
    x => x * 2
    `
  );
  templates.push(template);


  template = fillTemplate(
    "if statements", 
    "if statements are translated into JS if statements", 
    `
      if 1 == 1 do
        a = 1
      else
        a = 2
      end
    `,
    `
    if(1 == 1){
      let a = 1;
    }else{
      let a = 2;
    }
    `
  );
  templates.push(template);

  template = fillTemplate(
    "function calls", 
    "", 
    `
    something()
    something_else(1, 2)
    SomeModule.execute()
    `,
    `
    something();
    something_else(1, 2);
    SomeModule.execute();
    `
  );
  templates.push(template);

  let templates_string = templates.join("");
  container.innerHTML = container.innerHTML + templates_string;
  hljs.initHighlighting();
}