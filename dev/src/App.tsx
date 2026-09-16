import { useRef, useState } from 'react'
import '@flexmonster/js/flexmonster.css'
import type {
  DatasetInputParams,
  FMGroupViewType,
  IFMFlexmonsterOptionsInputParams,
  StateInputParams,
} from '@flexmonster/js'
// Everything comes from the package entry point, which `file:..` resolves to the
// build in ../dist — run `npm run build` in the repo root after changing the wrapper.
import {
  FMFlatFieldList,
  FMFlatTable,
  FMFlexmonster,
  FMGroup,
  FMPivotFieldList,
  FMPivotTable,
  FMToolbar,
  type FMFlatTableRef,
  type FMFlexmonsterRef,
  type FMPivotTableRef,
  type FMToolbarRef,
} from '@flexmonster/react'

// 48 records — enough for filters, sorting and drilldowns to visibly reshape the tables
const YEARS = [2019, 2020, 2021]
const NAMES = [
  { name: 'Liam', gender: 'male' },
  { name: 'Noah', gender: 'male' },
  { name: 'Olivia', gender: 'female' },
  { name: 'Emma', gender: 'female' },
]
const STATES = ['CA', 'NY', 'TX', 'FL']

interface NameRecord {
  State: string
  Name: string
  Gender: string
  Count: number
  Year: number
}

const data: NameRecord[] = YEARS.flatMap((year, y) =>
  NAMES.flatMap((person, n) =>
    STATES.map((state, s) => ({
      State: state,
      Name: person.name,
      Gender: person.gender,
      Count: 5000 + n * 3000 + s * 1500 + y * 900 + ((n + s + y) % 3) * 700,
      Year: year,
    }))
  )
)

const dataset: DatasetInputParams = {
  dataSource: {
    data,
    type: 'json',
  },
}

const stateFmFlexmonster: StateInputParams = {
  id: 'state-0',
  dataset,
  slice: {
    rows: [{ fieldName: 'Year' }, { fieldName: 'Gender' }, { fieldName: 'Name' }],
    values: [{ fieldName: 'Count', aggregation: 'sum' }],
    columns: [{ fieldName: 'State' }],
  },
}

const stateFmFlexmonsterSimple: StateInputParams = {
  id: 'state-0',
  dataset,
  slice: {
    rows: [{ fieldName: 'Name' }],
    values: [{ fieldName: 'Count', aggregation: 'sum' }],
    columns: [{ fieldName: 'State' }],
  },
}

const stateFmFlat: StateInputParams = {
  id: 'state-1',
  dataset,
}

const stateFmPivot: StateInputParams = {
  id: 'state-2',
  dataset,
  slice: {
    rows: [{ fieldName: 'Year' }, { fieldName: 'Gender' }, { fieldName: 'Name' }],
    values: [{ fieldName: 'Count', aggregation: 'sum' }],
    columns: [{ fieldName: 'State' }],
  },
}

const disabled = true

const optionsFmPivot: IFMFlexmonsterOptionsInputParams = {
  viewType: 'flat',
  flatTable: { totalRowPosition: 'before' },
}

export default function App() {
  // Component refs — equivalent of Angular's viewChild
  const compositeRef = useRef<FMFlexmonsterRef>(null)
  const flatRef = useRef<FMFlatTableRef>(null)
  const pivotRef = useRef<FMPivotTableRef>(null)
  const toolbarFlatRef = useRef<FMToolbarRef>(null)
  const toolbarPivotRef = useRef<FMToolbarRef>(null)

  const [currentStateFmFlexmonster, setCurrentStateFmFlexmonster] =
    useState<StateInputParams>(stateFmFlexmonster)

  // API call helpers — the refs are filled once the components are mounted
  function getCellFlat() {
    const cell = flatRef.current!.getCell(0, 0)
    alert(`Value of the first cell: ${cell.value}`)
  }

  function getCellPivot() {
    const cell = pivotRef.current!.getCell(0, 0)
    alert(`Value of the first cell: ${cell.value}`)
  }

  function setViewType(type: FMGroupViewType) {
    compositeRef.current!.setViewType(type)
  }

  return (
    <main>
      <h1>React Flexmonster Showcase</h1>

      <h2 id="flexmonster">Flexmonster</h2>
      <fm-button size="sm" onClick={() => compositeRef.current!.openFieldList()}>
        Open Field List
      </fm-button>
      <fm-button size="sm" onClick={() => setViewType('flat')}>
        Flat view
      </fm-button>
      <fm-button size="sm" onClick={() => setViewType('pivot')}>
        Pivot view
      </fm-button>
      <fm-button size="sm" onClick={() => setCurrentStateFmFlexmonster(stateFmFlexmonsterSimple)}>
        Change state
      </fm-button>

      <FMFlexmonster
        ref={compositeRef}
        state={currentStateFmFlexmonster}
        options={optionsFmPivot}
      />

      <h2 id="flat">Flat</h2>
      <fm-button size="sm" onClick={() => toolbarFlatRef.current!.openFieldList()}>
        Open field list
      </fm-button>
      <fm-button size="sm" onClick={getCellFlat}>
        Get 1st cell
      </fm-button>

      <FMToolbar ref={toolbarFlatRef} state={stateFmFlat} />
      <FMFlatTable ref={flatRef} state={stateFmFlat} />
      <FMFlatFieldList state={stateFmFlat} />

      <h2 id="pivot">Pivot</h2>
      <fm-button size="sm" onClick={() => toolbarPivotRef.current!.openFieldList()}>
        Open field list
      </fm-button>
      <fm-button size="sm" onClick={getCellPivot}>
        Get 1st cell
      </fm-button>

      <FMToolbar ref={toolbarPivotRef} state={stateFmPivot} />
      <FMPivotTable ref={pivotRef} state={stateFmPivot} />
      <FMPivotFieldList state={stateFmPivot} />

      <h2 id="toolkit">Toolkit elements use example</h2>
      <fm-button size="sm" disabled={disabled}>
        Custom Button
      </fm-button>
      <fm-selectable-list data-provider="1,2,3" />

      <h2 id="group">FMGroup Example</h2>
      <FMGroup state={stateFmFlat}>
        <FMToolbar />
        <FMFlatTable />
        <FMFlatFieldList />
      </FMGroup>
    </main>
  )
}
