import React, {Fragment, useState} from 'react'
import ReactDOM from 'react-dom'
import { string } from 'prop-types'


export default function App(): JSX.Element {

  const Dijkstra = (routes: any, source: string, destination: string) => {
    const inf = Number.POSITIVE_INFINITY;
    const distance = {};
    const done = {};
    const previous = {};

    for (const i in routes) {
      distance[i] = inf;
      previous[i] = 0;
      done[i] = false;
    }

    distance[source] = 0;

    for (const i in routes) {
      let minDistance = inf, nearest: string;
      for (const j in routes) {
        if (!done[j]) {
          if (distance[j] <= minDistance) {
            minDistance = distance[j];
            nearest = j;
          }
        }
      }
      done[nearest] = true;
      if (nearest === destination) {
        break;
      }

      const hops = routesFrom(nearest);
      for (const hop in hops) {
        const currentDistance = hops[hop];
        if (!done[hop]) {
          if (distance[nearest] + currentDistance < distance[hop]) {
            distance[hop] = distance[nearest] + currentDistance;
            previous[hop] = nearest;
          }
        }
      }
    }

    const i = destination;
    if (distance[i] < inf) {
      let path = i;
      let node = i;
      while (node !== source) {
        node = previous[node];
        if (node !== source) {
          path = node + '->' + path;
        }
      }
      path = node + '->' + path;

      return 'Distance from ' + source + '-->' + destination + ' ==> ' + distance[i] + ' (' + path + ')';
    } else {
      return 'No path!';
    }
  }

  const routes = {};

  const makeRoute = (from: string, to: string, length: number) => {
    const addRoute = (from: string, to: string) => {
      if (!(from in routes)) {
        routes[from] = {};
      }
      routes[from][to] = length;
    }
    addRoute(from, to);
    addRoute(to, from);
  }

  const routesFrom = (node: string) => {
    const found = routes[node];
    if (found === undefined) {
      console.log("No node name '" + node + "' found.");
    } else {
      return found;
    }
  }

  makeRoute('A', 'C', 2);
  makeRoute('C', 'D', 1);
  makeRoute('C', 'F', 4);
  makeRoute('B', 'D', 4);
  makeRoute('B', 'E', 7);
  makeRoute('D', 'F', 1);
  makeRoute('D', 'G', 2);
  makeRoute('F', 'G', 3);
  makeRoute('G', 'H', 4);
  makeRoute('E', 'H', 10);

  return (
    <Fragment>
      <h1>Implementation of Dijkstra's for code exercise</h1>
      <section>
        <div id="result">{ Dijkstra(routes, 'B', 'H') }</div>
      </section>
    </Fragment>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
