import React, { Component } from 'react';
import { CChart } from '@coreui/react-chartjs'

export class Chart extends Component {
  render() {
    const { labels, data } = this.props.data.reduce((acc, entry) => {
      const label = new Date(entry.entryDate).toLocaleDateString();
      acc.labels.push(label);
      acc.data.push(entry.value);
      return acc;
    }, { labels: [], data: [] });

   return (
    <CChart
      type='line'
      data={{
        labels,
        datasets: [{
          label: 'Weight History',
          data
      }],
      }}
      options={{
        tooltips: {
          enabled: true
        }
      }}
    />
   )
  }
}