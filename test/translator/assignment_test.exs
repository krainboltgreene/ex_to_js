defmodule ExToJS.Translator.Assignment.Test do
  use ExUnit.Case
  import ExToJS.TestHelper

  test "translate assignment" do
    ex_ast = quote do: a = 1
    js_code = "let a = 1;"

    assert_translation(ex_ast, js_code)

    ex_ast = quote do: a = :atom
    js_code = "let a = Symbol('atom');"

    assert_translation(ex_ast, js_code)

    ex_ast = quote do: {a, b} = {1, 2}
    js_code = "let {'_0':a,'_1':b} = {'_0':1,'_1':2};"

    assert_translation(ex_ast, js_code)
  end
end