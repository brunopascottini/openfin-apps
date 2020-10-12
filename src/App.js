import React from 'react'

import './App.css'

import Chart from 'components/organisms/Chart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SelectionsBar from 'components/organisms/SelectionsBar'
import * as d3 from 'd3'

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* import selections bar if needed. Styling can be fully customised. */}
        <SelectionsBar />
        <div className="ChartGrid">
          <Switch>
            <Route
              path="/app1"
              component={() => (
                <Chart
                  // choose desired chart - see docs for currently supported charts and roadmap
                  type="linechart"
                  dimensions={[
                    // add chart dimensions here
                    {
                      field: 'Month', // field name in qlik app (must not be a master item)
                      excludeNull: true, // enables qNullSuppression in the created hypercube
                    },
                  ]}
                  measures={[
                    // add chart measures here
                    {
                      formula: 'Sum([Sales Margin Amount])', // valid qlik formula from connected app

                      // set a qlik sorting method, and ascending/descending delta value - see https://bit.ly/2ZUqnvY for available sort criteria. Or remove the property for no sorting.
                      sorting: { qSortByNumberic: -1 },
                      // add a format to apply to each data point
                      format: (v) => d3.format('.2s')(v),
                      // Add label for measure to show beside chart if applicable
                      label: 'Sales margin in Central US',
                    },
                  ]}
                  // select chart theme - add new themes by creating a json file in themes/charts
                  theme="sunsetblue"
                  // chart must either have a height specified here, or be in a container with a specified height
                  height={300}
                />
              )}
            />
            <Route
              path="/app2"
              component={() => (
                <Chart
                  // import chart hypercube from an existing visualization in the connected qlik app
                  objectId="MRmuW"
                  // chart must either have a height specified here, or be in a container with a specified height
                  height={300}
                />
              )}
            />
            <Route path="/app3" component={() => <Chart objectId="MEAjCJ" height={300} />} />
            <Route path="/app4" component={() => <Chart objectId="bsxkrg" height={300} />} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}
