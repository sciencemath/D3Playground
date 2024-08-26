import { Selections } from './components/Selections'
import { DataJoins } from './components/DataJoins'
import { ScaleFunctions } from './components/Scalefunctions'
import { Lines } from './components/Lines'
import { Areas } from './components/Areas'
import { Stacks } from './components/Stacks'
import { Arcs } from './components/Arcs'
import { Symbols } from './components/Symbols'
import { Axis } from './components/Axis'
import { Trees } from './components/Trees'
import { Treemap } from './components/Treemap'
import { PackCircles } from './components/PackCircles'
import { Partitions } from './components/Partitions'
import { Chord } from './components/Chord'
import { PhysicsLayout } from './components/PhysicsLayout'

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
      <Trees />
      <Treemap />
      <PackCircles />
      <Partitions />
      <Chord />
      <PhysicsLayout />
    </>
  )
}

export default App
