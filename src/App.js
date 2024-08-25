import { Selections } from './components/Selections'
import { DataJoins } from './components/DataJoins'
import { ScaleFunctions } from './components/Scalefunctions'
import { Lines } from './components/Lines'
import { Areas } from './components/Areas'
import { Stacks } from './components/Stacks'
import { Arcs } from './components/Arcs'
import { Symbols } from './components/Symbols'
import { Axis } from './components/Axis'

import './App.css'


function App() {
  return (
    <>
      <h1>D3 In Depth</h1>
      <Selections />
      <DataJoins />
      <ScaleFunctions />
      <Lines />
      <Areas />
      <Stacks />
      <Arcs />
      <Symbols />
      <Axis />
    </>
  )
}

export default App
